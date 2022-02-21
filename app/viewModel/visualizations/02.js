class Corgis {
    constructor(ko) {
        const canvas = document.getElementById('circle-canvas');
        const gl = canvas.getContext("webgl");
        if (gl) {
            // Set clear color to black, fully opaque
            gl.clearColor(0.2, 0.3, 0.4, 1.0);
            // Clear the color buffer with specified clear color
            gl.clear(gl.COLOR_BUFFER_BIT);
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
}
define(['knockout'], (ko) => {
    return new Corgis(ko);
});