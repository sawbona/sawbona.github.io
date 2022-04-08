import { Corgis } from './geom/corgis.js';
import { GIF } from './geom/gif.js';
import { Matrix } from './geom/matrix.js';
import { RandomUtils } from './geom/randomUtils.js'
import { Limits } from './geom/limits.js';

class Point {
    constructor(x, y, z) {
        this.values = [x, y, z];
    }

    // render(c) {
    //     c.beginPath();
    //     c.arc(this.values[0], this.values[1], 3, 0, Math.PI * 2);
    //     c.lineWidth = 2;
    //     c.strokeStyle = 'white';
    //     c.stroke();
    // }
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
        this.initialStars = 10 + (Math.random() * 99);
        this.stars = [];
        for (let i = 0; i < this.initialStars; i++) {
            const r = Math.random();
            this.stars.push({
                img: this.img,
                position: Matrix.vector(RandomUtils.range(0, w), RandomUtils.range(0, h - 200), 0),
                delta: Matrix.vector(r * -0.05, 0, 0),
                scale: 0.1 + (r * 0.9),
                reset: false
            });
        }
    },

    render(t, c, w, h) {
        this.clear();
        if (this.imageReady.every(x => x)) {
            this.stars.forEach(s => {
                if (s.reset) {
                    s.position.y = RandomUtils.range(0, h - 200);
                    const random = Math.random();
                    s.delta = Matrix.vector(random * -0.05, 0, 0);
                    s.scale = 0.1 + (random * 0.9);
                    s.reset = false;
                }
                const x = Limits.extendedMod(s.position.x, -32, w);
                if (x + 0.1 >= w) {
                    s.reset = true;
                }
                c.drawImage(s.img, x, s.position.y, 32 * s.scale, 32 * s.scale);
                s.position.sum(s.delta);
            });

            c.drawImage(this.gif.image, Limits.extendedMod(this.point.x, -360, w), this.point.y);
            this.point.sum(this.delta);
        }
    }
});