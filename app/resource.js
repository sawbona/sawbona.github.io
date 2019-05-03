define([], function () {
    function Resource() {
        var self = this;
        function getTemplate(templateName) {
            var prefix = "app/";
            templateName = prefix + templateName;
            return new Promise(function (accept) {
                var xhttp = new XMLHttpRequest();
                xhttp.responseType = 'text';
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        accept(xhttp.responseText);
                    }
                };
                xhttp.open("GET", templateName, true);
                xhttp.send();
            });
        }
        self.getText = function (resourceName) {
            return getTemplate('resources/' + resourceName);
        };
    }
    return new Resource();
});