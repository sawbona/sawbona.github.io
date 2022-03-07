import { Corgis } from './geom/corgis.js'
export const model = new Corgis({
    setup(c, w, h) {
        c.fillStyle = "black";
        c.fillRect(0, 0, w, h);
        this.points = [];
        this.points.push({
            x: 0,
            y: h,
            r: 40,
            t: Date.now(),
            counter: 0,
            paint(t) {
                if (this.counter % 30 == 0) {
                    c.fillStyle = `rgb(10, 23, 111, 0.5)`;
                    c.beginPath();
                    const x = this.x;
                    const y = this.y;
                    // const y = point.y + ((x / w) * 10) + (Math.sin((point.x * ((2 * Math.PI) / (w / 4))) * 50));
                    c.arc(x % w, y % h, Math.random() * this.r, 0, 2 * Math.PI);
                    c.fill();
                    this.x = t * 0.05;
                    this.y = Math.floor(x / w);
                }
                this.counter++;
            }
        });
        c.translate(0, 100);
    },
    render(t, c, w, h) {
        this.points.forEach(point => {
            point.paint(t);
        });
    }
});