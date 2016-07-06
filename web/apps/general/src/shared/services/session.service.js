(function () {

    'use strict';

    var dependencies = [
        'api.session'
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
        function $get($rootScope, SessionApi, $window, APP_CONFIG, AlertService, $translate) {

            var sessionMethods = {
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

            angular.extend(session, sessionMethods);

            $rootScope.$on('ApiServiceEvent:session-expired', function () {
                $window.location = APP_CONFIG.APP_URL;
            });

            return session;
        }

    }
})();