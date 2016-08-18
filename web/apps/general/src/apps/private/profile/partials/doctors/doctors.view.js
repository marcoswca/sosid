(function () {
    'use strict';

    var dependencies = [
        'model.doctor'
    ];

    angular
        .module('private.views.doctors', dependencies)
        .controller('DoctorsViewController', DoctorsViewController);

    /** @ngInject */
    function DoctorsViewController(DoctorApi) {
        // Private variables
        var self = this;

        // Public variables
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

        // Public methods

        // Private methods
        return (function init() {

        })();
    }
})();
