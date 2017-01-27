(function() {
    'use strict';

    var dependencies = ['api.payment'];

    angular
        .module('private.views.paymentHistory', dependencies)
        .controller('PaymentHistoryViewController', PaymentHistoryViewController);

    /** @ngInject */
    function PaymentHistoryViewController($scope, PaymentApi) {
        // Private variables
        var self = this;

        // Public variables
        self.viewName = 'Payment History';
        self.isLoading = true;
 

        self.initData = function() {

            PaymentApi.get().then(function successCallback(data) {
                console.log(data);
                self.isLoading = false;
                self.payments = data;
            }, function errorCallback(reason) {
                console.log(reason);
            }).finally(function() {
                self.isLoading = false;
            });
        };

        self.getLocaleDate = function(date) {
            return new Date(date).toLocaleString();
        };

        // Private methods
        return (function init() {})();
    }
})();
