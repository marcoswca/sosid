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
        self.isLoading = false;
        self.registrationFinished = false;

        // Private methods
        function submit() {

            self.isLoading = true;

            User
                .create(self.user)
                .then(function() {
                    self.registrationFinished = true;
                })
                .finally(function() {
                    self.isLoading = false;
                });
        }
    }

})();