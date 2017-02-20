(function() {

    'use strict';

    var dependencies = [];

    angular
        .module('printCard.views.privacy', dependencies)
        .controller('PrintCardController', PrintCardController);

    /** @ngInject */
    function PrintCardController($mdDialog) {

        var self = this;

        self.hide = function() {
            $mdDialog.hide();
        };
    }

})();
