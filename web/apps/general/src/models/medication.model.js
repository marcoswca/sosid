(function(){
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.medication'
    ];

    angular
        .module('model.medication', dependencies)
        .factory('Medication', MedicationModel);

    /** @ngInject */
    function MedicationModel(BaseModel, $q, MedicationApi) {
        return BaseModel.make({
            api: MedicationApi,
            attributes: getAttributes(),
            classMethods: {},
            instanceMethods: {
                create: function () {
                    return MedicationApi.create(this);
                },
                update: function () {
                    return MedicationApi.update(this);
                }
            }
        });

        function getAttributes() {
            return {
                name: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                dosage: {
                    label: true
                },
                unit: {
                    label: true
                },
                frequency: {
                    label: true
                },
                reasonForTaking: {
                    label: true
                },
                notes: {
                    label: true
                }
            };
        }
    }

})();