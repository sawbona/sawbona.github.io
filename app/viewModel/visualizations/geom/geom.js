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
