(function () {
    'use strict';

    var dependencies = [
        'private.views.personalData',
        'private.routes.profile'
    ];

    angular
        .module('private.routes.personalData', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.personalData',
                config: {
                    url: '/',
                    controller: 'PersonalDataViewController',
                    controllerAs: 'PersonalDataViewCtrl',
                    templateUrl: 'templates/personal-data.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
