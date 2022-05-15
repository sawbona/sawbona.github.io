import { randoms } from './randomUtils.js';

const test = [
    function t1() {
        for (let i = 0; i < 100; i++) {
            const value = randoms.range(20, 40);
            if (value < 20 || value > 40) {
                throw Error(`invalid value found: ${value}`);
            }
        }
        console.log(`ok`);
    }
];


test.forEach(t => t());