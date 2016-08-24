(function () {
    'use strict';

    var dependencies = [
        'model.medication',
        'private.components.defaultProfileViewList',
        'private.routes.profile'
    ];

    angular
        .module('private.routes.medications', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.medications',
                config: {
                    url: '/medications',
                    template: '<default-profile-view-list></default-profile-view-list>',
                    data: {
                        pageTitle: 'PRIVATE.PROFILE.MEDICATIONS.PAGE_TITLE',
                        itemTemplate: 'medication-item.html',
                        modelName: 'Medication',
                        addButtonText: 'PRIVATE.PROFILE.MEDICATIONS.ADD_NEW'
                    }
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
