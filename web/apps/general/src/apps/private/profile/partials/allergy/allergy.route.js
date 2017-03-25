(function() {
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
        var states = [{
            state: 'profile.allergies',
            config: {
                url: '/allergies',
                controller: 'AllergyViewCtrl',
                controllerAs: 'AllergyViewCtrl',
                templateUrl: 'templates/allergy.view.html',
                data: {
                    pageTitle: 'PRIVATE.PROFILE.ALLERGIES.PAGE_TITLE',
                    rolePlans: ['premium']
                }
            }
        }];

        NxtRouterHelper.configureStates(states);
    }
})();
