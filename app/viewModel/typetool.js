define(["knockout", "resource"], function (ko, resource) {
    class Model {
        constructor() {
            var self = this;
            var target = '';
            if (localStorage) {
                if (localStorage.target && localStorage.target != null) {
                    target = localStorage.target;
                }
            }
            self.target = ko.observable(target);
            if (target == null || target.length == 0) {
                resource.getText('initialText.txt').then(function (initialText) {
                    localStorage.target = initialText;
                    self.target(initialText);
                });
            }
            self.showTargetInput = ko.observable(true);
            self.input = ko.observable("");
            self.correctCount = ko.observable(0);
            self.isInputCorrect = ko.observable(false);

            // private functions
            function focusInput() {
                document.getElementById('typein').focus();
            }

            // events
            self.clearInput = function (event, data) {
                self.input('');
                self.showTargetInput(true);
                focusInput();
            };
            self.showLeftPanel = function (data, event) {
                self.showTargetInput(true);
                document.getElementById('typein').focus();
            };
            self.target.subscribe(function (value) {
                localStorage.target = value;
            });

            self.input.subscribe(function (value) {
                var target = self.target().toLowerCase();
                value = value.toLowerCase();
                self.showTargetInput(false);
                var count = 0;
                for (var i = 0; i < value.length; i++) {
                    if (i < target.length && value[i] == target[i]) {
                        count++;
                    }
                }
                self.correctCount(count);
                self.isInputCorrect(count == self.target().length && count == self.input().length);
                if (self.isInputCorrect()) {
                    self.showLeftPanel(true);
                }
            });
            focusInput();
        }
    }

    return new Model();
});