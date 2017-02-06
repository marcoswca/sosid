(function() {
    'use strict';

    var dependencies = [
        'core.api.ApiService'
    ];

    angular
        .module('api.Privacy', dependencies)
        .service('PrivacyApi', PrivacyApi);

    /** @ngInject */
    function PrivacyApi(APP_CONFIG, ApiService) {

        var url = APP_CONFIG.URL.API_URL;

        this.get = function(params, options) {
            options = options || {};
            options.url = url + '/user-category-privacy';
            options.params = params || {};

            return ApiService.Get(options);
        };

        this.update = function(id, data, options) {
            options = options || {};
            options.url = url + '/user-category-privacy/' + id;
            options.data = data;
            return ApiService.Put(options);
        };
    }

})();
