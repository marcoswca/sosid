(function() {
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
                mobileNumber: {
                    label: true,
                    phoneNumber: true
                },
                phoneNumber: {
                    label: true,
                    phoneNumber: true
                },
                email: {
                    label: true,
                    validate: {
                        email: {
                            message: true
                        }
                    }
                },
                // street: {
                //     label: true
                // },
                // city: {
                //     label: true
                // },
                // provincy: {
                //     label: true
                // },
                // country: {
                //     label: true
                // },
                // postalCode: {
                //     label: true
                // },
                // type: {
                //     label: true
                // },
                // complement: {
                //     label: true
                // },
                file: {
                    label: true
                }
            };
        }
    }
})();
