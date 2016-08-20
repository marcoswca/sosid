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
    function DoctorModel(BaseModel, DoctorApi) {
        return BaseModel.make({
            api: DoctorApi,
            attributes: getAttributes(),
            classMethods: {},
            instanceMethods: {
                create: function() {
                    var self = this;
                    return DoctorApi
                        .create(this)
                        .then(function(createdDoctor) {
                            self.id = createdDoctor.id;
                        });
                },
                update: function() {
                    var self = this;

                    var changedValues = self._getChangedValues();

                    return DoctorApi
                        .update(self.id, changedValues)
                        .then(function() {
                            self._commitValues();
                        });
                },
                save: function () {
                    return (!this.id) ? this.create() : this.update();
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
                speciality: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                mobileNumber: {
                    label: true
                },
                phoneNumber: {
                    label: true
                },
                email: {
                    label: true,
                    validate: {
                        email: {
                            message: true
                        }
                    }
                },
                clinicAddress: {
                    label: true
                }
            };
        }
    }

})();