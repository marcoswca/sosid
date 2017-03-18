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

        self.keys = [];

        self.getKeys = function(object) {
            return Object.keys(object);
        };

        if ($cookies.get("userInformations")) {

            self.userInformations = JSON.parse($cookies.get("userInformations"));
            self.keys = self.getKeys(self.userInformations);


        } else {
            
            self.userInformations = JSON.parse(localStorage.getItem("userInformations"));
            self.keys = self.getKeys(self.userInformations);

        }


    }

})();
