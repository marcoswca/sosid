(function () {
    'use strict';

    var dependencies = [
        'private.views.subscriptionUpgrade',
        'private.routes.settings'
    ];

    angular
        .module('private.routes.subscriptionUpgrade', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'settings.subscriptionUpgrade',
                config: {
                    url: '/upgrade-plan',
                    controller: 'SubscriptionUpgradeViewController',
                    controllerAs: 'SubscriptionUpgradeViewCtrl',
                    templateUrl: 'templates/subscription-upgrade.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
