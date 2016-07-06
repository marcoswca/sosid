(function () {

    'use strict';

    var dependencies = [];

    angular
        .module('app.shared.alert.template.confirmWarning', dependencies)
        .controller('ConfirmWarningAlertController', ConfirmWarningAlertController);

    /** @ngInject */
    function ConfirmWarningAlertController(title, content, $mdDialog) {
        var self = this;

        self.content = content;
        self.title = title;

        self.cancel = function() {
            return $mdDialog.cancel();
        };

        self.remove = function() {
            return $mdDialog.hide();
        };

    }
})();