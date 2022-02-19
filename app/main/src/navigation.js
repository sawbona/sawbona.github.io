define(["knockout"], function (ko) {
    class Navigation {
        constructor() {
            var self = this;
            var initialView = 'home';
            if (window.location.hash && window.location.hash.length > 0) {
                initialView = window.location.hash;
            }
            self.viewName = ko.observable(initialView);
            self.navigate = function (path) {
                self.viewName(path);
                return true;
            };
        }
    }
    return new Navigation();
});