(function() {
    'use strict';

    var dependencies = [
        'core.api.ApiService'
    ];

    angular
        .module('api.medication', dependencies)
        .service('MedicationApi', MedicationApi);

    /** @ngInject */
    function MedicationApi(APP_CONFIG, ApiService) {

        var url = APP_CONFIG.URL.API_URL + '/medication';

        this.getAll = function (params, options) {
            options = options || {};
            options.url = url + '/';
            options.params = params || {};

            return ApiService.Get(options);
        };

        this.create = function(data, options) {
            options = options || {};
            options.url = url;
            options.data = data;
            return ApiService.Post(options);
        };

        this.update = function(data, options) {
            options = options || {};
            options.url = url;
            options.data = data;
            return ApiService.Put(options);
        };
    }

})();