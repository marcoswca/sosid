(function() {
    'use strict';

    var dependencies = [
        'core.api.ApiService'
    ];

    angular
        .module('api.payment', dependencies)
        .service('PaymentApi', PaymentApi);

    /** @ngInject */
    function PaymentApi(APP_CONFIG, ApiService) {

        var url = APP_CONFIG.URL.API_URL + '/payments/user-logged';

        this.get = function(params, options) {
            options = options || {};
            options.url = url;
            options.params = params || {};

            return ApiService.Get(options);
        };

        this.getInvoice = function(id, options) {
            options = options || {};
            options.url = APP_CONFIG.URL.API_URL + '/payments/invoice/' + id;
            options.params = {};
            options.responseType = "arraybuffer";

            return ApiService.Get(options);
        };

        this.create = function(data, options) {
            options = options || {};
            options.url = url;
            options.data = data;
            return ApiService.Post(options);
        };

        this.update = function(id, data, options) {
            options = options || {};
            options.url = url;
            options.data = data;
            return ApiService.Put(options);
        };
    }

})();
