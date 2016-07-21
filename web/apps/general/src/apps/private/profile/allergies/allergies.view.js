(function () {
    'use strict';

    var dependencies = [
        'model.allergie'
    ];

    angular
        .module('private.views.allergies', dependencies)
        .controller('AllergiesViewController', AllergiesViewController);

    /** @ngInject */
    function AllergiesViewController() {
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