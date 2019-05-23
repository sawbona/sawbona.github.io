define(["knockout", "utils/te"], function(ko, te){
    function Table(){
        var self = this;
        self.gameId = ko.observable(te.getParameter('gameId') || "no game id");
    }

    return Table;
});