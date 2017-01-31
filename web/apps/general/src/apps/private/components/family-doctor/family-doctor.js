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
            self.disabledFields = true;

            DoctorApi.getFamilyDoctors().then(function successCallback(data) {
                self.user.familyDoctors = data.rows;
            }, function errorCallback(reason) {

            });

            self.enableFields = function() {
                self.disabledFields = false;
            };

            self.save = function(fmDoctor) {
                var copy = angular.copy(fmDoctor);
                delete copy.id;
                DoctorApi.update(fmDoctor.id, copy).then(function successCallback(data) {
                    self.disabledFields = true;
                    // var keys = Object.keys(doctor);
                    // keys.forEach(function(key, index) {
                    //     fmDoctor[key] = doctor[key];
                    //     doctor[key] = undefined;
                    // });
                    console.log(data);
                }, function errorCallback(reason) {
                    console.log(reason);
                });
            };

            return (function init() {})();

        }

    }
})();
