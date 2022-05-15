export class MatrixBase {

    static vector(...values) {
        return new MatrixBase(values);
    }

    constructor(values, n = 1, m = values.length) {
        if (values.length !== (n * m)) {
            throw Error(`Wrong definition. Expected values.length: ${values.length}, Yours: n: ${n}, m: ${m}. n * m = ${n * m}`);
        }
        this.values = values;
        this.n = n;
        this.m = m;
    }

    get x() {
        return this.values[0];
    }

    get y() {
        return this.values[1];
    }

    get z() {
        return this.values[2];
    }

    get(i, j) {
        if ((i < 0 || i >= this.n) || (j < 0 || j >= this.m)) {
            throw Error(`Wrong index. this.n: ${this.n}, this.m: ${this.m}. i: ${i}, j: ${j}.`);
        }
        return this.values[i * this.m + j]
    }

    clone() {
        return new Matrix([...this.values]);
    }
}

class Operations {

    multiplyScalar(matrix, scalar) {
        const values = matrix.values;
        for (let i = 0; i < values.length; ++i) {
            values[i] *= scalar;
        }
        return matrix;
    }
}

const operations = new Operations();


class MutableOperations {
    multiplyScalar(matrix, scalar) {
        return operations.multiplyScalar(matrix, scalar);
    }

    sum(left, other) {
        if (left.n !== other.n || left.m !== other.m) {
            throw Error(`Wrong dimensions. this.n: ${left.n}, other.n: ${other.n}, this.m: ${left.m}, other.m: ${other.m}`);
        }
        for (let i in left.values) {
            left.values[i] += other.values[i]
        }
        return left;
    }
}

class UnmutableOperations {

    multiplyScalar(matrix, scalar) {
        const result = matrix.clone();
        return operations.multiplyScalar(result, scalar);
    }

    sum(left, right) {

    }
}

export const constOperations = new UnmutableOperations();
export const mutOperations = new MutableOperations();

export class Matrix extends MatrixBase {

    static vector(...values) {
        return new Matrix(values);
    }

    set y(value) {
        this.values[1] = value;
    }

    sumEscalar(escalar) {
        for (let i in this.values) {
            this.values[i] += escalar;
        }
        return this;
    }

    sum(other) {
        if (this.n !== other.n || this.m !== other.m) {
            throw Error(`Wrong dimensions. this.n: ${this.n}, other.n: ${other.n}, this.m: ${this.m}, other.m: ${other.m}`);
        }
        for (let i in this.values) {
            this.values[i] += other.values[i]
        }
        return this;
    }

    multiply(other) {
        let values = [];
        for (let ai = 0; ai < this.n; ++ai) {
            for (let bj = 0; bj < other.m; ++bj) {
                let value = 0;
                for (let aj = 0; aj < this.m; ++aj) {
                    value += this.get(ai, aj) * other.get(aj, bj);
                }
                values[ai * other.m + bj] = value;
            }
        }
        return new Matrix(values, this.n, other.m);
    }

    multiplyEscalar(escalar) {
        for (let i = 0; i < this.values.length; ++i) {
            if (this.values[i] !== 0) {
                this.values[i] = this.values[i] * escalar;
            }
        }
        return this;
    }

}

class Utils {

    vector(...args) {
        return Matrix.vector(...args);
    }
}

export const vectors = new Utils();
