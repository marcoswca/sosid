(function () {

    'use strict';

    var dependencies = [
        'shoppingModal.views.privacy'
    ];

    angular
        .module('welcome.views.privacy', dependencies)
        .controller('WelcomeController', WelcomeController);

    /** @ngInject */
    function WelcomeController($mdDialog) {

        var self = this;

        self.showShoppingModal = showShoppingModal;

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