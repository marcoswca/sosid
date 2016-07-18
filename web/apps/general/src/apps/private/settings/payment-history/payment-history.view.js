(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.paymentHistory', dependencies)
        .controller('PaymentHistoryViewController', PaymentHistoryViewController);

    /** @ngInject */
    function PaymentHistoryViewController() {
        // Private variables
        var self = this;

        // Public variables
        self.viewName = 'Payment History';
        // Public methods

        // Private methods
        return (function init() {
        })();
    }
})();
