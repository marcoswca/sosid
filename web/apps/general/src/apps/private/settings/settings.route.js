(function () {
    'use strict';

    var dependencies = [
        'private.views.settings'
    ];

    angular
        .module('private.routes.settings', dependencies)
        .run(configureRoute);

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
                    templateUrl: 'templates/Settings.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
