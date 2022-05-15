class Corgis {
    constructor() {
        const canvas = this.getCanvas();
        const c = canvas.getContext("2d");
        if (c) {
            const start = Date.now();
            /**
             * 60 fps.
             */
            const fps = 5;
            this.setup(c, canvas.width, canvas.height);
            setInterval(() => {
                const currentDate = Date.now();
                const diff = (currentDate - start);
                this.render(diff, c, canvas.width, canvas.height);
            }, 1 * 1000 / fps);
        }
        this.start = () => {
        }
        this.onFullScreen = () => {
            this.isFullscreenEnabled(!this.isFullscreenEnabled());
            const elem = this.getCanvas();
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
            }
        };

        canvas.addEventListener('mousedown', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            this.points.push({ x, y, r: 10, t: Date.now() });
        })
    }

    getCanvas() {
        return document.getElementById('circle-canvas');
    }

    setup(c, w, h) {
        c.fillStyle = "black";
        c.fillRect(0, 0, w, h);
        this.points = [];
        this.points.push({ x: 0, y: h, r: 10, t: Date.now() });
        // c.translate(0, h / 2);
    }

    /**
     * Render the scene. Invoked every 60 fps.
     * @param {number} t Elapsed time.
     * @param {Canvas2dContext} c Canvas 2d context.
     */
    render(t, c, w, h) {
        this.points.forEach(point => {
            const colorSpeed = 0.1;
            c.fillStyle = `rgb(13, 80, ${((t * (Math.random() * colorSpeed)) % 100) + 50}, 0.45)`;
            c.beginPath();
            const x = point.x + (t * 0.1);
            const y = point.y + ((x / w) * 10) + (Math.sin((x) * ((2 * Math.PI) / (w / 4))) * 50);
            c.arc(x % w, y % h, Math.random() * point.r, 0, 2 * Math.PI);
            c.fill();
        });
    }
}
export const model = new Corgis();