(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.settings', dependencies)
        .controller('SettingsViewController', SettingsViewController);

    /** @ngInject */
    function SettingsViewController(Session, APP_CONFIG, $window, $state, $scope) {
        // Private variables
        var self = this;
        self.url_cp = false;
        self.url_ph = false;
        self.url_up = false;

        $scope.$on('$viewContentLoaded', function(event, args) {
            self.url_cp = ($state.current.name == 'settings.changePassword');
            self.url_ph = ($state.current.name == 'settings.paymentHistory');
            self.url_up = ($state.current.name == 'settings.subscriptionUpgrade');
        });

        // Public variables
        self.Session = Session;

        // Public methods

        // Private methods
        return (function init() {

        })();
    }
})();
