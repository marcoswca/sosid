(function () {
    'use strict';

    var dependencies = [
        'private.views.profile'
    ];

    angular
        .module('private.routes.profile', dependencies)
        .config(config)
        .run(configureRoute);

    function config($urlRouterProvider) {
        $urlRouterProvider.when('/profile', '/profile/');
    }

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile',
                config: {
                    url: 'profile',
                    parent: 'private',
                    abstract: true,
                    controller: 'ProfileViewController',
                    controllerAs: 'ProfileViewCtrl',
                    templateUrl: 'templates/profile.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
