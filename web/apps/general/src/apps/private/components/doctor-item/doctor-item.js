(function () {
    'use strict';

    var dependencies = [
        'private.components.contentItemBox'
    ];

    angular
        .module('private.components.doctorItem', dependencies)
        .directive('doctorItem', doctorBoxDirective);

    /** @ngInject */
    function doctorBoxDirective() {
        return {
            bindToController: {
                doctor: '=',
                onCreateCancel: '=',
                onCreateSuccess: '='
            },
            restrict: 'E',
            controller: DoctorItemCtrl,
            controllerAs: 'DoctorItemCtrl',
            templateUrl: 'templates/doctor-item.html'
        };

        /** @ngInject */
        function DoctorItemCtrl($scope, Doctor, $timeout) {
            // Private variables
            var self = this;

            // Public variables
            self.isCreate = false;
            self.disableFields = true;

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
                console.log($scope);
                $scope.$parent.ContentItemBoxCtrl.setLoading(status);
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
