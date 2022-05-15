import { matrix } from './geom.js';

const tests = [
    function test() {
        let a = [[3, 5, 7], [9, 11, 13]];
        let b = [[3], [5], [7]];
        let test = matrix.multiply(a, b);
        console.log(test.length === a.length);
        console.log(test);
    },
    function test() {
        let a = [[3, 5]];
        let b = [[3, 9], [7, 11]];
        let test = matrix.multiply(a, b);
        console.log(test.length === a.length);
        console.log(test);
    },
    function () {
        let a = matrix.create({
            values: [1, 2, 3, 4, 5, 6],
            n: 2,
            m: 3
        });
        let b = matrix.create({
            values: [10, 10, 10, 10, 10, 10],
            n: 2,
            m: 3
        });
        matrix.sum(a, b);
        console.log(a);
        matrix.create({
            values: [1, 2, 3],
            n: 1,
            m: 3
        });
    }
];

tests.forEach(f => f());