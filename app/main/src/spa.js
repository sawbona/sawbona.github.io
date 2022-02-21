define(["knockout", "navigation"], function (ko, navigation) {

    /**
     * Class invoked by aqua.js.
     * This is called when the user clicks on the `bindingHandlers.navigate` in the menu of the page.
     */
    class Spa {
        constructor() {
            var self = this;
            self.show = function (navigationPath) {
                navigation.viewName(navigationPath);
            };
        }
    }

    return new Spa();
});