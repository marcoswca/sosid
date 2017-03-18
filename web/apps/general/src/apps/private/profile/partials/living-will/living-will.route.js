(function() {
    'use strict';

    var dependencies = [
        'private.routes.profile',
        'model.livingWill'

    ];

    angular
        .module('private.routes.livingWill', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [{
            state: 'profile.livingWill',
            config: {
                url: '/living-will',
                template: '<default-profile-view-list></default-profile-view-list>',
                data: {
                    pageTitle: 'PRIVATE.PROFILE.LIVING WILL.PAGE_TITLE',
                    rolePlans: ['premium'],
                    itemTemplate: 'living-will-item.html',
                    modelName: 'LivingWill'

                }
            }
        }];

        NxtRouterHelper.configureStates(states);
    }
})();
