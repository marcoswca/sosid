(function() {
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.product'
    ];

    angular
        .module('model.product', dependencies)
        .factory('Product', ProductModel);

    /** @ngInject */
    function ProductModel(BaseModel, ProductApi) {
        return BaseModel.make({
            api: ProductApi,
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
                description: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                summary: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                productPin: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                active: {
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
