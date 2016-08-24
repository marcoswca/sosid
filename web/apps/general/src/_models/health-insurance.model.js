(function(){
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
                idInsurance: {
                    label: true
                },
                phone: {
                    label: true
                },
                planType: {
                    label: true
                }

            };
        }
    }

})();