(function(){
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.doctor'
    ];

    angular
        .module('model.doctor', dependencies)
        .factory('Doctor', DoctorModel);

    /** @ngInject */
    function DoctorModel(BaseModel, DoctorApi) {
        return BaseModel.make({
            api: DoctorApi,
            attributes: getAttributes(),
            classMethods: {}
        });

        function getAttributes() {
            return {
                firstName: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                lastName: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                speciality: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                mobileNumber: {
                    label: true
                },
                phoneNumber: {
                    label: true
                },
                email: {
                    label: true,
                    validate: {
                        email: {
                            message: true
                        }
                    }
                },
                clinicAddress: {
                    label: true
                }
            };
        }
    }

})();