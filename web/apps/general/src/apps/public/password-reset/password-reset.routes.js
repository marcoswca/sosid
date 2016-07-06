(function(){
    'use strict';

    var dependencies = [
        'public.views.passwordReset'
    ];

    angular
        .module('public.routes.passwordReset', dependencies)
        .run(appRun);

    /** @ngInject */
    function appRun(NxtRouterHelper) {

        var states = [
            {
                state: 'passwordReset',
                config: {
                    parent: 'public',
                    url: '/users/password/reset/:token',
                    controller: 'PasswordResetController',
                    controllerAs: 'PasswordResetCtrl',
                    templateUrl: 'templates/password-reset.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);

    }

})();