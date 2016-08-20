(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.settings', dependencies)
        .controller('SettingsViewController', SettingsViewController);

    /** @ngInject */
    function SettingsViewController(Session) {
        // Private variables
        var self = this;

        // Public variables
        self.Session = Session;

        // Public methods

        // Private methods
        return (function init() {

        })();
    }
})();
