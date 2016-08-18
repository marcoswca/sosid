(function () {

    'use strict';

    var dependencies = [
        'api.session',
        'model.user'
    ];

    angular
        .module('app.shared.services.session', dependencies)
        .provider('Session', SessionProvider);

    /** ngInject */
    function SessionProvider() {

        var session = {};

        return {
            set: function (data) {
                session = data;
            },
            $get: $get
        };

        /** @ngInject */
        function $get($rootScope, SessionApi, $window, APP_CONFIG, AlertService, $translate, User) {

            var instantiatedUser;

            if (!instantiatedUser) {
                instantiatedUser = new User(session.user);
            }

            //TODO: ver se isso ainda é necessario
            $rootScope.$on('ApiServiceEvent:session-expired', function () {
                $window.location = APP_CONFIG.APP_URL;
            });

            return {
                user: instantiatedUser,
                destroy: function ($event) {
                    var title, content;

                    $translate('SESSION.LOGOUT.CONFIRM.TITLE')
                        .then(function(TITLE) {
                            title = TITLE;
                            return $translate('SESSION.LOGOUT.CONFIRM.CONTENT');
                        })
                        .then(function(CONTENT) {
                            content = CONTENT;
                            return AlertService
                                .confirmWarning(title, content, $event)
                                .then(function() {
                                    SessionApi
                                        .destroy()
                                        .finally(function() {
                                            $window.location = APP_CONFIG.APP_URL;
                                        });
                                });
                        });

                }
            };
        }

    }
})();