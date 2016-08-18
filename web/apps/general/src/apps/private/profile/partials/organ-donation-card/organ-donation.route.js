(function () {
    'use strict';

    var dependencies = [
        'private.views.organDonation',
        'private.routes.profile'
    ];

    angular
        .module('private.routes.organDonation', dependencies)
        .run(configureRoute);

    /** @ngInject */
    function configureRoute(NxtRouterHelper) {
        var states = [
            {
                state: 'profile.organDonation',
                config: {
                    url: '/organ-donation',
                    controller: 'OrganDonationViewController',
                    controllerAs: 'OrganDonationViewCtrl',
                    templateUrl: 'templates/organ-donation.view.html'
                }
            }
        ];

        NxtRouterHelper.configureStates(states);
    }
})();
