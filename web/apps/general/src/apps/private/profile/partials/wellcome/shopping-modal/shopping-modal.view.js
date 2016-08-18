(function () {

    'use strict';

    var dependencies = [];

    angular
        .module('shoppingModal.views.privacy', dependencies)
        .controller('ShoppingModal', ShoppingModal);

    /** @ngInject */
    function ShoppingModal() {

        var self = this;

        console.log(self);

        //self.tab = 1;

        self.setTab = function(newTab){
            self.tab = newTab;
        };

        self.isSet = function(tabNum){
            return self.tab === tabNum;
        };

    }

})();