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
    function Navigation() {
        var self = this;
        self.getViewName = function () {
            var location = window.location.pathname;
            var items = location.split('/');
            var item = items[items.length - 1];
            return item.replace('.jsp', '');
        };
    }
    return new Navigation();
});