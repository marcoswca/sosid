(function() {
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.emergencyContact'
    ];

    angular
        .module('model.EmergencyContact', dependencies)
        .factory('EmergencyContact', EmergencyContactModel);

    /** @ngInject */
    function EmergencyContactModel(BaseModel, $q, EmergencyContactApi) {
        return BaseModel.make({
            api: EmergencyContactApi,
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
                relationship: {
                    label: true
                    ,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                mobileNumber: {
                    label: true,
                    phoneNumber: true
                  
                },
                phoneNumber: {
                    label: true,
                    phoneNumber: true
                  
                },
                email: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        },
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
                file: {
                    label: true
                },
                number: {
                    label: true
                },
                complement: {
                    label: true
                },
            };
        }
    }

})();
