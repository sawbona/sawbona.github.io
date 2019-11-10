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
define(['multiplayer/communications'], function (communications) {

    function SnakeNode(n, m, matrix) {
        var self = this;
        self.next = null;
        self.i = n;
        self.j = m;
        var direction = 0;
        self.setDirection = function (value) {
            communications.notify({
                type: 'CHANGE_DIRECTION',
                data: value
            });
            direction = value;
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
        };
    }

    return SnakeNode;
});