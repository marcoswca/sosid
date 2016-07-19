(function () {
    'use strict';

    var dependencies = [
        'private.views.healthConditions',
        'private.routes.profile'
    ];

    angular
        .module('private.routes.healthConditions', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.healthConditions',
                config: {
                    url: '/health-conditions',
                    controller: 'HealthConditionsViewController',
                    controllerAs: 'HealthConditionsViewCtrl',
                    templateUrl: 'templates/health-conditions.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
