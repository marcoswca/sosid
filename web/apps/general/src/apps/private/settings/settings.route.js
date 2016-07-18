(function () {
    'use strict';

    var dependencies = [
        'private.views.settings'
    ];

    angular
        .module('private.routes.settings', dependencies)
        .config(config)
        .run(configureRoute);

    function config($urlRouterProvider) {
        $urlRouterProvider.when('/settings', '/settings/change-password');
        $urlRouterProvider.when('/settings/', '/settings/change-password');
    }

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'settings',
                config: {
                    url: 'settings',
                    parent: 'private',
                    controller: 'SettingsViewController',
                    controllerAs: 'SettingsViewCtrl',
                    templateUrl: 'templates/settings.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
