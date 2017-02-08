(function() {
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.userProfile'
    ];

    angular
        .module('model.userProfile', dependencies)
        .factory('UserProfile', UserProfile);

    /** @ngInject */
    function UserProfile(BaseModel, UserProfileApi) {
        return BaseModel.make({
            api: UserProfileApi,
            attributes: getAttributes(),
            classMethods: {},
            onInstance: function() {
                var self = this;
            },
            onCommitValues: function(fields) {
                var self = this;

                if (_.indexOf(fields, 'birthDate') > -1) {
                    self.age = moment().diff(self.birthDate, 'years');
                }
            },
            instanceMethods: {
                update: function() {
                    var self = this;
                    var changedValues = self._getChangedValues();
                    console.log(self);
                    console.log(changedValues);
                    return UserProfileApi
                        .update(changedValues)
                        .then(function() {
                            console.log(self._getChangedValues());
                            self._commitValues();
                        });
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
                        },
                        len: {
                            args: [3, 80],
                            message: true
                        }
                    }
                },
                lastName: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        },
                        len: {
                            args: [3, 80],
                            message: true
                        }
                    }
                },
                birthDate: {
                    label: true,
                    isDate: true
                },
                age: {
                    label: true
                },
                gender: {
                    label: true,
                    validate: {
                        required: true
                    }
                },
                bloodType: {
                    label: true,
                    validate: {
                        required: true
                    }
                },
                street: {
                    label: true
                },
                city: {
                    label: true
                },
                provincy: {
                    label: true
                },
                country: {
                    label: true
                },
                postalCode: {
                    label: true
                },
                type: {
                    label: true
                },
                file: {
                    label: true
                },
                plan: {
                    label: true
                },
                familyDoctor: {
                    firstName: {
                        label: true
                    }
                }
            };
        }
    }

})();
