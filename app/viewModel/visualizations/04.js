import { Corgis } from './geom/corgis.js'
import { matrix } from './geom/geom.js';

let a = [[1, 2, 3], [4, 5, 6]];
let b = [[7, 8], [9, 10], [11, 12]];
let test = matrix.multiply(a, b);
console.log(test);

class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    render(c) {
        c.beginPath();
        c.arc(this.x, this.y, 10, 0, Math.PI * 2);
        c.lineWidth = 2;
        c.strokeStyle = 'red';
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
    },
    render(t, c, w, h) {
        this.clear();
        const tsecond = Math.sqrt(t);
        const rotationMatrix = [
            [Math.cos(tsecond), -Math.sin(tsecond)],
            [Math.sin(tsecond), Math.cos(tsecond)]
        ];
        this.cube.points.forEach(p => {
            const size = 50;
            const result = matrix.multiply(rotationMatrix, [[p.x], [p.y]]);
            const m = new Point(result[0][0] * size, result[1][0] * size, p.z * size);
            m.x += 80;
            m.y += 80;
            m.z += 80;
            m.render(c);
        });
    }
});