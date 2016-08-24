(function(){
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.livingWill'
    ];

    angular
        .module('model.livingWill', dependencies)
        .factory('LivingWill', LivingWillModel);

    /** @ngInject */
    function LivingWillModel(BaseModel, $q, LivingWillApi) {
        return BaseModel.make({
            api: LivingWillApi,
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