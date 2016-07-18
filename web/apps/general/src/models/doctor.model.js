(function(){
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.doctor'
    ];

    angular
        .module('model.doctor', dependencies)
        .factory('Doctor', DoctorModel);

    /** @ngInject */
    function DoctorModel(BaseModel, $q, DoctorApi) {
        return BaseModel.make({
            api: DoctorApi,
            attributes: getAttributes(),
            classMethods: {},
            instanceMethods: {
                create: function () {
                    return DoctorApi.create(this);
                },
                update: function () {
                    return DoctorApi.update(this);
                }
            }
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
                mobilePhone: {
                    label: true
                },
                phone: {
                    label: true
                }
            };
        }
    }

})();