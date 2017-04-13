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
                APP_URL: 'https://sosid.pimentagroup.de/app',
                API_URL: 'https://api.sosid.pimentagroup.de'
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
