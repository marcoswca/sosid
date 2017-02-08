(function() {
    'use strict';

    var dependencies = [
        'core.api.ApiService'
    ];

    angular
        .module('api.userProfile', dependencies)
        .service('UserProfileApi', UserApi);

    /** @ngInject */
    function UserApi(APP_CONFIG, ApiService) {
        var url = APP_CONFIG.URL.API_URL + '/user-profile';
        this.get = function(options) {
            options = options || {};
            options.url = url;
            return ApiService.Get(options);
        };

        this.update = function(data, options) {
            options = options || {};
            options.url = url;
            console.log(data);
            options.data = data;
            return ApiService.Put(options);
        };

        this.deleteAddress = function(query, options) {
            options = options || {};
            options.url = APP_CONFIG.URL.API_URL + '/user-profile' + '/address' + query;
            console.log(query);
            return ApiService.Delete(options);
        };

    }
})();
