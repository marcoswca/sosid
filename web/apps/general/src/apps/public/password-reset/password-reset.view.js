(function() {
    'use strict';

    var dependencies = [
        //components
    ];

    angular
        .module('public.views.passwordReset', dependencies)
        .controller('PasswordResetController', PasswordResetController);

    /** @ngInject */
    function PasswordResetController(UserApi, UserTokenApi, $stateParams, $state) {
        var self = this;

        self.submit = submit;
        self.isLoading = false;
        self.registrationFinished = false;
        self.data = {
            token: $stateParams.token,
            password: undefined
        };

        self.confirmPassword = {
            label: 'PUBLIC.ATTRIBUTES.CONFIRM_PASSWORD.LABEL',
            placeholder: 'PUBLIC.ATTRIBUTES.CONFIRM_PASSWORD.PLACEHOLDER',
            validate: {
                required: {
                    message: 'PUBLIC.ATTRIBUTES.CONFIRM_PASSWORD.VALIDATION.REQUIRED'
                }
            }
        };

        self.matchPasswordError = {
            match: {
                message: 'PUBLIC.ATTRIBUTES.CONFIRM_PASSWORD.VALIDATION.MATCH'
            }
        };

        UserTokenApi
            .exists($stateParams.token)
            .catch(function() {
                $state.go('login');
            });

        function submit() {

            self.isLoading = true;

            UserApi
                .passwordChange(self.data)
                .then(function() {
                    self.registrationFinished = true;
                })
                .finally(function() {
                    self.isLoading = false;
                });
        }
    }

})();