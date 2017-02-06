(function() {
    'use strict';

    var dependencies = [
      'core.api.ApiService', 'ngFileUpload'
    ];

    angular
        .module('api.healthInsurance', dependencies)
        .service('HealthInsuranceApi', HealthInsuranceApi);

    /** @ngInject */
    function HealthInsuranceApi(APP_CONFIG, ApiService, Upload) {

        var url = APP_CONFIG.URL.API_URL + '/user-health-insurances';

        this.getAll = function (params, options) {
            options = options || {};
            options.url = url;
            options.params = params || {};

            return ApiService.Get(options);
        };

        this.create = function(data, options) {
            delete data['$$hashKey'];
            options = options || {};
            options.url = url;
            options.data = data;
            return ApiService.PostMultiformData(options, Upload);
        };

        this.update = function(id, data, options) {
            options = options || {};
            options.url = url + '/' + id;
            options.data = data;
            return ApiService.PutMultiformData(options, Upload);
        };

        this.remove = function(id, options) {
            options = options || {};
            options.url = url + '/' + id;
            return ApiService.Delete(options);
        };
    }

})();
