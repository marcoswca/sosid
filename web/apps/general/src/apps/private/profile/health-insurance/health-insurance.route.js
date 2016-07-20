(function () {
    'use strict';

    var dependencies = [
        'private.views.healthInsurance',
        'private.routes.profile'
    ];

    angular
        .module('private.routes.healthInsurance', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.healthInsurance',
                config: {
                    url: '/health-insurance',
                    controller: 'HealthInsuranceViewController',
                    controllerAs: 'HealthInsuranceViewCtrl',
                    templateUrl: 'templates/health-insurance.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
