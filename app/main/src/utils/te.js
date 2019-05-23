define([], function () {

    function getParameter(parameter) {
        var url_string = window.location.href
        var url = new URL(url_string);
        var c = url.searchParams.get(parameter);
        return c;
    }

    return {
        getParam: getParameter,
        getParameter: getParameter
    };
});