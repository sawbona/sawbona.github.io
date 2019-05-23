define([""], function(){

    function Request(){

        function getHttpRequest(url, responseType) {
            return new Promise(function (accept) {
                var xhttp = new XMLHttpRequest();
                xhttp.withCredentials = true;
                if(responseType){
                    xhttp.responseType = responseType;
                }
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                            console.log(xhttp.responseText);
                            if(xhttp.responseType){
                                accept(xhttp.responseText);
                            }else{
                                accept(JSON.parse(xhttp.responseText));
                            }
                    }
                };
                xhttp.open("GET", url, true);
                xhttp.send();
            });
        }

        var self = this;
        self.getText = function(url){
            return getHttpRequest(url, "text");
        };

        self.get = function(url){
            return getHttpRequest(url);
        };
    }


    return new Request();
});