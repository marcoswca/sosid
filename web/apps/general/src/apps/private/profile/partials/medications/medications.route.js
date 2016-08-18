(function () {
    'use strict';

    var dependencies = [
        'private.views.medications',
        'private.routes.profile'
    ];

    angular
        .module('private.routes.medications', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.medications',
                config: {
                    url: '/medications',
                    controller: 'MedicationsViewController',
                    controllerAs: 'MedicationsViewCtrl',
                    templateUrl: 'templates/medications.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
