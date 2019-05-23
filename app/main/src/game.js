define(["gamesResource"], function(gamesResource){

    function Game(){
        var self = this;
        self.getGames = function(){
            return gamesResource.get("/");
        };
    }

    return new Game();

});