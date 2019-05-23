define(['animation', 'math'], function (Animation, math) {
    function Model() {
        var self = this;
        var animation = new Animation('canvas');
        animation.config.fps = 10;
        var points = [];
        animation.init(function (ctx) {
            // ctx.fillStyle = 'rgb(200, 0, 0)';
            // ctx.fillRect(25, 25, 100, 100);
            // ctx.clearRect(45, 45, 60, 60);
            // ctx.strokeRect(50, 50, 50, 50);

        });
        animation.run
        (function (ctx, step, canvas) {
            points.push(Math.sin(step));

            ctx.beginPath();
            var xFactor = 10;
            var last = (points.length - 1) * xFactor;
            var gap = false;
            if (last > canvas.width) {
                gap = true;
            }

            function drawCircle(x, y) {
                var radius = 5;
                ctx.moveTo(x + radius, y);
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
            }

            for (var i = 0; i < points.length; i++) {
                var x = i;
                var y = points[i];

                // scale
                x = x * xFactor;
                y = y * xFactor;

                // offset
                y = y + (canvas.height / 2);

                // shift
                if(gap){
                    x = x - (last - canvas.width);
                }
                drawCircle(x, y);
            }
            ctx.stroke();
        });

        // events

        function randomColor(){
            animation.update(function(ctx, step, canvas){
                var red = Math.random() * 256;
                var green = Math.random() * 256;
                var blue = Math.random() * 256;
                ctx.strokeStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
            });
        }

        self.chooseRandomColor = function(data, event){
            randomColor();
        };

        self.resetCanvas = function(data, event){
            points = [];
        };

        randomColor();
    }

    return Model;
});