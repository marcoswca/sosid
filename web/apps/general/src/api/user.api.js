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

        this.all = function (params, options) {
            options = options || {};
            options.url = url + '/all';
            options.params = params || {};

            return ApiService.Get(options);
        };

        this.emailExists = function(email, options) {
            options = options || {};
            options.url = url + '/email/exists';
            options.params = {
                email: email
            };
            return ApiService.Get(options);
        };

        this.invite = function(data, options) {
            options = options || {};
            options.url = url + '/invite';
            options.data = data;
            return ApiService.Post(options);
        };

        this.inviteConfirmation = function(data, options) {
            options = options || {};
            options.url = url + '/invite-confirmation/' + data.token;
            options.data = data;
            return ApiService.Put(options);
        };

        this.passwordChange = function(data, options) {
            options = options || {};
            options.url = url + '/change-password/' + data.token;
            options.data = data;
            return ApiService.Put(options);
        };
    }

})();