(function () {
    'use strict';

    var dependencies = [
        'private.views.profile'
    ];

    angular
        .module('private.routes.profile', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile',
                config: {
                    url: 'profile',
                    parent: 'private',
                    controller: 'ProfileViewController',
                    controllerAs: 'ProfileViewCtrl',
                    templateUrl: 'templates/profile.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
