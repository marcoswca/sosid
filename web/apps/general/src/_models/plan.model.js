(function() {
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.plan'
    ];

    angular
        .module('model.plan', dependencies)
        .factory('Plan', Plan);

    /** @ngInject */
    function Plan(BaseModel, $q, PlanApi) {
        return BaseModel.make({
            api: PlanApi,
            attributes: getAttributes(),
            classMethods: {}
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
                price: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                storageSpace: {
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
