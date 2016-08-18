(function () {
    'use strict';

    var dependencies = [
        'model.emergencyContact'
    ];

    angular
        .module('private.views.emergencyContacts', dependencies)
        .controller('EmergencyContactsViewController', EmergencyContactsViewController);

    /** @ngInject */
    function EmergencyContactsViewController() {
        // Private variables
        var self = this;

        // Public variables
        self.emergencyContacts = [
            {
                firstName: 'Paulo Regis',
                lastName: 'de Medeiros Cavalcante',
                relationship: 'Father',
                email: 'pauloregismc@gmail.com',
                mobilePhone: '+49 251 - 74849741',
                telefonPhone: '+49 251 - 74849741',
                address: 'Düsbergweg 10, 48153 Münster'
            },
            {
                firstName: 'Paulo Regis',
                lastName: 'de Medeiros Cavalcante',
                relationship: 'Father',
                email: 'pauloregismc@gmail.com',
                mobilePhone: '+49 251 - 74849741',
                telefonPhone: '+49 251 - 74849741',
                address: 'Düsbergweg 10, 48153 Münster'
            }
        ];

        // Public methods

        // Private methods
        return (function init() {

        })();
    }
})();
