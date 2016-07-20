(function () {
    'use strict';

    var dependencies = [
        'private.views.allergies',
        'private.routes.profile'
    ];

    angular
        .module('private.routes.allergies', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.allergies',
                config: {
                    url: '/allergies',
                    controller: 'AllergiesViewController',
                    controllerAs: 'AllergiesViewCtrl',
                    templateUrl: 'templates/allergies.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
