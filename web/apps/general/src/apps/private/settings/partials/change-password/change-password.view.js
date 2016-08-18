(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.changePassword', dependencies)
        .controller('ChangePasswordViewController', ChangePasswordViewController);

    /** @ngInject */
    function ChangePasswordViewController() {
        // Private variables
        var self = this;

        // Public variables
        self.viewName = 'Change Password';
        // Public methods

        // Private methods
        return (function init() {
        })();
    }
})();
