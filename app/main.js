require.config({
    baseUrl: "app/main/src",
    paths: {
        Vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue',
        knockout: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.0/knockout-min'
    }
});

require(["knockout",
    "navigation",
    'agua'],
    function (ko, navigation) {
        const knockoutApp = document.getElementById('knockout-app');
        const rootModel = {
            viewName: navigation.viewName,
            navigate: function (path) {
                return navigation.navigate(path);
            },
            asd: 'asd'
        };
        ko.applyBindings(rootModel, knockoutApp);
    });