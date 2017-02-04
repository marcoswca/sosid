(function() {
    'use strict';

    var dependencies = [
        'core.api.ApiService'
    ];

    angular
        .module('api.userToken', dependencies)
        .service('UserTokenApi', UserTokenApi);

    /** @ngInject */
    function UserTokenApi(APP_CONFIG, ApiService) {

        var url = APP_CONFIG.URL.API_URL + '/user-token';

        this.exists = function(token, options) {
            options = options || {};
            options.url = url + '/' + token;
            return ApiService.Get(options);
        };

        this.forgotPassword = function(email, options) {
            options = options || {};
            options.url = APP_CONFIG.URL.API_URL + '/user/forgot-password';
            options.data = {
                email: email
            };
            return ApiService.Post(options);
        };
    }

})();
