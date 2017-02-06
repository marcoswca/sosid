(function() {
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.organCard'
    ];

    angular
        .module('model.organCard', dependencies)
        .factory('OrganCard', OrganCard);

    /** @ngInject */
    function OrganCard(BaseModel, $q, OrganCardApi) {
        return BaseModel.make({
            api: OrganCardApi,
            attributes: getAttributes(),
            classMethods: {}
        });

        function getAttributes() {
            return {
                allowType: {
                    enum: {
                        ALLOW_AFTER_DEATH: 'allowAfterDeath',
                        ALLOW_EXCEPT: 'allowExcept',
                        ALLOW_ONLY_FOLLOWING: 'allowOnlyFollowing',
                        NOT_ALLOW: 'notAllow',
                        PERSON_SHOULD_DECIDE: 'personShouldDecide'
                    }
                },
                allowOnlyFollowingQuestion: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                allowExceptQuestion: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
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
                relationship: {
                    label: true
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
                address: {
                    label: true
                },
                file: {
                    label: true
                }
            };
        }
    }

})();
