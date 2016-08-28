(function () {
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
        var ALLERGY_TYPES = {
            DRUG: 'Drug',
            FOOD: 'Food',
            INSECT: 'Insect',
            OTHER: 'Other'
        };

        return BaseModel.make({
            api: AllergyApi,
            attributes: getAttributes(),
            classMethods: {
                getTypes: function() {
                    return ALLERGY_TYPES;
                }
            }
        });

        function getAttributes() {
            return {
                name: {
                    label: true
                },
                description: {
                    label: true,
                    validate: {
                        required: true
                    }
                },
                severity: {
                    label: true
                },
                allergyType: {
                    validate: {
                        required: true
                    }
                }
            };
        }
    }

})();