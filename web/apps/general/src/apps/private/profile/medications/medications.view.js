(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.medications', dependencies)
        .controller('MedicationsViewController', MedicationsViewController);

    /** @ngInject */
    function MedicationsViewController() {
        // Private variables
        var self = this;

        // Public variables
        self.viewName = 'Medications View';

        // Public methods

        // Private methods
        return (function init() {

        })();
    }
})();
