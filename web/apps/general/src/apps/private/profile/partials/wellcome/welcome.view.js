(function () {

    'use strict';

    var dependencies = [
        'shoppingModal.views.privacy'
    ];

    angular
        .module('welcome.views.privacy', dependencies)
        .controller('WelcomeController', WelcomeController);

    /** @ngInject */
    function WelcomeController($mdDialog, Session, $window) {

        // private variables
        var self = this;

        // public variables

        // Public methods
        self.showShoppingModal = showShoppingModal;
        self.startTrial = startTrial;

        // private methods

        function startTrial() {
            return Session
                .user
                .startTrial()
                .then(function() {
                    return $window.location.reload();
                });
        }

        function showShoppingModal($event, tab) {
            return $mdDialog.show({
                controller: 'ShoppingModal',
                controllerAs: '$ShoppingModal',
                templateUrl: 'templates/shopping-modal.view.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true,
                locals: { tab: tab },
                bindToController: true
            });
        }

    }

})();