(function() {
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.healthInsurance'
    ];

    angular
        .module('model.healthInsurance', dependencies)
        .factory('HealthInsurance', HealthInsuranceModel);

    /** @ngInject */
    function HealthInsuranceModel(BaseModel, $q, HealthInsuranceApi) {
        return BaseModel.make({
            api: HealthInsuranceApi,
            attributes: getAttributes(),
            classMethods: {}
        });

        function getAttributes() {
            return {
                companyName: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                policyNumber: {
                    label: true,
                    phoneNumber: true

                },
                phoneInsurance: {
                    label: true,
                    phoneNumber: true

                },
                medicalPlanType: {
                    label: true
                },
                file: {
                    label: true
                }
            };
        }
    }

})();
