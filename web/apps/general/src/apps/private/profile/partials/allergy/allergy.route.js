(function () {
    'use strict';

    var dependencies = [
        'private.routes.profile',
        'model.allergy',
        'private.views.allergyView'
    ];

    angular
        .module('private.routes.allergies', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.allergies',
                config: {
                    url: '/allergies',
                    controller: 'AllergyViewCtrl',
                    controllerAs: 'AllergyViewCtrl',
                    templateUrl: 'templates/allergy.view.html',
                    //template: '<default-profile-view-list></default-profile-view-list>',
                    data: {
                        pageTitle: 'PRIVATE.PROFILE.ALLERGIES.PAGE_TITLE'
                        //itemTemplate: 'allergy-item.html',
                        //modelName: 'Allergy',
                        //addButtonText: 'PRIVATE.PROFILE.ALLERGIES.ADD_ALLERGY'
                    }
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
