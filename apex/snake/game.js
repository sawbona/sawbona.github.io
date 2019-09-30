define(function () {

    function Game() {
        var canvas = document.getElementById('canvas');
        var self = this;
        self.start = function () {
            var ctx = canvas.getContext('2d');
            // Set line width
            ctx.lineWidth = 10;

            // Wall
            ctx.strokeRect(75, 140, 150, 110);

            // Door
            ctx.fillRect(130, 190, 40, 60);

            // Roof
            ctx.moveTo(50, 140);
            ctx.lineTo(150, 60);
            ctx.lineTo(250, 140);
            ctx.closePath();
            ctx.stroke();
        };
    }

    return new Game();
});