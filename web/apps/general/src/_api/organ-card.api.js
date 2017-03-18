(function() {
    'use strict';

    var dependencies = [
        'core.api.ApiService', 'ngFileUpload'
    ];

    angular
        .module('api.organCard', dependencies)
        .service('OrganCardApi', OrganCardApi);

    /** @ngInject */
    function OrganCardApi(APP_CONFIG, ApiService, Upload) {

        var url = APP_CONFIG.URL.API_URL + '/user-organ-donator-card';

        this.getAll = function(params, options) {
            options = options || {};
            options.url = url;
            options.params = params || {};

            return ApiService.Get(options);
        };

        this.create = function(data, options) {
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
    }

})();
