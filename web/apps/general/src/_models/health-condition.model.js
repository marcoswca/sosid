(function(){
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.healthCondition'
    ];

    angular
        .module('model.healthCondition', dependencies)
        .factory('HealthCondition', HealthConditionModel);

    /** @ngInject */
    function HealthConditionModel(BaseModel, $q, HealthConditionApi) {
        return BaseModel.make({
            api: HealthConditionApi,
            attributes: getAttributes(),
            classMethods: {},
            instanceMethods: {
                create: function () {
                    return HealthConditionApi.create(this);
                },
                update: function () {
                    return HealthConditionApi.update(this);
                }
            }
        });

        function getAttributes() {
            return {
                condition: {
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