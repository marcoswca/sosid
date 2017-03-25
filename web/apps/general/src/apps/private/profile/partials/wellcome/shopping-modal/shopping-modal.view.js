(function () {

    'use strict';

    var dependencies = [];

    angular
        .module('shoppingModal.views.privacy', dependencies)
        .controller('ShoppingModal', ShoppingModal);

    /** @ngInject */
    function ShoppingModal() {

        var self = this;

        self.setTab = function(newTab){
            self.tab = newTab;
        };

        self.isSet = function(tabNum){
            return self.tab === tabNum;
        };

    }

})();