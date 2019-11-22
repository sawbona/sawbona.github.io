define(['sawbona/games/snake/snakeNode'], function (SnakeNode) {
    function Snake(i, j, game) {
        var self = this;
        var speed = 2;
        var matrix = game.getMatrix();
        var body = new SnakeNode(i, j, matrix);
        function collisions() {
            var collisionsFound = 0;
            var fruits = game.getFruits();
            for (var i = 0; i < fruits.length; i++) {
                var f = fruits[i];
                if (f.i === body.i && f.j === body.j) {
                    body.increase();
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
        self.status = '';
        self.loop = function () {
            if(status === 'PLAY'){
                setTimeout(function () {
                    collisions();
                    body.move();
                    self.loop();
                }, 1000 / speed);
            }
        };

        Object.defineProperty(self, 'i', {
            get: function () {
                return body.i;
            },
            set: function (value) {
                body.i = value;
            }
        });
        Object.defineProperty(self, 'j', {
            get: function () {
                return body.j;
            },
            set: function (value) {
                body.j = value;
            }
        });
        Object.defineProperty(self, 'next', {
            get: function () {
                return body.next;
            },
            set: function (value) {
                body.next = value;
            }
        });
        self.setDirection = function (direction) {
            body.setDirection(direction);
        };
        self.getDirection = function () {
            return body.getDirection();
        };
        self.increase = function () {
            body.increase();
        };
        self.move = function () {
            body.move();
        };
        self.getSpeed = function () {
            return speed;
        };
        self.setSpeed = function (value) {
            speed = value;
        };
        self.getBody = function () {
            return body;
        };
    }

    return Snake;
});