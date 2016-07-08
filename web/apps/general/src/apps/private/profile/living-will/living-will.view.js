(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.livingWill', dependencies)
        .controller('LivingWillViewController', LivingWillViewController);

    /** @ngInject */
    function LivingWillViewController() {
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
