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
            //options = options || {};
            //options.url = url + '/';
            //return ApiService.Get(options);

            // simulando autenticado
            if ($cookieStore.get('session')) {
                return $q.resolve($cookieStore.get('session'));
            } else {
                return $q.reject({
                    status: 404
                });
            }
        };

        this.login = function(credentials, options) {
            options = options || {};
            options.url = url + '/';
            options.data = credentials;
            //return ApiService.Post(options);

            $cookieStore.put('session', {
                user: {
                    id: 1,
                    firstName: 'Paulo',
                    lastName: 'Cavalcante',
                    email: 'pauloregis@gmail.com'
                }
            });

            return $q.resolve($cookieStore.get('session'));
        };

        this.destroy = function(options){
            options = options || {};
            options.url = url + '/';
            //return ApiService.Delete(options);

            $cookieStore.remove('session');

            return $q.resolve();
        };
    }

})();