import { Matrix } from './matrix.js';
let a = new Matrix([1, 2, 3, 4, 5, 6], 2, 3);
let b = new Matrix([10, 10, 10, 10, 10, 10], 2, 3);
let test = [() => {
    b.sum(a);
    console.log(b);
}, () => {
    let vector = new Matrix([1, 2, 3]);
    console.log(vector);
}, () => {
    let a = new Matrix([1, 2, 3, 4, 5, 6], 2, 3);
    for (let i = 0; i < 2; ++i) {
        for (let j = 0; j < 3; ++j) {
            console.log(a.get(i, j));
        }
    }
}, () => {
    let a = new Matrix([1, 2, 3, 4, 5, 6], 2, 3);
    let b = new Matrix([10, 100], 1, 2);
    a = b.multiply(a);
    console.log(a);
}, () => {
    let a = new Matrix(
        [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ], 3, 3);
    let b = new Matrix([10, 100, 100], 1, 3);
    a = b.multiply(a);
    console.log(a);
}, () => {
    let a = new Matrix(
        [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ], 3, 3);
}, () => {
    let a = new Matrix(
        [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ], 3, 3);
    a.multiplyEscalar(-1);
    console.log(a);
}];

test.forEach(f => {
    f();
});