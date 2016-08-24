(function () {
    'use strict';

    var dependencies = [
        'private.routes.profile'
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
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
