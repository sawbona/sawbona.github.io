import { Corgis } from './geom/corgis.js';
import { GIF } from './geom/gif.js';
import { Matrix } from './geom/matrix.js';
import { randoms } from './geom/randomUtils.js'
import { Limits } from './geom/limits.js';

class Point {
    constructor(x, y, z) {
        this.values = [x, y, z];
    }
}

class Cube {
    constructor() {
        this.points = [];
        this.points.push(new Point(-1, -1, -1));
        this.points.push(new Point(-1, -1, 1));
        this.points.push(new Point(-1, 1, -1));
        this.points.push(new Point(-1, 1, 1));
        this.points.push(new Point(1, -1, -1));
        this.points.push(new Point(1, -1, 1));
        this.points.push(new Point(1, 1, -1));
        this.points.push(new Point(1, 1, 1));
    }
}

class Fucito {

    constructor(params) {
        const { w, h } = params
        this.gif = new GIF();
        this.ready = false;
        this.position = Matrix.vector(0, h - 360, 0);

        /* speed = width in pixels / 20 minutes */
        this.speed = (w + 360) / (20 * 60 * 1000);
        this.gif.load('./resources/giphy-trans.gif');
    }

    render(params) {
        const { t, c, w } = params;
        if (!this.gif.loading) {
            let x = t * this.speed;
            c.drawImage(this.gif.image, Limits.extendedMod(x, -360, w), this.position.y);
        }
    }
}

export const model = new Corgis({
    setup(c, w, h) {
        c.fillStyle = "white";
        c.fillRect(0, 0, w, h);
        this.cube = new Cube();
        const tsecond = 0.04;
        this.rotationMatrix = new Matrix([
            Math.cos(tsecond), -Math.sin(tsecond), 0,
            Math.sin(tsecond), Math.cos(tsecond), 0,
            0, 0, 1
        ], 3, 3);
        const gif = new GIF();
        this.imageReady = [false, false];
        gif.onload = () => {
            this.imageReady[0] = true;
        };
        gif.load('./resources/giphy-trans.gif');
        this.gif = gif;
        this.img = new Image();   // Create new img element
        this.img.addEventListener('load', () => {
            this.imageReady[1] = true;
        });
        this.img.src = './resources/star-001-sm.png'; // Set source path
        this.speed = 0.01;
        this.point = Matrix.vector(0, 0, 0);
        this.delta = new Matrix([0.1, 0, 0]);
        this.point = this.point.sum(Matrix.vector(0, h - 360, 0));
        this.initialStars = 50 + (Math.random() * 50);
        this.stars = [];
        for (let i = 0; i < this.initialStars; i++) {
            const r = Math.random();
            let scale = 0.1 + (r * 0.9);
            this.stars.push({
                img: this.img,
                position: Matrix.vector(randoms.range(0, w), randoms.range(0, h - 200), 0),
                delta: Matrix.vector(Math.sqrt(scale) * -0.10, 0, 0),
                scale,
                reset: false
            });
        }
        this.fucito = new Fucito({ c, w, h });
    },

    render(t, c, w, h) {
        this.clear();
        if (this.imageReady.every(x => x)) {
            this.stars.forEach(s => {
                if (s.reset) {
                    s.position.y = randoms.range(0, h - 200);
                    const random = Math.random();
                    s.scale = 0.1 + (random * 0.9);
                    s.delta = Matrix.vector(Math.sqrt(s.scale) * -0.10, 0, 0);
                    s.reset = false;
                }
                const x = Limits.extendedMod(s.position.x, -32, w);
                if (x + 0.1 >= w) {
                    s.reset = true;
                }
                c.drawImage(s.img, x, s.position.y, 32 * s.scale, 32 * s.scale);
                s.position.sum(s.delta);
            });
            this.fucito.render({ t, c, w, h });
        }
    }
});