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
                    // Note: we us indexColumnA in a and also as a row index in b.
                    result += a[indexRowA][indexColumnA] * b[indexColumnA][indexColumnB];
                }
                rowResult[indexColumnB] = result;
            }
            result[indexRowA] = rowResult;
        }
        return result;
    }

}

export const matrix = new MatrixOperations();