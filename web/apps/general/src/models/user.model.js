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
                emailForLogin: {
                    label: 'USER.ATTRIBUTES.EMAIL.LABEL',
                    placeholder: 'USER.ATTRIBUTES.EMAIL.PLACEHOLDER',
                    validate: {
                        required: {
                            message: 'USER.ATTRIBUTES.EMAIL.VALIDATION.REQUIRED'
                        },
                        email: {
                            message: 'USER.ATTRIBUTES.EMAIL.VALIDATION.VALID'
                        }
                    }
                },
                email: {
                    label: 'USER.ATTRIBUTES.EMAIL.LABEL',
                    placeholder: 'USER.ATTRIBUTES.EMAIL.PLACEHOLDER',
                    validate: {
                        required: {
                            message: 'USER.ATTRIBUTES.EMAIL.VALIDATION.REQUIRED'
                        },
                        email: {
                            message: 'USER.ATTRIBUTES.EMAIL.VALIDATION.VALID'
                        },
                        unique: {
                            isAsync: true,
                            message: 'USER.ATTRIBUTES.EMAIL.VALIDATION.REGISTERED',
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
                    label: 'USER.ATTRIBUTES.NAME.LABEL',
                    placeholder: 'USER.ATTRIBUTES.NAME.PLACEHOLDER',
                    validate: {
                        required: {
                            message: 'USER.ATTRIBUTES.NAME.VALIDATION.REQUIRED'
                        },
                        len: {
                            args: [3, 80],
                            message: 'USER.ATTRIBUTES.NAME.VALIDATION.LENGTH'
                        }
                    }
                },
                password: {
                    label: 'USER.ATTRIBUTES.PASSWORD.LABEL',
                    placeholder: 'USER.ATTRIBUTES.PASSWORD.PLACEHOLDER',
                    validate: {
                        required: {
                            message: 'USER.ATTRIBUTES.PASSWORD.VALIDATION.REQUIRED'
                        },
                        len: {
                            args: [8, 60],
                            message: 'USER.ATTRIBUTES.PASSWORD.VALIDATION.LENGTH'
                        },
                        password: {
                            message: 'USER.ATTRIBUTES.PASSWORD.VALIDATION.FORMAT'
                        }
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