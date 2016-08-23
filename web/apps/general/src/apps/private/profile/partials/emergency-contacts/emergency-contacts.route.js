(function () {
    'use strict';

    var dependencies = [
        'model.EmergencyContact',
        'private.components.defaultProfileViewList',
        'private.routes.profile'
    ];

    angular
        .module('private.routes.emergencyContacts', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.emergencyContacts',
                config: {
                    url: '/emergency-contacts',
                    template: '<default-profile-view-list></default-profile-view-list>',
                    data: {
                        pageTitle: 'PRIVATE.PROFILE.EMERGENCY CONTACTS.PAGE_TITLE',
                        itemTemplate: 'emergency-contact-item.html',
                        modelName: 'EmergencyContact',
                        addButtonText: 'PRIVATE.PROFILE.EMERGENCY CONTACTS.ADD_NEW'
                    }
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
