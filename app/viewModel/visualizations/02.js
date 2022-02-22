const consoleEnabled = true;
const log = console.log;
console.log = (...args) => {
    if (consoleEnabled) {
        log(...args);
    }
}

class Corgis {
    constructor(ko) {
        const canvas = document.getElementById('circle-canvas');
        const c = canvas.getContext("2d");
        if (c) {
            const start = Date.now();
            /**
             * 60 fps.
             */
            const fps = 60;
            setInterval(() => {
                const currentDate = Date.now();
                const diff = (currentDate - start);
                // c.clearRect(0, 0, canvas.width, canvas.height);
                this.render(diff, c, canvas.width, canvas.height);
            }, 1 * 1000 / fps);
        }
        this.isFullscreenEnabled = ko.observable(false);
        this.fullScreenText = ko.computed(() => {
            return this.isFullscreenEnabled() ? 'Exit fullscreen' : 'Fullscreen';
        });
        this.start = () => {

        }
        this.onFullScreen = () => {
            this.isFullscreenEnabled(!this.isFullscreenEnabled());
        };
    }

    /**
     * Render the scene. Invoked every 60 fps.
     * @param {number} t Elapsed time.
     * @param {Canvas2dContext} c Canvas 2d context.
     */
    render(t, c, w, h) {
        const speed = 0.5;
        c.fillStyle = `rgb(0, 8, ${(t * speed) % 200}, ${Math.sin(t * speed)} )`;
        c.beginPath();
        const x = (t * speed) % w;
        const y = (h / 2) + (Math.sin(x * 2 * Math.PI / (w / 4)) * 100);
        c.arc(x, y, 10, 0, 2 * Math.PI);
        c.stroke();
        c.fill();
    }
}
define(['knockout'], (ko) => {
    return new Corgis(ko);
});