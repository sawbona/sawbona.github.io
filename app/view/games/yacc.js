// define(["knockout", "game"], function(ko, game){
import { main } from '/app/main/src/panda/conejito.js'
class Model {
    constructor() {
        var self = this;
        self.response = ''; // ko.observable("");
        // init
        // game.getGames().then(function(games){
        // });
        // data
        // events
        self.viewName = ''; // ko.observable('');
        main.wire('#yacc-app');
    }
}
export const model = new Model();
