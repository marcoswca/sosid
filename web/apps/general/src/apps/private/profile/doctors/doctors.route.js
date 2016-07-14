(function () {
    'use strict';

    var dependencies = [
        'private.views.doctors',
        'private.routes.profile'
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
                    controller: 'DoctorsViewController',
                    controllerAs: 'DoctorsViewCtrl',
                    templateUrl: 'templates/doctors.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
