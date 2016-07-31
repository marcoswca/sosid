(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.subscriptionUpgrade', dependencies)
        .controller('SubscriptionUpgradeViewController', SubscriptionUpgradeViewController);

    /** @ngInject */
    function SubscriptionUpgradeViewController() {
        // Private variables
        var self = this;

        // Public variables
        self.viewName = 'Subscription Upgrade';
        // Public methods

        // Private methods
        return (function init() {
        })();
    }
})();
