import { Corgis } from './geom/corgis.js'

class Particle {
    constructor(speed, frequency, yoffset) {
        this.speed = speed;
        this.frequency = frequency;
        this.yoffset = yoffset;
        this.counter = 0;
        this.red = Math.random() * 10;
        this.blue = Math.random() * 23;
    }

    draw(c, t, w, h) {
        if (this.counter++ % 20 === 0) {
            c.fillStyle = `rgb(${this.red}, ${this.blue}, ${50 + (Math.random() * 155)}, 0.5)`;
            c.beginPath();
            const x = t * this.speed;
            const realoffset = (this.yoffset * (1 + Math.floor((x / w))));
            const y = realoffset + (Math.sin((this.frequency * x / w) * (Math.PI * 2)) * 20);
            c.arc(x % w, y % h, Math.random() * 30, 0, 2 * Math.PI);
            c.fill();
        }
    }
}

export const model = new Corgis({
    setup(c, w, h) {
        c.fillStyle = "black";
        c.fillRect(0, 0, w, h);
        this.speed = 0.1;
        this.particles = [];
        this.particles.push(new Particle(0.1, 8, 40));
    },
    render(t, c, w, h) {
        this.particles.forEach(p => {
            p.draw(c, t, w, h);
        });
    }
});