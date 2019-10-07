"strict";
define(function () {
    function GameVisualizer(matrix, game) {
        var self = this;
        var canvas = document.getElementById('canvas');
        var width = canvas.offsetWidth;
        var ctx = canvas.getContext('2d');
        var scale = width / matrix.m;
        var snake = game.getSnake();
        ctx.lineWidth = 10;
        var colors = {
            snake: 'darkblue',
            fruit: 'green'
        };
        function getColor(cell) {
            var keys = Object.keys(cell);
            for (var i = 0; i < keys.length; i++) {
                var keyName = keys[i];
                if (cell[keyName] === true) {
                    return colors[keyName];
                }
            }
            return 'white';
        }

        function drawPoint(i, j) {
            ctx.fillRect(j * scale, i * scale, scale, scale);
        }

        var drawers = [];

        drawers.push({
            draw: function () {
                var buff = [];
                for (var i = 0; i < matrix.n; i++) {
                    var ren = "";
                    for (var j = 0; j < matrix.m; j++) {
                        ren += matrix.get(i, j)
                    }
                    buff.push(ren);
                }
                buff.push("snake: " + snake.length());
                console.log(buff.join("\n"));
            }
        });

        // draw backgroud (white)
        drawers.push({
            draw: function () {
                console.log("brackground");
                for (var i = 0; i < matrix.n; i++) {
                    for (var j = 0; j < matrix.m; j++) {
                        ctx.fillStyle = 'white';
                        drawPoint(i, j);
                        matrix.set(i, j, 0);
                    }
                }
            }
        });

        // fruits
        drawers.push({
            draw: function () {
                console.log("fruits");
                var fruits = game.getFruits();
                fruits.forEach(function (f) {
                    ctx.fillStyle = getColor({
                        fruit: true
                    });
                    drawPoint(f.i, f.j);
                    matrix.set(f.i, f.j, 2);
                });
            }
        });

        // snake drawer
        drawers.push({
            draw: function () {
                var current = snake;
                while (current != null) {
                    ctx.fillStyle = getColor({
                        snake: true
                    });
                    drawPoint(current.i, current.j);
                    matrix.set(current.i, current.j, 1);
                    current = current.next;
                }
            }
        });

        self.draw = function () {
            drawers.forEach(function (d) {
                d.draw();
            });
        };

    }

    function Matrix(n, m) {
        var self = this;
        var mem = [];
        for (var i = 0; i < n; i++) {
            var row = [];
            for (var j = 0; j < m; j++) {
                row.push(0);
            }
            mem.push(row);
        }
        self.n = n;
        self.m = m;
        function forEach(f) {
            for (var i = 0; i < self.n; i++) {
                for (var j = 0; j < self.m; j++) {
                    f(mem[i][j], i, j);
                }
            }
        }
        self.findEmptySpot = function () {
            var totalEmptySpots = 0;
            forEach(function (value) {
                if (value == 0) {
                    totalEmptySpots++;
                }
            });
            if (totalEmptySpots === 0) {
                throw "not empty spots available";
            }
            var ren = Math.floor(Math.random() * self.n),
                col = Math.floor(Math.random() * self.m);
            var found = null;
            for (var i = ren; i < ren + self.n; i++) {
                for (var j = col; j < col + self.m; j++) {
                    var value = self.get(i % self.n, j % self.m);
                    if (value === 0) {
                        if (found === null) {
                            found = {
                                i: ren,
                                j: col
                            };
                        }
                        if (Math.floor(Math.random() * totalEmptySpots) === 0) {
                            found = {
                                i: ren,
                                j: col
                            };
                            return found;
                        }
                    }
                }
            }
            return found;
        };
        self.get = function (n, m) {
            return mem[n][m];
        };
        self.set = function (n, m, cell) {
            mem[n][m] = cell;
        };
    }

    function SnakeNode(n, m, matrix) {
        var self = this;
        self.next = null;
        self.i = n;
        self.j = m;
        var direction = 0;
        self.setDirection = function (_direction) {
            direction = _direction;
        };
        self.length = function () {
            var current = self;
            var count = 0;
            while (current != null) {
                count++;
                current = current.next;
            }
            return count;
        };
        self.move = function () {
            var current = self;
            var tmp = [];
            while (current != null) {
                tmp.push(current);
                current = current.next;
            }
            for (var i = tmp.length - 1; i > 0; i--) {
                tmp[i].i = tmp[i - 1].i;
                tmp[i].j = tmp[i - 1].j;
            }
            var i = self.i;
            var j = self.j;
            switch (direction) {
                case 0:
                    i--;
                    break;
                case 1:
                    j++;
                    break;
                case 2:
                    i++;
                    break;
                case 3:
                    j--;
                    break;
            }
            self.i = (i + matrix.n) % matrix.n;
            self.j = (j + matrix.m) % matrix.m;
        };
        self.increase = function () {
            var last = self;
            var increaseDirection = direction;
            while (last.next != null) {
                // same row
                if (last.next.i == last.i) {
                    if (last.next.j === last.j - 1) {
                        increaseDirection = 1;
                    } else {
                        increaseDirection = 3;
                    }

                } else {
                    // same column
                    if (last.next.i === last.i - 1) {
                        increaseDirection = 2;
                    } else {
                        increaseDirection = 0;
                    }
                }
                last = last.next;
            }
            var i = last.i;
            var j = last.j;
            switch (increaseDirection) {
                case 0:
                    i++;
                    break;
                case 1:
                    j--;
                    break;
                case 2:
                    i--;
                    break;
                case 3:
                    j++;
                    break;
            }
            last.next = new SnakeNode(i % matrix.n, j % matrix.m);
        }
    }

    function Game() {
        var self = this;
        var view = null;
        var matrix = null;
        var speed = 3;
        var snake = null;
        var fruits = [];
        var opponents = [];
        self.status = "";
        self.getOpponents = function () {
            return opponents;
        };
        self.getSnake = function () {
            return snake;
        };
        self.getFruits = function () {
            return fruits;
        };
        self.start = function (n, m) {
            matrix = new Matrix(n, m);
            snake = new SnakeNode(Math.floor(n / 2), Math.floor(m / 2), matrix);
            fruits.push(matrix.findEmptySpot());
            view = new GameVisualizer(matrix, self);
            loop();
        };

        function collisions() {
            var collisionsFound = 0;
            for (var i = 0; i < fruits.length; i++) {
                var f = fruits[i];
                if (f.i === snake.i && f.j === snake.j) {
                    snake.increase();
                    fruits.splice(i, 1);
                    collisionsFound++;
                    i--;
                }
            }
            if (collisionsFound > 0) {
                fruits.push(matrix.findEmptySpot());
                speed++;
            }
        }

        function loop() {
            setTimeout(function () {
                view.draw();
                collisions();
                snake.move();
                loop();
            }, 1000 / speed);
        }

        self.reload = function () {
            view.draw();
        };

        document.addEventListener("keypress", function (e) {
            switch (e.keyCode || e.which) {
                case 37:
                    snake.setDirection(3);
                    break;
                case 38:
                    snake.setDirection(0);
                    break;
                case 39:
                    snake.setDirection(1);
                    break;
                case 40:
                    snake.setDirection(2);
                    break;
            }
        });

        detectSwipe('canvas', function (dir) {
            switch (dir) {
                case 'up':
                    snake.setDirection(0);
                    break;
                case 'right':
                    snake.setDirection(1);
                    break;
                case 'dow':
                    snake.setDirection(2);
                    break;
                case 'left':
                    snake.setDirection(3);
                    break;
            }
        });

        function detectSwipe(id, f) {
            var detect = {
                startX: 0,
                startY: 0,
                endX: 0,
                endY: 0,
                minX: 30,   // min X swipe for horizontal swipe
                maxX: 30,   // max X difference for vertical swipe
                minY: 50,   // min Y swipe for vertial swipe
                maxY: 60    // max Y difference for horizontal swipe
            },
                direction = null,
                element = document.getElementById(id);

            element.addEventListener('touchstart', function (event) {
                var touch = event.touches[0];
                detect.startX = touch.screenX;
                detect.startY = touch.screenY;
            });

            element.addEventListener('touchmove', function (event) {
                event.preventDefault();
                var touch = event.touches[0];
                detect.endX = touch.screenX;
                detect.endY = touch.screenY;
            });

            element.addEventListener('touchend', function (event) {
                if (
                    // Horizontal move.
                    (Math.abs(detect.endX - detect.startX) > detect.minX)
                    && (Math.abs(detect.endY - detect.startY) < detect.maxY)
                ) {
                    direction = (detect.endX > detect.startX) ? 'right' : 'left';
                } else if (
                    // Vertical move.
                    (Math.abs(detect.endY - detect.startY) > detect.minY)
                    && (Math.abs(detect.endX - detect.startX) < detect.maxX)
                ) {
                    direction = (detect.endY > detect.startY) ? 'down' : 'up';
                }

                if ((direction !== null) && (typeof f === 'function')) {
                    f(element, direction);
                }
            });
        }
    }

    return new Game();
});