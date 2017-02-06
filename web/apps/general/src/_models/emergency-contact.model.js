(function(){
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
                    values: ['Single parent','Spouse','Husband','Wife','Parent','Father','Mother','Child','Son','Daughter','Sibling','Brother','Sister','Extended family','Grandparent','Grandfather','Grandmother','Grandson','Granddaughter','Uncle','Aunt','Cousin','Nephew','Niece','Boyfriend','Girlfriend','Friend','know','Working colleague'],
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                mobileNumber: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                phoneNumber: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
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
                address: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                }
            };
        }
    }

})();