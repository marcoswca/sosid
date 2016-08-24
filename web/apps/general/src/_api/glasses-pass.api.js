(function() {
    'use strict';

    var dependencies = [
        'core.api.ApiService'
    ];

    angular
        .module('api.glassesPass', dependencies)
        .service('GlassesPassApi', GlassesPassApi);

    /** @ngInject */
    function GlassesPassApi(APP_CONFIG, ApiService) {

        var url = APP_CONFIG.URL.API_URL + '/user-glasses-pass';

        this.get = function (params, options) {
            options = options || {};
            options.url = url;

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

        this.remove = function(id, options) {
            options = options || {};
            options.url = url + '/' + id;
            return ApiService.Delete(options);
        };
    }

})();