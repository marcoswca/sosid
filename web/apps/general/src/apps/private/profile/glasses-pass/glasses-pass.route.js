(function () {
    'use strict';

    var dependencies = [
        'private.views.glassesPass',
        'private.routes.profile'
    ];

    angular
        .module('private.routes.glassesPass', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.glassesPass',
                config: {
                    url: '/glasses-pass',
                    controller: 'GlassesPassViewController',
                    controllerAs: 'GlassesPassViewCtrl',
                    templateUrl: 'templates/glasses-pass.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
