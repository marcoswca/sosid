(function() {
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
        var states = [{
            state: 'profile.organCard',
            config: {
                url: '/organ-card',
                template: '<default-profile-view-list></default-profile-view-list>',
                data: {
                    hiddenAddButton: true,
                    pageTitle: 'PRIVATE.PROFILE.ORGAN DONOR CARD.PAGE_TITLE',
                    rolePlans: ['premium'],
                    itemTemplate: 'organ-card-item.html',
                    modelName: 'OrganCard'
                }
            }
        }];

        NxtRouterHelper.configureStates(states);
    }
})();
