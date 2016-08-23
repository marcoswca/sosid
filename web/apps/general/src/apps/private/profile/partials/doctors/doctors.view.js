(function () {
    'use strict';

    var dependencies = [
        'model.doctor',
        'private.components.doctorItem'
    ];

    angular
        .module('private.views.doctors', dependencies)
        .controller('DoctorsViewController', DoctorsViewController);

    /** @ngInject */
    function DoctorsViewController($scope, DoctorApi, Doctor) {
        // Private variables
        var self = this;

        // Public variables
        self.allowCreate = false;
        self.doctors = [];

        // Public methods
        self.enableCreate = enableCreate;
        self.cancelCreate = cancelCreate;
        self.createDoctor = createDoctor;
        self.createSuccess = createSuccess;

        // Private methods
        return (function init() {
            getDoctors();
            $scope.ProfileViewCtrl.contentHeader = {
                button: {
                    show: function() {
                        return !self.allowCreate;
                    },
                    name: 'PRIVATE.PROFILE.DOCTORS.ADD_NEW',
                    fn: enableCreate
                }
            };
        })();

        function getDoctors() {
            $scope.ProfileViewCtrl.setLoading(true);
            return Doctor
                .getAll()
                .then(function(result) {
                    self.doctors = result.rows;
                })
                .finally(function() {
                    $scope.ProfileViewCtrl.setLoading(false);
                });
        }

        function enableCreate() {
            self.allowCreate = true;
            self.doctors.unshift({});
        }

        function createDoctor() {
            return self.newDoctor
                .create()
                .then(function () {
                    self.allowCreate = false;
                });
        }

        function createSuccess() {
            self.allowCreate = false;
        }

        function cancelCreate() {
            self.allowCreate = false;
            self.doctors.shift();
        }
    }
})();
