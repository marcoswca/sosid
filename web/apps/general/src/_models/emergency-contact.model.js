(function(){
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.emergencyContact'
    ];

    angular
        .module('model.emergencyContact', dependencies)
        .factory('EmergencyContact', EmergencyContactModel);

    /** @ngInject */
    function EmergencyContactModel(BaseModel, $q, EmergencyContactApi) {
        return BaseModel.make({
            api: EmergencyContactApi,
            attributes: getAttributes(),
            classMethods: {},
            instanceMethods: {
                create: function () {
                    return EmergencyContactApi.create(this);
                },
                update: function () {
                    return EmergencyContactApi.update(this);
                }
            }
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
                mobilePhone: {
                    label: true
                },
                phone: {
                    label: true
                },
                email: {
                    label: true
                },
                address: {
                    label: true
                }
            };
        }
    }

})();