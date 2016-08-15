(function() {
    'use strict';

    var dependencies = [
        'core.api.ApiService',
        'api.user'
    ];

    angular
        .module('api.session', dependencies)
        .service('SessionApi', SessionApi);

    /** @ngInject */
    function SessionApi(APP_CONFIG, ApiService, $q, UserApi, $cookies) {

        var url = APP_CONFIG.URL.API_URL + '/session';

        this.get = UserApi.get;

        this.login = function(credentials) {
         return UserApi
             .login(credentials)
             .then(function(result) {
                 $cookies.put('sessionToken', result.token);
             });
        };

        this.destroy = function() {
            return $q
                .resolve()
                .then(function() {
                    $cookies.remove('sessionToken');
                });
        };
    }

})();