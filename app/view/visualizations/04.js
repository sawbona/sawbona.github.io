import { Corgis } from './geom/corgis.js'
import { matrix } from './geom/geom.js';
import { Matrix } from './geom/matrix.js';

class Point {
    constructor(x, y, z) {
        this.values = [x, y, z];
    }

    render(c) {
        c.beginPath();
        c.arc(this.values[0], this.values[1], 3, 0, Math.PI * 2);
        c.lineWidth = 2;
        c.strokeStyle = 'white';
        c.stroke();
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

export const model = new Corgis({
    setup(c, w, h) {
        c.fillStyle = "black";
        c.fillRect(0, 0, w, h);
        this.speed = 0.1;
        this.cube = new Cube();
        this.cube.points.forEach(p => {
            p.values = matrix.multiply([p.values], matrix.create({
                values: [10, 0, 0, 0, 10, 0, 0, 0, 10],
                n: 3,
                m: 3
            }))[0];
        });
        const tsecond = 0.04;
        const rotationMatrix = [
            [Math.cos(tsecond), -Math.sin(tsecond), 0],
            [Math.sin(tsecond), Math.cos(tsecond), 0],
            [0, 0, 1]
        ];
        this.rotationMatrix = rotationMatrix;
        this.translate = matrix.create({
            values: [50, 50, 50],
            n: 1,
            m: 3
        });
        this.translate2 = matrix.multiply(this.translate, matrix.create({
            values: [-1, 0, 0, 0, -1, 0, 0, 0, -1],
            n: 3,
            m: 3
        }));
    },

    render(t, c, w, h) {
        this.clear();
        this.cube.points.forEach(p => {
            let temp = matrix.multiply([p.values], this.rotationMatrix);
            p.values = temp[0];
            matrix.sum([p.values], this.translate);
            p.render(c);
            matrix.sum([p.values], this.translate2);
        });
    }
});