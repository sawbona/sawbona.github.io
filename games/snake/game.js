define(['sawbona/games/snake/matrix',
    'sawbona/games/snake/snake',
    'sawbona/games/snake/gameVisualizer',
    'sawbona/games/snake/eventListeners',
    'utils/observable'], function (Matrix,
        Snake,
        GameVisualizer,
        eventListeners,
        observable) {
    function Game() {
        var self = this;
        var view = null;
        var matrix = null;
        var snake = null;
        var fruits = [];
        var opponents = [];
        self.status = observable('');
        self.status.subscribe((value) => {
            setSnakesStatus(value);
            loop();
        });
        self.getOpponents = function () {
            return opponents;
        };
        self.getSnake = function () {
            return snake;
        };
        self.getFruits = function () {
            return fruits;
        };
        self.getMatrix = function(){
            return matrix;
        };
        self.setSnake = function(value){
            snake = value;
        };
        self.findEmptySpot = function(){
            return matrix.findEmptySpot();
        };
        self.init = function (n, m) {
            matrix = new Matrix(n, m);
            // snake = new Snake(Math.floor(n / 2), Math.floor(m / 2), self);
            // opponents.push(new Snake(0, 0, self));
            // eventListeners.init(snake, 'body');
            // fruits.push(matrix.findEmptySpot());
            view = new GameVisualizer(matrix, self);
            view.onBeforeDraw();
            // loop();
            render();
        };
        
        function loop() {
            snake.loop();
            opponents.forEach(o => {
                o.loop();
            });
        }

        function setSnakesStatus(status){
            snake.status = status;
            opponents.forEach(o => {
                o.status = status;
            });
        }

        function render() {
            setTimeout(function () {
                view.draw();
                render();
            }, 1000 / 60);
        }
        self.reload = function () {
            view.draw();
        };
    }

    return Game;
});