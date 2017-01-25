(function() {
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.userResources'
    ];

    angular
        .module('model.userResources', dependencies)
        .factory('UserResources', UserResourcesModel);

    /** @ngInject */
    function UserResourcesModel(BaseModel, $q, UserResourceApi) {
        return BaseModel.make({
            api: UserResourceApi,
            attributes: getAttributes(),
            classMethods: {}
        });

        function getAttributes() {
            return {
                fileName: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                filePath: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                sizeInBytes: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                url: {
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
