import { MatrixBase } from '/matrix/matrix.js';

import { randoms } from '/randoms/randoms.js';

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
    constructor(direction, board) {
        this.board = board;
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
                this.#update({ dt });
                this.lastUpdate = now;
                this.updateLoopId = setTimeout(updateLoop, this.speed);
            } catch (error) {
                console.error(error);
            }
        };
        this.updateLoopId = setTimeout(updateLoop, 0);
    }

    #update(dt) {
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
        this.body.forEach(b => {
            c.fillRect(b.x * cellWidth, b.y * cellWidth, cellWidth, cellWidth);
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

export class Game {
    constructor() {
        this.board = new Board();
        this.players = [];
    }

    addPlayer() {
        this.players.push(new Player(MatrixBase.vector(1, 0), this.board));
    }

}