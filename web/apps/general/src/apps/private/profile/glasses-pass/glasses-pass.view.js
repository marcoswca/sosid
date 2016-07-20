(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.glassesPass', dependencies)
        .controller('GlassesPassViewController', GlassesPassViewController);

    /** @ngInject */
    function GlassesPassViewController() {
        // Private variables
        var self = this;

        // Public variables
        self.viewName = 'Living Will View';

        // Public methods

        // Private methods
        return (function init() {

        })();
    }
})();
