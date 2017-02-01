(function() {
    'use strict';

    var dependencies = [
        'private.routes.profile',
        'private.components.defaultProfileViewList',
        'model.healthInsurance'
    ];

    angular
        .module('private.routes.healthInsurance', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [{
            state: 'profile.healthInsurance',
            config: {
                url: '/health-insurance',
                template: '<default-profile-view-list></default-profile-view-list>',
                data: {
                    pageTitle: 'PRIVATE.PROFILE.HEALTH INSURANCES.PAGE_TITLE',
                    itemTemplate: 'health-insurance-item.html',
                    modelName: 'HealthInsurance',
                    addButtonText: 'PRIVATE.PROFILE.HEALTH INSURANCES.ADD_NEW',
                    rolePlans: ['premium']

                }
            }
        }];

        NxtRouterHelper.configureStates(states);
    }
})();
