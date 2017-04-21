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
                },
                street: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                city: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                provincy: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                country: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                postalCode: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                type: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                file: {
                    label: true
                },
                number: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                complement: {
                    label: true
                },
            };
        }
    }
})();
