import { matrixOps } from './geom.js';

function test1() {
    let a = [[3, 5, 7], [9, 11, 13]];
    let b = [[3], [5], [7]];
    let test = matrixOps.multiply(a, b);
    console.log(test.length === a.length);
    console.log(test);
}

function test2() {
    let a = [[3, 5]];
    let b = [[3, 9], [7, 11]];
    let test = matrixOps.multiply(a, b);
    console.log(test.length === a.length);
    console.log(test);
}

test1();
test2();