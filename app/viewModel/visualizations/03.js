class Corgis {
    constructor() {
        this.isFullscreenEnabled = false;
        const canvas = this.getCanvas();
        const c = canvas.getContext("2d");
        if (c) {
            const start = Date.now();
            /**
             * 60 fps.
             */
            this.fps = 60;
            this.setup(c, canvas.width, canvas.height);
            setInterval(() => {
                const currentDate = Date.now();
                const diff = (currentDate - start);
                this.render(diff, c, canvas.width, canvas.height);
            }, 1 * 1000 / this.fps);
        }
        canvas.addEventListener('mousedown', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX;
            const y = event.clientY;
            this.points.push({ x, y, r: 10, t: Date.now() });
        })
        const fullScreenButton = document.getElementById('full-screen-button');
        fullScreenButton.onclick = () => {
            this.onFullScreen();
        };
    }

    onFullScreen() {
        this.isFullscreenEnabled = !this.isFullscreenEnabled;
        const elem = this.getCanvas();
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    };

    getCanvas() {
        return document.getElementById('circle-canvas');
    }

    setup(c, w, h) {
        // this.fps = 5;
        c.fillStyle = "black";
        c.fillRect(0, 0, w, h);
        this.points = [];
        this.points.push({
            x: 0,
            y: h,
            r: 40,
            t: Date.now(),
            counter: 0,
            render(t) {
                this.counter++;
                if (this.counter % 30 > 0) {
                    return;
                }
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
        });
        c.translate(0, 100);
    }

    /**
     * Render the scene. Invoked every 60 fps.
     * @param {number} t Elapsed time.
     * @param {Canvas2dContext} c Canvas 2d context.
     */
    render(t, c, w, h) {
        this.points.forEach(point => {
            point.render(t);
        });
    }
}

export const model = new Corgis();