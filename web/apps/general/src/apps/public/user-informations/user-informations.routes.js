(function(){
    'use strict';

    var dependencies = [
        'public.views.userInformations'
    ];

    angular
        .module('public.routes.userInformations', dependencies)
        .run(appRun);

    /** @ngInject */
    function appRun(NxtRouterHelper) {

        var states = [
            {
                state: 'userInformations',
                config: {
                    parent: 'public',
                    url: '/user/informations',
                    controller: 'UserInformationsController',
                    controllerAs: 'UserInfoCtrl',
                    templateUrl: 'templates/user-informations.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);

    }

})();
