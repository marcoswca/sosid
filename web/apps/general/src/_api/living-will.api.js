(function() {
    'use strict';

    var dependencies = [
        'core.api.ApiService'
    ];

    angular
        .module('api.livingWill', dependencies)
        .service('LivingWillApi', LivingWillApi);

    /** @ngInject */
    function LivingWillApi(APP_CONFIG, ApiService) {

        var url = APP_CONFIG.URL.API_URL + '/user-living-will';

        this.getAll = function (params, options) {
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
            options.url = url + '/' + id;
            options.data = data;
            return ApiService.Put(options);
        };
    }

})();