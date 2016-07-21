(function(){
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.user'
    ];

    angular
        .module('model.user', dependencies)
        .factory('User', UserModel);

    /** @ngInject */
    function UserModel(BaseModel, $q, UserApi) {
        return BaseModel.make({
            api: UserApi,
            attributes: {
                email: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        },
                        email: {
                            message: true
                        },
                        unique: {
                            isAsync: true,
                            message: true,
                            validate: function (value, id) {
                                var deferred = $q.defer();

                                UserApi
                                    .emailExists(value, id)
                                    .then(function (result) {
                                        deferred.reject();
                                    })
                                    .catch(function() {
                                        deferred.resolve();

                                    });

                                return deferred.promise;
                            }
                        }
                    }
                },
                name: {
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
                password: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        },
                        len: {
                            args: [8, 60],
                            message: true
                        },
                        password: {
                            message: true
                        }
                    }
                },
                age: {
                    label: true
                },
                sex: {
                    label: true
                },
                bloodType: {
                    label: true
                },
                address: {
                    label: true
                },
                plan: {
                    label: true
                },
                period: {
                    label: true
                },
                familyDoctor: {
                    firstName: {
                        label: true
                    }
                }
            },
            classMethods: {},
            instanceMethods: {
                create: function () {
                    return UserApi.create(this);
                }
            }
        });
    }

})();