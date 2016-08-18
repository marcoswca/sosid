(function () {
    'use strict';

    var dependencies = [
        'model.healthCondition'
    ];

    angular
        .module('private.views.healthConditions', dependencies)
        .controller('HealthConditionsViewController', HealthConditionsViewController);

    /** @ngInject */
    function HealthConditionsViewController() {
        // Private variables
        var self = this;

        // Public variables
        self.healthConditions = [
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