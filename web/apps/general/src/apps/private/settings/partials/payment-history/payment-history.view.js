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

        self.getInvoice = function(id) {
            PaymentApi.getInvoice(id).then(function successCallback(data) {
                var file = new Blob([data], {
                    type: 'application/pdf'
                });
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            }, function errorCallback(reason) {
                console.log(reason);
            });
        };

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
