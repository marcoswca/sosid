(function () {

    'use strict';

    var dependencies = [
        'pascalprecht.translate',
        'ngSanitize'
    ];

    angular
        .module('core.config', dependencies)
        .constant('APP_CONFIG', {
            URL: {
                // APP_URL: 'http://35.156.40.94/sosid/',
                APP_URL: 'https://sosid.pimentagroup.de/app',
                // APP_URL: 'http://localhost:3001',
                // API_URL: 'http://localhost:3000'
                API_URL: 'https://api.sosid.pimentagroup.de'
                // API_URL: 'http://35.156.40.94'
            }
        })
        .config(config);

    /** @ngInject */
    function config($translateProvider) {
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider
            .useStaticFilesLoader({
                prefix: './assets/locales/',
                suffix: '.json?v=' + APP_VERSION
            })
            .fallbackLanguage('en')
            .preferredLanguage('de');
    }

})();
