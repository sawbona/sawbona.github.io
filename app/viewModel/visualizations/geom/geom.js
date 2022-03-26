class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    render(c) {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        c.fill();
    }
}


class Geom {

    constructor(c, w, h) {
        this.c = c;
        this.w = w;
        this.h = w;
    }

    circle(x, y, r) {
        return new Circle(x, y, r);
    }
}

class MatrixOperations {

    multiply(a, b) {
        const result = [];
        for (let indexRowA in a) {
            const rowA = a[indexRowA];
            const lengthA = rowA.length;
            const lengthB = b.length;
            if (lengthA != lengthB) {
                throw Error(`Different sizes. a = ${JSON.stringify(a)}, b = ${JSON.stringify(b)}, indexA = ${indexRowA}, b.n = ${lengthB}`);
            }
            const rowResult = [];
            for (let indexColumnB in b[0]) {
                let result = 0;
                for (let indexColumnA in a[indexRowA]) {
                    // multiply elements in the row of A x column of B.
                    result += a[indexRowA][indexColumnA] * b[indexColumnA][indexColumnB];
                }
                rowResult[indexColumnB] = result;
            }
            result[indexRowA] = rowResult;
        }
        return result;
    }

    /**
     * Sum a + b and store the result in a.
     * @param {Matrix} a 
     * @param {*} b 
     */
    sum(a, b) {
        for (let rowA in a) {
            for (let columnA in a[rowA]) {
                a[rowA][columnA] = a[rowA][columnA] + b[rowA][columnA];
            }
        }
    }

    create(params) {
        const { values, n, m } = params;
        if (values.length !== (n * m)) {
            throw Error(`Invalid number of values. Expected: ${n * m}, but got: ${values.length}`);
        }

        const result = [];
        for (let i = 0; i < n; ++i) {
            const row = [];
            for (let j = 0; j < m; ++j) {
                row[j] = values[i * m + j];
            }
            result.push(row);
        }
        return result;
    }
}

export const matrix = new MatrixOperations();