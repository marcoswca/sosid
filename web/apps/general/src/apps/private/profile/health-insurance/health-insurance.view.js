(function () {
    'use strict';

    var dependencies = [
        'model.healthInsurance'
    ];

    angular
        .module('private.views.healthInsurance', dependencies)
        .controller('HealthInsuranceViewController', HealthInsuranceViewController);

    /** @ngInject */
    function HealthInsuranceViewController() {
        // Private variables
        var self = this;

        // Public variables
        self.healthInsurance = [
            {
                condition: 'Chronic Pain',
                severity: 'Moderate'
            },
            {
                condition: 'Stomach or Intestinal Problems',
                severity: 'Severe'
            }
        ];

        // Public methods

        // Private methods
        return (function init() {

        })();
    }
})();