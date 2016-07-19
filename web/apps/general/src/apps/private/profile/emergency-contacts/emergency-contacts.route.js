(function () {
    'use strict';

    var dependencies = [
        'private.views.emergencyContacts',
        'private.routes.profile'
    ];

    angular
        .module('private.routes.emergencyContacts', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.emergencyContacts',
                config: {
                    url: '/emergency-contacts',
                    controller: 'EmergencyContactsViewController',
                    controllerAs: 'EmergencyContactsViewCtrl',
                    templateUrl: 'templates/emergency-contacts.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
