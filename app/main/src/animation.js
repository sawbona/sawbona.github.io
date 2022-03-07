export class Animation {
    constructor(canvasId) {
        var self = this;
        var canvas = document.getElementById(canvasId);
        var ctx = canvas.getContext('2d');
        var step = 0;
        var mainInterval = null;
        self.config = {
            fps: 24
        };

        // private functions
        function runStartFunction(f) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            f(ctx, step++, canvas);
        }

        // public functions
        self.update = function (f) {
            f(ctx, step, canvas);
        };

        self.init = function (f) {
            runStartFunction(f);
        };

        self.run = function (f) {
            runStartFunction(f);
            if (mainInterval != null) {
                clearInterval(mainInterval);
            }
            mainInterval = setInterval(() => {
                runStartFunction(f);

            }, 1000 / self.config.fps);
        };

        self.stop = function () {
            if (mainInterval != null) {
                clearInterval(mainInterval);
            }
        };
    }
}
