(function() {
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.emergencyMessages'
    ];

    angular
        .module('model.emergencyMessages', dependencies)
        .factory('EmergencyMessages', EmergencyMessages);

    /** @ngInject */
    function EmergencyMessages(BaseModel, $q, EmergencyMessagesApi) {
        return BaseModel.make({
            api: EmergencyMessagesApi,
            attributes: getAttributes(),
            classMethods: {}
        });

        function getApi() {
            return EmergencyMessagesApi;
        }

        function getAttributes() {
            return {

                id: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                message: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                private: {
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
