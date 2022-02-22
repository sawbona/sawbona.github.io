const consoleEnabled = true;
const log = console.log;
console.log = (...args) => {
    if (consoleEnabled) {
        log(...args);
    }
}

class Corgis {
    constructor(ko) {
        const canvas = this.getCanvas();
        const c = canvas.getContext("2d");
        if (c) {
            const start = Date.now();
            /**
             * 60 fps.
             */
            const fps = 60;
            this.setup(c, canvas.width, canvas.height);
            setInterval(() => {
                const currentDate = Date.now();
                const diff = (currentDate - start);
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
            const elem = this.getCanvas();
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
            }
        };
    }

    getCanvas() {
        return document.getElementById('circle-canvas');
    }

    setup(c, w, h) {
        // c.fillStyle = "black";
        // c.fillRect(0, 0, w, h);
    }

    /**
     * Render the scene. Invoked every 60 fps.
     * @param {number} t Elapsed time.
     * @param {Canvas2dContext} c Canvas 2d context.
     */
    render(t, c, w, h) {
        const speed = 0.1;
        const colorSpeed = 0.1;
        c.fillStyle = `rgb(13, 80, ${((t * colorSpeed) % 100) + 50}, 0.45)`;
        // console.log(`c.fillStyle = ${c.fillStyle}`);
        c.beginPath();
        const x = (t * speed) % w;
        if (x % 10 < 9) {
            return;
        }
        const circleHeight = 10;
        const y = (h / 2) + (Math.sin(x * 2 * Math.PI / (w / 4)) * 50) + ((Math.floor((t * speed) / w)) * circleHeight * 1.8);
        c.arc(x, y % h, circleHeight, 0, 2 * Math.PI);
        // c.stroke();
        c.fill();
    }
}
define(['knockout'], (ko) => {
    return new Corgis(ko);
});