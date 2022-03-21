
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
            this.canvas = canvas;
            this.c = c;
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
        this.onFullScreen = () => {
            // this.isFullscreenEnabled(!this.isFullscreenEnabled());
            const elem = this.getCanvas();
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
            }
        };

        const fullscreenButton = document.getElementById('full-screen-button');
        if (fullscreenButton) {
            fullscreenButton.onclick = this.onFullScreen;
        }

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
        this.config.setup.call(this, ...params);
    }

    /**
     * Render the scene. Invoked every 60 fps.
     * @param {number} t Elapsed time.
     * @param {Canvas2dContext} c Canvas 2d context.
     */
    render(...params) {
        this.config.render.call(this, ...params);
    }

    /**
     * Clear all the canvas using fillStyle.
     * @param {string} fillStyle Fill style for canvas context.
     */
    clear(fillStyle = 'black') {
        this.c.fillStyle = fillStyle;
        this.c.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}