(function () {
    'use strict';

    var dependencies = [
        'private.views.livingWill',
        'private.routes.profile'
    ];

    angular
        .module('private.routes.livingWill', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.livingWill',
                config: {
                    url: '/living-will',
                    controller: 'LivingWillViewController',
                    controllerAs: 'LivingWillViewCtrl',
                    templateUrl: 'templates/living-will.view.html',
                    data: {
                        pageTitle: 'PRIVATE.PROFILE.ORGAN DONATION CARD.PAGE_TITLE'
                    }
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
