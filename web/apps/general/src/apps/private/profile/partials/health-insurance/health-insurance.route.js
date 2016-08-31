(function () {
    'use strict';

    var dependencies = [
        'private.routes.profile',
        'private.components.defaultProfileViewList',
        'model.healthCondition'
    ];

    angular
        .module('private.routes.healthInsurance', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.healthInsurance',
                config: {
                    url: '/health-insurance',
                    data: {
                        pageTitle: 'PRIVATE.PROFILE.HEALTH INSURANCES.PAGE_TITLE',
                        itemTemplate: 'health-conditions-item.html',
                        modelName: 'HealthInsurance',
                        addButtonText: 'PRIVATE.PROFILE.HEALTH INSURANCES.ADD_NEW'
                    }
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
