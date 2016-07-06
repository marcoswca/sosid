(function() {
    'use strict';

    var dependencies = [
        //components
    ];

    angular
        .module('public.views.createAccount', dependencies)
        .controller('CreateAccountController', CreateAccountController);

    /** @ngInject */
    function CreateAccountController(User) {
        var self = this;

        // Public variables
        self.config = {
            submit: submit,
            isCreate: true
        };

        self.user = {};
        self.account = {};
        self.isLoading = false;
        self.registrationFinished = false;

        self.confirmPassword = {
            label: 'PUBLIC.ATTRIBUTES.CONFIRM_PASSWORD.LABEL',
            placeholder: 'PUBLIC.ATTRIBUTES.CONFIRM_PASSWORD.PLACEHOLDER',
            required: {
                message: 'PUBLIC.ATTRIBUTES.CONFIRM_PASSWORD.VALIDATION.REQUIRED'
            }
        };

        self.matchPasswordError = {
            match: {
                message: 'PUBLIC.ATTRIBUTES.CONFIRM_PASSWORD.VALIDATION.MATCH'
            }
        };

        // Private methods
        function submit() {

            self.isLoading = true;

            User
                .create({
                    account: self.account,
                    user: self.user
                })
                .then(function() {
                    self.registrationFinished = true;
                })
                .finally(function() {
                    self.isLoading = false;
                });
        }
    }

})();