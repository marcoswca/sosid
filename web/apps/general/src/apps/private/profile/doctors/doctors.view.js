(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.doctors', dependencies)
        .controller('DoctorsViewController', DoctorsViewController);

    /** @ngInject */
    function DoctorsViewController() {
        // Private variables
        var self = this;
        self.medicalSpeciality = '';
        self.doctors = [
            {
                firstName: 'Paulo Regis',
                lastName: 'de Medeiros Cavalcante',
                medicalSpeciality: 'Emergency Medicine',
                email: 'pauloregismc@gmail.com',
                mobilePhone: '+49 251 - 74849741',
                telefonPhone: '+49 251 - 74849741',
                clinicAddress: 'Düsbergweg 10, 48153 Münster'
            },
            {
                firstName: 'Marcio Tanure',
                lastName: 'Fernandes da Silva',
                medicalSpeciality: 'Emergency Medicine',
                email: 'marciotanure@gmail.com',
                mobilePhone: '+49 251 - 74849741',
                telefonPhone: '+49 251 - 74849741',
                clinicAddress: 'Düsbergweg 10, 48153 Münster'
            }
        ];

        // Public variables
        self.viewName = 'Doctors view'; //temporary

        self.states = (['Gastroenterology', 'Emergency Medicine', 'Internal Medicine', 'Pediatrics']).map(function (state) { return { abbrev: state }; });

        // Public methods

        // Private methods
        return (function init() {

        })();
    }
})();
