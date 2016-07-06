(function(){
    'use strict';

    var dependencies = [
        'public.views.login'
    ];

    angular
        .module('public.routes.login', dependencies)
        .run(appRun);

    /** @ngInject */
    function appRun(NxtRouterHelper) {

        var states = [
            {
                state: 'login',
                config: {
                    parent: 'public',
                    url: '/login',
                    controller: 'LoginController',
                    controllerAs: 'LoginCtrl',
                    templateUrl: 'templates/login.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);

    }

})();