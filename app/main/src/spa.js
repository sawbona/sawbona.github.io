define(["knockout", "navigation"], function(ko, navigation){
    function Spa(){
        var self = this;
        self.show = function(navigationPath){
            navigation.viewName(navigationPath);
        };
    }

    return new Spa();
});