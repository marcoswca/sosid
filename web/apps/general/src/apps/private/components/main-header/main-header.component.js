(function () {
    'use strict';

    var dependencies = [
        'private.views.privacy',
        'printCard.views.privacy'
    ];

    angular
        .module('private.components.mainHeader', dependencies)
        .directive('mainHeader', MainHeader);

    /** @ngInject */
    function MainHeader() {

        return {
            bindToController: {
                pipeline: '='
            },
            controller: MainHeaderCtrl,
            controllerAs: 'MainHeaderCtrl',
            templateUrl: 'templates/main-header.component.html'
        };

        function MainHeaderCtrl(Session, $mdDialog) {
            var self = this;
            var originatorEv;

            // public variables

            // public methods
            self.openMenu = function($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };

            self.logout = Session.destroy;
            self.showPrivacySettings = showPrivacySettings;
            self.showPrintCard = showPrintCard;

            return init();

            function init() {}

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

        }
    }
})();
