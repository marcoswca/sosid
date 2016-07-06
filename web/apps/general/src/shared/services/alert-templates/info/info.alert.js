(function () {

    'use strict';

    var dependencies = [];

    angular
        .module('app.shared.alert.template.info', dependencies)
        .controller('InfoAlertController', InfoAlertController);

    /** @ngInject */
    function InfoAlertController(title, content, confirmText, $mdDialog) {

        var self = this;

        self.content = content;
        self.title = title;
        self.confirmText = confirmText;

        self.cancel = function() {
            return $mdDialog.cancel();
        };

        self.confirm = function() {
            return $mdDialog.hide();
        };

    }

})();