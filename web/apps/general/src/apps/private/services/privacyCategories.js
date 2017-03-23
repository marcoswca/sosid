(function() {

    'use strict';

    var dependencies = [];

    angular
        .module('private.service', dependencies)
        .service('PrivacyCategoriesService', PrivacyCategoriesService);

    /** @ngInject */
    function PrivacyCategoriesService($cookies, jwtHelper) {

        var self = this;
        var decoded = jwtHelper.decodeToken($cookies.get("sessionToken"));
        self.outside = decoded.scope.indexOf('outside') > -1;

        self.categoryIsFree = function(category) {
            if (!self.outside) {
                return true;
            } else {
                return Object.keys(JSON.parse($cookies.get("userInformations"))).indexOf(category) > -1;
            }
        };

        self.isOutSide = function() {
            return self.outside;
        };

    }

})();
