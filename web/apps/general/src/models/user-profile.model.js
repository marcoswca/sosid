(function () {
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.userProfile'
    ];

    angular
        .module('model.userProfile', dependencies)
        .factory('UserProfile', UserProfile);

    /** @ngInject */
    function UserProfile(BaseModel, $filter, UserProfileApi) {
        return BaseModel.make({
            api: UserProfileApi,
            attributes: getAttributes(),
            classMethods: {},
            enabledUpdateAttributes: [
                'firstName',
                'lastName',
                'birthDate',
                'gender',
                'address',
                'bloodType'
            ],
            onInstance: function() {
                var self = this;

                if (self.birthDate) {
                    self.birthDate = new Date(self.birthDate);
                }

            },
            onCommitValues: function(fields) {
                var self = this;

                if (_.indexOf(fields, 'birthDate') > -1) {
                    self.age = moment().diff(self.birthDate, 'years');
                }
            },
            instanceMethods: {
                update: function () {
                    var self = this;

                    var changedValues = self._getChangedValues();

                    return UserProfileApi
                        .update(changedValues)
                        .then(function() {
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
                    label: true
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
                address: {
                    label: true
                }
            };
        }
    }

})();