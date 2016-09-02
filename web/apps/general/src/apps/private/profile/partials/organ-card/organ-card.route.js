(function () {
    'use strict';

    var dependencies = [
        'private.views.organCard',
        'private.routes.profile'
    ];

    angular
        .module('private.routes.organCard', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.organCard',
                config: {
                    url: '/organ-card',
                    controller: 'OrganCardViewController',
                    controllerAs: 'OrganCardViewCtrl',
                    templateUrl: 'templates/organ-card.view.html',
                    data: {
                        pageTitle: 'PRIVATE.PROFILE.ORGAN DONOR CARD.PAGE_TITLE'
                    }
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
