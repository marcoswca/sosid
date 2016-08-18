(function () {
    'use strict';

    var dependencies = [
        'private.components.progressCircle',
        'private.components.toggleMenuMobile',
        'private.views.privacy',
        'printCard.views.privacy',
        'welcome.views.privacy'
    ];

    angular
        .module('private.views.profile', dependencies)
        .controller('ProfileViewController', ProfileViewController);

    /** @ngInject */
    function ProfileViewController($mdDialog, Session) {
        // Private variables
        var self = this;

        // Public variables

        // Public methods
        self.Session = Session;
        self.showPrivacySettings = showPrivacySettings;
        self.showPrintCard = showPrintCard;
        self.showWelcome = showWelcome;

        // Private methods
        return (function init() {

        })();

        function showPrivacySettings($event) {
            return $mdDialog.show({
                controller: 'PrivacyController',
                controllerAs: '$PrivacyController',
                templateUrl: 'templates/privacy.view.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true
            });
        }

        function showPrintCard($event) {
            return $mdDialog.show({
                controller: 'PrintCardController',
                controllerAs: '$PrintCardController',
                templateUrl: 'templates/print-card.view.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true
            });
        }

        function showWelcome($event) {
            return $mdDialog.show({
                controller: 'WelcomeController',
                controllerAs: '$WelcomeController',
                templateUrl: 'templates/welcome.view.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true
            });
        }
    }
})();
