/* 
 * Copyright 2019 clobaco.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define(['sapex/snake/shapes'], function (Shapes) {
    function GameVisualizer(matrix, game) {
        var self = this;
        var canvas = document.getElementById('canvas');
        var width = canvas.offsetWidth;
        var ctx = canvas.getContext('2d');
        var shapes = new Shapes(ctx);
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

        // draw backgroud (white)
        drawers.push({
            draw: function () {
                for (var i = 0; i < matrix.n; i++) {
                    for (var j = 0; j < matrix.m; j++) {
                        ctx.fillStyle = 'white';
                        drawPoint(i, j);
                        matrix.set(i, j, 0);
                    }
                }
            }
        });

        drawers.push({
            draw: function () {
                shapes.rec(0, 0, width, canvas.offsetHeight);
            }
        });

        // fruits
        drawers.push({
            draw: function () {
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

        self.onBeforeDraw = function () {
//            shapes.rec(0, 0, width, canvas.offsetHeight);
        };

        self.draw = function () {
            drawers.forEach(function (d) {
                d.draw();
            });
        };

    }
    return GameVisualizer;
});