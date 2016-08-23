(function () {
    'use strict';

    var dependencies = [
        'model.doctor',
        'private.routes.profile',
        'private.components.defaultProfileViewList'
    ];

    angular
        .module('private.routes.doctors', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.doctors',
                config: {
                    url: '/doctors',
                    template: '<default-profile-view-list></default-profile-view-list>',
                    data: {
                        pageTitle: 'PRIVATE.PROFILE.DOCTORS.PAGE_TITLE',
                        itemTemplate: 'doctor-item.html',
                        modelName: 'Doctor',
                        addButtonText: 'PRIVATE.PROFILE.DOCTORS.ADD_NEW'
                    }
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
