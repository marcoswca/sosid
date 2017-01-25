(function() {
    'use strict';

    var dependencies = [
        'model.doctor'
    ];

    angular
        .module('private.components.familyDoctor', dependencies)
        .directive('familyDoctor', familyDoctor);

    /** @ngInject */
    function familyDoctor() {

        return {
            restrict: 'E',
            scope: true,
            controller: FamilyDoctorCtrl,
            controllerAs: 'FamilyDoctorCtrl',
            templateUrl: 'templates/family-doctor.html'
        };

        function FamilyDoctorCtrl($scope, DoctorApi) {
            // Private variables
            var self = this;
            self.user = {};

            DoctorApi.getFamilyDoctors().then(function successCallback(data) {
                self.user.familyDoctors = data.rows;
            }, function errorCallback(reason) {

            });

            return (function init() {})();

        }

    }
})();
