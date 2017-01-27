(function() {
    'use strict';

    var dependencies = ['api.payment'];

    angular
        .module('private.views.paymentHistory', dependencies)
        .controller('PaymentHistoryViewController', PaymentHistoryViewController);

    /** @ngInject */
    function PaymentHistoryViewController(PaymentApi) {
        // Private variables
        var self = this;

        // Public variables
        self.viewName = 'Payment History';
        // Public methods
        self.initData = function() {
            console.log('test');
            PaymentApi.get().then(function successCallback(data) {
                console.log(data);
                self.payments = data;
            }, function errorCallback(reason) {

            });
        };

        // Private methods
        return (function init() {})();
    }
})();
