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
                    values: ['teste', 'teste2'],
                    label: true
                },
                mobileNumber: {
                    label: true
                },
                phoneNumber: {
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