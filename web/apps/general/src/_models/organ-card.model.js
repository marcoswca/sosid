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
                    phoneNumber: true,
                    label: true
                },
                phoneNumber: {
                    phoneNumber: true,
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
                number: {
                    label: true
                },
                complement: {
                    label: true
                },
                file: {
                    label: true
                }
            };
        }
    }

})();
