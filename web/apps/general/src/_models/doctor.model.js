(function() {
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
                    phoneNumber: true,
                    label: true
                },
                phoneNumber: {
                    phoneNumber: true,
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
                street: {
                    label: true
                },
                city: {
                    label: true
                },
                provincy: {
                    label: true
                },
                country: {
                    label: true
                },
                postalCode: {
                    label: true
                },
                type: {
                    label: true
                },
                number: {
                    label: true
                },
                complement: {
                    label: true
                },
                isFamilyDoctor: {
                    label: true
                }
            };
        }
    }

})();
