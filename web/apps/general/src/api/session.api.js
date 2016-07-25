(function() {
    'use strict';

    var dependencies = [
        'core.api.ApiService'
    ];

    angular
        .module('api.session', dependencies)
        .service('SessionApi', SessionApi);

    /** @ngInject */
    function SessionApi(APP_CONFIG, ApiService, $q, $cookieStore) {

        var url = APP_CONFIG.URL.API_URL + '/session';

        this.get = function(options) {
            options = options || {};
            options.url = url + '/';
            return ApiService.Get(options);

        };

        this.login = function(credentials, options) {
            options = options || {};
            options.url = url + '/';
            options.data = credentials;
            return ApiService.Post(options);


        };

        this.destroy = function(options){
            options = options || {};
            options.url = url + '/';
            return ApiService.Delete(options);
        };
    }

})();