(function(){
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.allergie'
    ];

    angular
        .module('model.allergie', dependencies)
        .factory('Allergie', AllergieModel);

    /** @ngInject */
    function AllergieModel(BaseModel, $q, AllergieApi) {
        return BaseModel.make({
            api: AllergieApi,
            attributes: getAttributes(),
            classMethods: {},
            instanceMethods: {
                create: function () {
                    return AllergieApi.create(this);
                },
                update: function () {
                    return AllergieApi.update(this);
                }
            }
        });

        function getAttributes() {
            return {
                allergie: {
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