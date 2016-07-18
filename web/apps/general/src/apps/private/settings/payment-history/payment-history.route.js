(function () {
    'use strict';

    var dependencies = [
        'private.views.paymentHistory',
        'private.routes.settings'
    ];

    angular
        .module('private.routes.paymentHistory', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'settings.paymentHistory',
                config: {
                    url: '/payment-history',
                    controller: 'PaymentHistoryViewController',
                    controllerAs: 'PaymentHistoryViewCtrl',
                    templateUrl: 'templates/payment-history.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
