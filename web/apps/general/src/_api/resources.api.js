(function() {
    'use strict';

    var dependencies = [
        'core.api.ApiService'
    ];

    angular
        .module('api.userResources', dependencies)
        .service('UserResourceApi', UserResourceApi);

    /** @ngInject */
    function UserResourceApi(APP_CONFIG, ApiService) {

        var url = APP_CONFIG.URL.API_URL + '/file';

        this.getAll = function(params, options) {
            options = options || {};
            options.url = url;
            options.params = params || {};
            return ApiService.Get(options);
        };

        this.getFile = function(fileUrl) {
            var options = {};
            options.url = fileUrl;
            options.responseType = "arraybuffer";
            return ApiService.Get(options);
        };

        this.create = function(data, options) {
            options = options || {};
            options.url = url;
            options.data = data;
            return ApiService.Post(options);
        };

        this.remove = function(id, options) {
            options = options || {};
            options.url = url + '/' + id;
            return ApiService.Delete(options);
        };
    }

})();
