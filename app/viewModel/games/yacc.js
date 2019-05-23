define(["knockout", "game"], function(ko, game){
    function Model(){
        var self = this;
        self.response = ko.observable("");

        // init
        // game.getGames().then(function(games){

        // });

        // data

        // events
        self.viewName = ko.observable('');
    }

    return new Model();
});