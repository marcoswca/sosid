(function(){
    'use strict';

    var dependencies = [
        'public.views.createAccount'
    ];

    angular
        .module('public.routes.createAccount', dependencies)
        .run(appRun);

    /** @ngInject */
    function appRun(NxtRouterHelper) {

        var states = [
            {
                state: 'createAccount',
                config: {
                    parent: 'public',
                    url: '/account/create',
                    controller: 'CreateAccountController',
                    controllerAs: 'CreateAccountCtrl',
                    templateUrl: 'templates/create-account.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);

    }

})();