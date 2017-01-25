(function () {
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.user',
        'model.userProfile'
    ];

    angular
        .module('model.user', dependencies)
        .factory('User', UserModel);

    /** @ngInject */
    function UserModel(BaseModel, $q, UserApi, UserProfile) {
        return BaseModel.make({
            api: UserApi,
            attributes: getAttributes(),
            classMethods: {},
            onInstance: function() {
                if (!_.isEmpty(this.profile)) {
                    this.profile = new UserProfile(this.profile);
                }
            },
            instanceMethods: {
                create: function () {
                    return UserApi.create(this);
                },
                updateProfile: function () {
                    return this.profile.update();
                },
                hasPlan: function() {
                    return !!this.profile.plan;
                },
                startTrial: function() {
                    return UserApi
                        .startTrial();
                }
            }
        });

        function getAttributes() {
            return {
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
                                    .catch(function () {
                                        deferred.resolve();

                                    });

                                return deferred.promise;
                            }
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
            };
        }
    }

})();