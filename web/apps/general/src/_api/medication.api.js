(function() {
    'use strict';

    var dependencies = [
        'core.api.ApiService', 'ngFileUpload'
    ];

    angular
        .module('api.medication', dependencies)
        .service('MedicationApi', MedicationApi);

    /** @ngInject */
    function MedicationApi(APP_CONFIG, ApiService, Upload) {

        var url = APP_CONFIG.URL.API_URL + '/user-medication';

        this.getAll = function(params, options) {
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
