(function() {
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
    function ProfileViewController($rootScope, $mdDialog, Session, $state, $timeout) {
        // Private variables
        var __loadingDebouce,
            self = this;

        self.contentHeader = {
            button: {
                show: angular.noop,
                name: '',
                fn: angular.noop
            }
        };
        self.isLoading = false;


        self.pageTitle = $state.current.data.pageTitle;
        self.Session = Session;
        self.setLoading = setLoading;
        self.usedStorage = self.Session.user.profile.useDataStorage;
        if (self.Session.user.profile.plan.plans) {
            self.planStorageSpace = self.Session.user.profile.plan.plans.storageSpace;
        }

        self.showPrivacySettings = showPrivacySettings;
        self.showPrintCard = showPrintCard;
        self.showWelcome = showWelcome;
        self.percentUsedStorage = (self.usedStorage / self.planStorageSpace) * 100;

        // Private methods
        return (function init() {
            $rootScope.$on('$stateChangeStart', function() {
                self.contentHeader.button.show = angular.noop;
            });
            $rootScope.$on('$stateChangeSuccess', function() {
                self.pageTitle = $state.current.data.pageTitle;
            });
        })();

        function setLoading(status) {
            if (__loadingDebouce) {
                $timeout.cancel(__loadingDebouce);
            }

            __loadingDebouce = $timeout(angular.noop, 300);

            return __loadingDebouce
                .then(function() {
                    self.isLoading = status;
                });
        }

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
