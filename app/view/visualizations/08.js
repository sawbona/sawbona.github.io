import { randoms } from '../../../../randoms/randoms.js';
import { Game } from '../../../games/snakewars/snakeWars.js';
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

    rect(c, x, y) {
        const cellWidth = this.cellWidth;
        c.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
    }

    renderPlayers({ t, c, w, h, dt }) {
        c.save();
        this.game.players.forEach(p => {
            c.fillStyle = 'white';
            c.strokeStyle = 'white';
            p.body.forEach(b => {
                this.rect(c, b.x, b.y);
            });
        });
        c.restore();
    }

    renderFruits({ c }) {
        c.save();
        c.fillStyle = 'rgb(22, 24, 80)';
        this.game.board.cells.forEach(cell => {
            if (cell.hasFruit) {
                this.rect(c, cell.i, cell.j);
            }
        });
        c.restore();
    }

    render(params) {
        this.drawCells(params);
        this.renderPlayers(params);
        this.renderFruits(params);
    }
}

class InputReader {
    constructor() {

    }
    
}


export const model = new Corgis({
    setup(c, w, h) {
        const n = 25;
        const m = 50;
        const gameConfig = {
            boardConfig: {
                n,
                m
            },
            initialFruit: {
                i: randoms.rand(n),
                j: randoms.rand(m)
            }
        };
        this.game = new Game(gameConfig);
        this.game.addPlayer();
        this.gameRenderer = new GameRenderer(this.game);
    },

    render(t, c, w, h, dt) {
        this.clear();
        this.gameRenderer.render({ t, c, w, h, dt });
    }
});