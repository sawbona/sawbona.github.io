define(["knockout"], function(ko){
    function Home(){
        var self = this;
        self.games = ko.observableArray([]);
    }
    return new Home();
});