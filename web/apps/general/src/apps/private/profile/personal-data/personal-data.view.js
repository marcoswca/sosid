(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.personalData', dependencies)
        .controller('PersonalDataViewController', PersonalDataViewController);

    /** @ngInject */
    function PersonalDataViewController() {
        // Private variables
        var self = this;

        // Public variables
        self.viewName = 'Personal Data View';

        // Public methods

        // Private methods
        return (function init() {

        })();
    }
})();
