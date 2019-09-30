"strict";
define(function () {
    function Matrix(n, m) {
        var mem = [];
        for (var i = 0; i < n; i++) {
            var row = [];
            for (var j = 0; j < m; j++) {
                row.push({
                    food: false,
                    snake: false
                });
            }
            mem.push(row);
        }
        var self = this;
        self.n = n;
        self.m = m;
    }

    function View(matrix) {
        var self = this;
        var canvas = document.getElementById('canvas');
        var width = canvas.width;
        var ctx = canvas.getContext('2d');
        var scale = width / matrix.m;
        ctx.lineWidth = 10;
        self.draw = function () {
            for (var i = 0; i < matrix.n; i++) {
                for (var j = 0; j < matrix.m; j++) {
                    ctx.fillStyle = Math.random() * 2 < 1 ? 'black' : 'white';
                    ctx.fillRect(i * scale, j * scale, scale, scale);
                }
            }
        };
    }

    function Game() {
        var self = this;
        var view = null;
        self.status = "";
        self.start = function (n, m) {
            view = new View(new Matrix(n, m));
            view.draw();
        };

        self.reload = function(){
            view.draw();
        };
    }

    return new Game();
});