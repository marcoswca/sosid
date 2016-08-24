(function(){
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.allergy'
    ];

    angular
        .module('model.allergy', dependencies)
        .factory('Allergy', AllergieModel);

    /** @ngInject */
    function AllergieModel(BaseModel, $q, AllergyApi) {
        return BaseModel.make({
            api: AllergyApi,
            attributes: getAttributes(),
            classMethods: {}
        });

        function getAttributes() {
            return {
                allergy: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                severity: {
                    label: true
                }
            };
        }
    }

})();