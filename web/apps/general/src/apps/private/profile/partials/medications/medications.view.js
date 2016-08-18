(function () {
    'use strict';

    var dependencies = [
        'model.medication'
    ];

    angular
        .module('private.views.medications', dependencies)
        .controller('MedicationsViewController', MedicationsViewController);

    /** @ngInject */
    function MedicationsViewController() {
        // Private variables
        var self = this;

        // Public variables
        self.viewName = 'Medications View';
        self.medications = [
            {
                name: 'Aspirin',
                dosage: 3,
                unit: 'capsules',
                frequency: 'per day',
                reasonForTaking: 'Tension headaches',
                notes: 'lorem ipsum sit dolor amet'
            },
            {
                name: 'Aspirin',
                dosage: 10,
                unit: 'capsules',
                frequency: 'per week',
                reasonForTaking: 'Tension headaches',
                notes: 'lorem ipsum sit dolor amet'
            }
        ];

        // Public methods

        // Private methods
        return (function init() {

        })();
    }
})();