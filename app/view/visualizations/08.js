
import { Game } from '/games/snakewars/snakeWars.js';
import { Corgis } from './geom/corgis.js';

class GameRenderer {

    constructor(game) {
        this.game = game;
    }

    drawCells({ t, c, w, h, dt }) {
        const size = this.game.board.size;
        const width = w / size.m;
        this.cellWidth = width;
        for (let i = 0; i < size.n; ++i) {
            for (let j = 0; j < size.m; ++j) {
                c.beginPath();
                c.lineWidth = "1";
                c.strokeStyle = "red";
                c.rect(j * width, i * width, width, width);
                c.stroke();
            }
        }
    }

    renderPlayers({ t, c, w, h, dt }) {
        this.game.players.forEach(p => {
            p.render({ t, c, w, h, dt, cellWidth: this.cellWidth });
        });
    }

    render(params) {
        this.drawCells(params);
        this.renderPlayers(params);
    }
}


export const model = new Corgis({
    setup(c, w, h) {
        this.game = new Game();
        this.game.addPlayer();
        this.gameRenderer = new GameRenderer(this.game);
    },

    render(t, c, w, h, dt) {
        this.clear();
        this.gameRenderer.render({ t, c, w, h, dt });
    }
});