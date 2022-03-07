export class EventListener {
    constructor() {
        var self = this;
        var UP = 0;
        var RIGHT = 1;
        var DOWN = 2;
        var LEFT = 3;
        self.init = function (snake, elementId) {
            document.addEventListener("keydown", function (e) {
                switch (e.keyCode || e.which) {
                    case 37:
                        snake.setDirection(LEFT);
                        break;
                    case 38:
                        snake.setDirection(UP);
                        break;
                    case 39:
                        snake.setDirection(RIGHT);
                        break;
                    case 40:
                        snake.setDirection(DOWN);
                        break;
                }
            });
            detectSwipe(elementId, function (element, dir) {
                switch (dir) {
                    case 'up':
                        snake.setDirection(UP);
                        break;
                    case 'right':
                        snake.setDirection(RIGHT);
                        break;
                    case 'down':
                        snake.setDirection(DOWN);
                        break;
                    case 'left':
                        snake.setDirection(LEFT);
                        break;
                }
            });
            function detectSwipe(id, f) {
                var detect = {
                    startX: 0,
                    startY: 0,
                    endX: 0,
                    endY: 0,
                    minX: 30, // min X swipe for horizontal swipe
                    maxX: 30, // max X difference for vertical swipe
                    minY: 50, // min Y swipe for vertial swipe
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
                        event.stopPropagation();
                    }
                });
            }
        };
    };
}
