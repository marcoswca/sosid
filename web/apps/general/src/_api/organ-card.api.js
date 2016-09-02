(function() {
    'use strict';

    var dependencies = [
        'core.api.ApiService'
    ];

    angular
        .module('api.organCard', dependencies)
        .service('OrganCardApi', OrganCardApi);

    /** @ngInject */
    function OrganCardApi(APP_CONFIG, ApiService) {

        var url = APP_CONFIG.URL.API_URL + '/user-organ-donator-card';

        this.get = function (params, options) {
            options = options || {};
            options.url = url;
            options.params = params || {};

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