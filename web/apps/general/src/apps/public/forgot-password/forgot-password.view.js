(function() {
    'use strict';

    var dependencies = [
        'api.userToken'
    ];

    angular
        .module('public.views.forgotPassword', dependencies)
        .controller('ForgotPasswordController', ForgotPasswordController);

    /** @ngInject */
    function ForgotPasswordController(UserTokenApi) {
        var self = this;

        self.submit = submit;
        self.isLoading = false;
        self.registrationFinished = false;

        function submit() {

            self.isLoading = true;

            UserTokenApi
                .forgotPassword(self.email)
                .finally(function() {
                    self.registrationFinished = true;
                    self.isLoading = false;
                });
        }
    }

})();