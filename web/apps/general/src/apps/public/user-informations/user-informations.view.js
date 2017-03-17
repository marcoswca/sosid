(function() {
    'use strict';

    var dependencies = [
        //components
    ];

    angular
        .module('public.views.userInformations', dependencies)
        .controller('UserInformationsController', UserInformationsController);

    /** @ngInject */
    function UserInformationsController($cookies) {
        var self = this;

        self.userInformations = JSON.parse($cookies.get("userInformations"));

    }

})();
