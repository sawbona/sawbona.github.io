require.config({
    paths: {
        Vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue',
        knockout: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.0/knockout-min'
    }
});

require(["knockout", "navigation"], function (ko, navigation) {
    var knockoutApp = document.getElementById('knockout-app');
    var rootModel = {
        navigate: function(path){
            navigation.navigate(path);
        }
    };

    ko.applyBindings(rootModel, knockoutApp);
    if (window.location.hash && window.location.hash.length > 0) {
        navigation.loadComponent(window.location.hash);
    } else {
        navigation.loadComponent("home");
    }
});