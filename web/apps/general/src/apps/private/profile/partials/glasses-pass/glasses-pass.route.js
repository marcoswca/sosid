(function() {
    'use strict';

    var dependencies = [
        'private.routes.profile',
        'model.glassesPass'
    ];

    angular
        .module('private.routes.glassesPass', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [{
            state: 'profile.glassesPass',
            config: {
                url: '/glasses-pass',
                template: '<default-profile-view-list></default-profile-view-list>',
                data: {
                    hiddenAddButton: true,
                    pageTitle: 'PRIVATE.PROFILE.GLASSES PASS.PAGE_TITLE',
                    rolePlans: ['premium'],
                    itemTemplate: 'glasses-pass-item.html',
                    modelName: 'GlassesPass'
                }
            }
        }];

        NxtRouterHelper.configureStates(states);
    }
})();
