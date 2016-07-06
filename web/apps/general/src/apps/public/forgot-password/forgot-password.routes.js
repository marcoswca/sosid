(function(){
    'use strict';

    var dependencies = [
        'public.views.forgotPassword'
    ];

    angular
        .module('public.routes.forgotPassword', dependencies)
        .run(appRun);

    /** @ngInject */
    function appRun(NxtRouterHelper) {

        var states = [
            {
                state: 'forgotPassword',
                config: {
                    parent: 'public',
                    url: '/users/password/new',
                    controller: 'ForgotPasswordController',
                    controllerAs: 'ForgotPasswordCtrl',
                    templateUrl: 'templates/forgot-password.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);

    }

})();