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
define([], function () {
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
            var stop = false;
            for (var i = 0; i < self.n; i++) {
                for (var j = 0; j < self.m; j++) {
                    var result = f(mem[i][j], i, j);
                    if (result === false) {
                        stop = true;
                        break;
                    }
                }
                if (stop) {
                    break;
                }
            }
        }
        self.findEmptySpot = function () {
            var totalEmptySpots = 0;
            forEach(function (value) {
                if (value == 0) {
                    totalEmptySpots++;
                    return false;
                }
            });
            if (totalEmptySpots === 0) {
                throw "no empty spots available";
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
    return Matrix;
});