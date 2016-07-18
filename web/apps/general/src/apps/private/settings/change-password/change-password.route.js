(function () {
    'use strict';

    var dependencies = [
        'private.views.changePassword',
        'private.routes.settings'
    ];

    angular
        .module('private.routes.changePassword', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'settings.changePassword',
                config: {
                    url: '/change-password',
                    controller: 'ChangePasswordViewController',
                    controllerAs: 'ChangePasswordViewCtrl',
                    templateUrl: 'templates/change-password.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
