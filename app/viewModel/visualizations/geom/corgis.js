
/**
 * Basic class for animation setup.
 */
export class Corgis {

    /**
     * Creates a basic corgi with a config.
     * The render function is called every frame.
     * The setup function is called once before starting.
     * @param {
     * render: function(){},
     * setup:function(){},
     * canvasId: string?
     * } config 
     */
    constructor(config) {
        this.config = config;
        const canvas = this.getCanvas(this.config.canvasId);
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
            const x = event.clientX;
            const y = event.clientY;
            this.points.push({ x, y, r: 10, t: Date.now() });
        })
    }

    getCanvas(canvasId) {
        return document.getElementById(canvasId || 'circle-canvas');
    }

    setup(...params) {
        // this.fps = 5;
        // c.fillStyle = "black";
        // c.fillRect(0, 0, w, h);
        // this.points = [];
        // this.points.push({ x: 0, y: h, r: 10, t: Date.now() });
        // c.translate(100, 100);
        // this.config.setup.apply(this);
        this.config.setup.call(this, ...params);
    }

    /**
     * Render the scene. Invoked every 60 fps.
     * @param {number} t Elapsed time.
     * @param {Canvas2dContext} c Canvas 2d context.
     */
    render(...params) {
        this.config.render.call(this, ...params);
        // this.points.forEach(point => {
        //     if (t % 60 > 5) {
        //         return;
        //     }
        //     c.fillStyle = `rgb(10, 23, 111, 0.5)`;
        //     c.beginPath();
        //     const y = Math.sin(point.x) * 40 + point.y;
        //     const x = point.x;
        //     c.arc(x % w, y % h, Math.random() * point.r, 0, 2 * Math.PI);
        //     c.fill();
        //     point.x = t * 0.05;
        //     point.y = Math.floor(x / w);
        // });
    }
}