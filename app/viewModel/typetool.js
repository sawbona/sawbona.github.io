define(["knockout"], function (ko) {
    function Model() {
        var self = this;

        var target = 'Support for constants (also known as "immutable variables"), i.e., variables which cannot be re-assigned new content. Notice: this only makes the variable itself immutable, not its assigned content (for instance, in case the content is an object, this means the object itself can still be altered).';
        if (localStorage) {
            console.log(localStorage.target);
            if (localStorage.target && localStorage.target != null) {
                target = localStorage.target;
            } else {
                localStorage.target = target;
            }
        }
        self.target = ko.observable(target);
        self.input = ko.observable("");
        self.correctCount = ko.observable(0);

        // events
        self.target.subscribe(function (value) {
            console.log(value);
            localStorage.target = value;
        });

        self.input.subscribe(function (value) {
            var count = 0;
            for (var i = 0; i < value.length; i++) {
                if (i < self.target().length && value[i] == self.target()[i]) {
                    count++;
                }
            }
            self.correctCount(count);
        });
    }

    return new Model();
});