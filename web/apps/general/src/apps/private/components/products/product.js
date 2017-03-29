(function() {
    'use strict';

    var dependencies = [
        'model.product'
    ];

    angular
        .module('private.components.product', dependencies)
        .directive('product', product);

    /** @ngInject */
    function product() {

        return {
            restrict: 'E',
            scope: true,
            controller: ProductCtrl,
            controllerAs: 'ProductCtrl',
            templateUrl: 'templates/product.html'
        };

        function ProductCtrl($scope, Product) {
            // Private variables
            var self = this;

            self.initData = function() {
                Product.getAll().then(function successCallback(data) {
                    self.products = data;
                    console.log(data);
                }, function errorCallback(reason) {
                    console.log(reason);
                    // body...
                });
            };

            self.togglePrivacy = function(product) {
                var object = { active: !product.active };
                Product.update(product.userproductid, object).then(function successCallback(data) {
                    product.active = !product.active;

                }, function errorCallback(reason) {});
            };

            self.getLocaleDate = function(date) {
                return new Date(date).toLocaleString();
            };

            self.initData();
            // Private methods
            return (function init() {})();


        }

    }
})();
