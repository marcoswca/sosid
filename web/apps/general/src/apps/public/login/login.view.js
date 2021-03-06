(function() {
    'use strict';

    var dependencies = [
        //components
    ];

    angular
        .module('public.views.login', dependencies)
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(SessionApi, APP_CONFIG, $window) {
        var self = this;

        // Public variables

        self.credentials = {};
        self.isLoading = false;
        self.err = false;

        // Public methods
        self.submit = submit;

        // Private methods
        function submit() {

            self.isLoading = true;
            self.sendEmail = false;
            self.err = false;

            SessionApi
                .login(self.credentials)
                .then(function(result) {
                    $window.location = APP_CONFIG.URL.APP_URL;
                })
                .catch(function(e) {
                    console.log(e);
                    if (e.data && e.data.code === 2) {
                        self.sendEmail = true;
                    } else  {
                        self.err = true;
                        self.message = e.data.message;
                    }

                })
                .finally(function() {
                    self.isLoading = false;
                });
        }
    }

})();