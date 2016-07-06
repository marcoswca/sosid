(function () {
    'use strict';

    var $injector, $q, dependencies, application;

    angular.element(document).ready(function () {
        dependencies = [
            'ng',
            'ngAnimate',
            'ngCookies',
            'app.shared',
            'Nxt.RouterHelper',
            'templates-app',
            'core.config',
            'api.session'
        ];

        try {

            $injector = angular.injector(dependencies);
            $q = $injector.get('$q');

            moment.locale('de_DE');

            application = new Application();

            application.boot();

        } catch(e) {
            console.log(e);
        }

    });

    var ErrorStatusEnum = {
        NOT_LOGGED: 404,
        NO_CONNECTION: 0
    };

    var BootstrapApps = {
        MAIN: 'private',
        NOT_LOGGED: 'public',
        OFFLINE: 'noAccess'
    };

    // Bootstrap Class
    function Application() {
        this.bootstrapAppName = null;
        this.session = {};
    }

    // Requisita a sessão ao servidor e se não encontrar encaminha para tela de login
    Application.prototype.getSession = function () {

        var
            SessionApi = $injector.get('SessionApi'),
            self = this;

        // verificando sessão
        return SessionApi
            .get()
            .then(function (session) {
                self.session = session;
            });

    };

    // Rotas de carregamentos
    Application.prototype.load = function () {
        return this.getSession();
    };

    Application.prototype.prepare = function () {

        var
            deferred = $q.defer(),
            self = this;

        this.load()
            .then(function () {
                self.bootstrapAppName = BootstrapApps.MAIN;
                setMainModuleConfiguration();
                deferred.resolve();
            })
            .catch(function (e) {
                var status = e.status;

                if (status === ErrorStatusEnum.NO_CONNECTION || status === -1) {
                    self.bootstrapAppName = BootstrapApps.OFFLINE;
                }

                else if (status === ErrorStatusEnum.NOT_LOGGED) {
                    self.bootstrapAppName = BootstrapApps.NOT_LOGGED;
                }

                deferred.resolve();
            });

        return deferred.promise;

        function setMainModuleConfiguration() {

            if (!self.session) {
                throw new Error('Não é possivel iniciar a aplicação sem uma sessão');
            }

            var app = angular.module(BootstrapApps.MAIN);

            app.config(appConfig);
            app.run(appRun);

            /** @ngInject */
            function appConfig(SessionProvider) {
                SessionProvider.set(self.session);
            }

            /** @ngInject **/
            function appRun() {
                //
            }
        }

    };

    //
    Application.prototype.boot = function () {
        var self = this;

        this.prepare()
            .then(function () {

                dependencies.push(self.bootstrapAppName);
                angular.bootstrap(document, dependencies, { strictDi: true });

            });
    };

})();