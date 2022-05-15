import { Particle } from './particle.js';

const test = [
    function t1() {
        const p1 = new Particle();
        for (let i = 0; i < 1000; i++) {
            p1.update(1);
        }
        console.log(p1.position.values);
    }
];

test.forEach(f => f());