// define(["gamesResource"], function(gamesResource){

import { gamesResource } from './gamesResource.js';

class Game {
    constructor() {
        var self = this;
        self.getGames = function () {
            return gamesResource.get("/");
        };
    }
}

export const game = new Game();

// });