require.config({
    paths: {
        Vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue',
        knockout: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.0/knockout-min'
    }
});

require(["knockout"], function (ko) {
    var knockoutApp = document.getElementById('knockout-app');
    var rootModel = {
        navigationPath: ko.observable('home'),
        navigate: function (path) {
            rootModel.navigationPath(path);
            return true;
        }
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

    function loadComponent(path) {
        if(path.length > 0 && path.substring(0, 1) === "#"){
            path = path.substring(1, path.length);
        }
        var prefix = "./";
        var template = getTemplate(prefix + "view/" + path + ".html");
        template.then(function (template) {
            require([prefix + "viewModel/" + path], function (model) {
                var node = document.createElement("div");
                node.innerHTML = template;
                var appContent = document.getElementById("navigation-content");
                while (appContent.hasChildNodes()) {
                    appContent.removeChild(appContent.firstChild);
                }
                appContent.appendChild(node);
                ko.applyBindings(model, node);
            });
        });
    }

    rootModel.navigationPath.subscribe(function (path) {
        loadComponent(path);
    });

    ko.applyBindings(rootModel, knockoutApp);
    if (window.location.hash && window.location.hash.length > 0) {
        loadComponent(window.location.hash);
    } else {
        loadComponent("home");
    }
});