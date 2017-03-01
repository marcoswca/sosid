(function() {
    'use strict';

    var dependencies = [
        'core.api.ApiService', 'ngFileUpload'
    ];

    angular
        .module('api.plan', dependencies)
        .service('PlanApi', PlanApi);

    /** @ngInject */
    function PlanApi(APP_CONFIG, ApiService, Upload) {

        var url = APP_CONFIG.URL.API_URL + '/plan';

        this.getAll = function(params, options) {
            options = options || {};
            options.url = url;
            options.params = params || {};

            return ApiService.Get(options);
        };
    }
})();
