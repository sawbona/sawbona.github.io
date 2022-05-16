import { MatrixBase } from '/matrix/matrix.js';

import { randoms } from '/randoms/randoms.js';

class BoardCell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
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
        this.lastUpdate = Date.now();
        this.speed = 1000 / 5;
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
        if (last.x + this.direction.x >= this.board.size.m) {
            last.x = 0;
        } else {
            last.x += this.direction.x;
        }
        if (last.y + this.direction.y >= this.board.size.n) {
            last.y = 0;
        } else {
            last.y += this.direction.y;
        }
    }
}

class Board {
    constructor(gameConfig) {
        const { boardConfig: { n, m } } = gameConfig;
        this.size = { n, m };
        this.cells = [];
        for (let i = 0; i < this.size.n; i++) {
            for (let j = 0; j < this.size.m; j++) {
                this.cells.push(new BoardCell(i, j));
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
    constructor(gameConfig) {
        this.board = new Board(gameConfig);
        this.players = [];
    }

    changePlayerDirection(i, direction) {
        this.players[i].direction = MatrixBase.vector(1, 0);
    }

    addPlayer() {
        this.players.push(new Player(MatrixBase.vector(0, 1), this.board));
    }

}