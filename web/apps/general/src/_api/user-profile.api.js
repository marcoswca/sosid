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
            options.data = data;
            return ApiService.Put(options);
        };
    }
})();
