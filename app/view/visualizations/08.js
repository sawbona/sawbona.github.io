import { Corgis } from './geom/corgis.js';
import { Particle } from './geom/particle.js';
import { randoms } from './geom/randomUtils.js';
import { MatrixBase } from './geom/matrix.js';

class BoardCell {
    constructor() {
        this.hasFruit = false;
    }
}

class PlayerBodyCell {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class Player {
    constructor(direction) {
        this.direction = direction;
        this.body = [];
        this.body.push(new PlayerBodyCell(0, 0));
        this.body.push(new PlayerBodyCell(1, 0));
        this.body.push(new PlayerBodyCell(2, 0));
        this.lastUpdate = Date.now();
        this.speed = 1000 / 1;
        const updateLoop = () => {
            try {
                const now = Date.now();
                const dt = now - this.lastUpdate;
                this.update({ dt });
                this.lastUpdate = now;
                this.updateLoopId = setTimeout(updateLoop, this.speed);
            } catch (error) {
                console.error(error);
            }
        };
        this.updateLoopId = setTimeout(updateLoop, 0);
    }

    update(dt) {
        for (let i = 0; i < this.body.length - 1; i++) {
            this.body[i].x = this.body[i + 1].x;
            this.body[i].y = this.body[i + 1].y;
        }
        const last = this.body[this.body.length - 1];
        last.x += this.direction.x;
        last.y += this.direction.y;
    }

    render({ t, c, w, h, dt, cellWidth }) {
        c.save();
        c.fillStyle = 'white';
        c.strokeStyle = 'white';
        // const deltaWidth = t * this.speed * cellWidth;
        this.body.forEach(b => {
            // c.beginPath();
            // console.log(`cellWidth = ${cellWidth}`);
            c.fillRect(b.x * cellWidth, b.y * cellWidth, cellWidth, cellWidth);
            // c.fill();
        });
        c.restore();
    }
}

class Board {
    constructor() {
        this.size = { n: 50, m: 50 };
        this.cells = [];
        for (let i = 0; i < this.size.n; i++) {
            for (let j = 0; j < this.size.m; j++) {
                this.cells.push(new BoardCell());
            }
        }
        const random = randoms.range(0, this.size.n * this.size.m);
        this.cells[random].hasFruit = true;

    }

    getCell(i, j) {
        return this.cells[i * this.size.n + j];
    }
}

class Game {
    constructor() {
        this.board = new Board();
        this.players = [];
    }

    addPlayer() {
        this.players.push(new Player(MatrixBase.vector(1, 0)));
    }

}

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