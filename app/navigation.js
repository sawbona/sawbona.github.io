define(["knockout"], function (ko) {
    function Navigation() {
        var self = this;
        self.navigationPath = ko.observable('home');
        self.navigate = function (path) {
            self.navigationPath(path);
            return true;
        };

        function getTemplate(templateName) {
            var prefix = "app/";
            templateName = prefix + templateName;
            return new Promise(function (accept) {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        accept(xhttp.responseText);
                    }
                };
                xhttp.open("GET", templateName, true);
                xhttp.send();
            });
        }

        self.loadComponent = function (path) {
            if (path.length > 0 && path.substring(0, 1) === "#") {
                path = path.substring(1, path.length);
            }
            var prefix = "./";
            var template = getTemplate(prefix + "view/" + path + ".html");
            template.then(function (templateContent) {
                var node = document.createElement("div");
                node.innerHTML = templateContent;
                var appContent = document.getElementById("navigation-content");
                while (appContent.hasChildNodes()) {
                    appContent.removeChild(appContent.firstChild);
                }
                appContent.appendChild(node);
                require([prefix + "viewModel/" + path], function (model) {
                    ko.applyBindings(model, node);
                    if(model.afterApplyBidings){
                        model.afterApplyBidings();
                    }
                });
            });
        }

        self.navigationPath.subscribe(function (path) {
            self.loadComponent(path);
        });
    }

    return new Navigation();
});