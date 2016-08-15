(function() {
    'use strict';

    var dependencies = [
        'core.api.ApiService'
    ];

    angular
        .module('api.user', dependencies)
        .service('UserApi', UserApi);

    /** @ngInject */
    function UserApi(APP_CONFIG, ApiService) {

        var url = APP_CONFIG.URL.API_URL + '/user';

        this.get = function(options) {
            options = options || {};
            options.url = url;
            return ApiService.Get(options);
        };

        this.login = function(credentials, options) {
            options = options || {};
            options.url = url + '/login';
            options.data = {
                email: credentials.email,
                password: credentials.password
            };

            return ApiService.Post(options);
        };

        this.emailExists = function(email, options) {
            options = options || {};
            options.url = url + '/email-exists/' + email;
            return ApiService.Get(options);
        };

        this.create = function(data, options) {
            options = options || {};
            options.url = url;
            options.data = data;
            return ApiService.Post(options);
        };

        this.passwordChange = function(data, options) {
            options = options || {};
            options.url = url + '/change-password/' + data.token;
            options.data = data;
            return ApiService.Put(options);
        };
    }

})();