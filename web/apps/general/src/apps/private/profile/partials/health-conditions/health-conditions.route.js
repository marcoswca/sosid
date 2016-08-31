(function () {
    'use strict';

    var dependencies = [
        'private.routes.profile',
        'private.components.defaultProfileViewList',
        'model.healthCondition'
    ];

    angular
        .module('private.routes.healthConditions', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.healthConditions',
                config: {
                    url: '/health-conditions',
                    template: '<default-profile-view-list></default-profile-view-list>',
                    data: {
                        pageTitle: 'PRIVATE.PROFILE.HEALTH CONDITIONS.PAGE_TITLE',
                        itemTemplate: 'health-conditions-item.html',
                        modelName: 'HealthCondition',
                        addButtonText: 'PRIVATE.PROFILE.HEALTH CONDITIONS.ADD_NEW'
                    }
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
