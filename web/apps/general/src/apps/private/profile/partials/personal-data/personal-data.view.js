(function() {
    'use strict';

    var dependencies = [
        'private.components.userBasicInfo', 'private.components.emergencyMessages', 'private.components.familyDoctor', 'private.components.userPlan', 'private.components.userResources', 'private.components.product'
    ];

    angular
        .module('private.views.personalData', dependencies)
        .controller('PersonalDataViewController', PersonalDataViewController);

    /** @ngInject */
    function PersonalDataViewController($mdDialog) {
        // Private variables
        var self = this;

        // Public variables
        self.isPrivate = false;

        self.togglePrivacy = function() {
            self.isPrivate = !self.isPrivate;
            console.log(self.isPrivate);
        };

         if (window.location.href.indexOf('updated=true') >= 0) {
            return $mdDialog.show({
                controller: 'SubscriptionUpgradeViewController',
                controllerAs: 'SubsCtrl',
                templateUrl: 'templates/subscription-upgrade-successful.view.html',
                parent: angular.element(document.body),
                fullscreen: true,
                // targetEvent: $event,
                clickOutsideToClose: true
            });
        }

        self.showPrintCard = function($event) {
            return $mdDialog.show({
                controller: 'PrintCardController',
                controllerAs: '$PrintCardController',
                templateUrl: 'templates/print-card.view.html',
                parent: angular.element(document.body),
                fullscreen: true,
                targetEvent: $event,
                clickOutsideToClose: true
            });
        };
        // Private methods
        return (function init() {})();
    }
})();
