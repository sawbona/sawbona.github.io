"strict";
define(['./keyboardHandler',
    './gameVisualizer'], function (keyboardHandler,
        GameVisualizer) {

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
            keyboardHandler.init(snake);
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
    }
    return new Game();
});