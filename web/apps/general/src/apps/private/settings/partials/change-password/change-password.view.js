(function () {
    'use strict';

    var dependencies = ['api.user'];

    angular
        .module('private.views.changePassword', dependencies)
        .controller('ChangePasswordViewController', ChangePasswordViewController);

    /** @ngInject */
    function ChangePasswordViewController(UserApi) {
        // Private variables
        var self = this;

        // Public variables
        self.viewName = 'Change Password';
        // Public methods

        self.passwordChange = function(object){
            UserApi.passwordChange(object).then(function successCallback(data){
            }, function errorCallback(reason){
                console.log(reason);
            });
        };

        // Private methods
        return (function init() {
        })();
    }
})();
