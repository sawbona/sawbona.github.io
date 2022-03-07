class Agua {

    getTemplate(templateName) {
        const prefix = "app/view/";
        templateName = prefix + templateName;
        return new Promise(function (accept) {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    accept(xhttp.responseText);
                }
            };
            xhttp.open("GET", templateName, true);
            xhttp.send();
        });
    }
}

export const agua = new Agua();