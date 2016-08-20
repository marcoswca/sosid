(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.components.doctorBox', dependencies)
        .directive('doctorBox', doctorBoxDirective);

    /** @ngInject */
    function doctorBoxDirective() {
        return {
            scope: true,
            bindToController: {
                doctor: '=',
                onCreateCancel: '=',
                onCreateSuccess: '='
            },
            restrict: 'E',
            controller: DoctorBoxCtrl,
            controllerAs: 'DoctorBoxCtrl',
            templateUrl: 'templates/doctor-box.html'
        };

        function DoctorBoxCtrl($scope, Doctor, $timeout) {
            // Private variables
            var __loadingDebouce,
                self = this;

            // Public variables
            self.isCreate = false;
            self.disableFields = true;
            self.isLoading = false;

            // Public methods
            self.save = save;
            self.cancel = cancel;
            self.enableFields = enableFields;

            // Private methods
            self.$onInit = function() {
                self.doctor = new Doctor(self.doctor);
                self.isCreate = !self.doctor.id;

                if (self.isCreate) {
                    enableFields();
                }
            };

            function setLoading(status) {
                if (__loadingDebouce) {
                    $timeout.cancel(__loadingDebouce);
                }

                __loadingDebouce = $timeout(angular.noop, 300);

                return __loadingDebouce
                    .then(function () {
                        self.isLoading = status;
                    });
            }

            function save() {
                setLoading(true);
                return self.doctor
                    .save()
                    .then(function () {
                        self.disableFields = true;

                        if (self.isCreate) {
                            self.onCreateSuccess();
                            self.isCreate = false;
                        }
                    })
                    .finally(function() {
                        setLoading(false);
                    });
            }

            function cancel() {
                if (self.isCreate) {
                    return self.onCreateCancel();
                } else {
                    self.disableFields = true;
                }
            }

            function enableFields() {
                if ($scope.form) {
                    $scope.form.$setUntouched();
                }
                self.disableFields = false;
            }
        }
    }
})();
