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
                APP_URL: 'http://sosid.pimentagroup.de',
                API_URL: 'http://sosid.pimentagroup.de:4000'
            }
        })
        .config(config);

    /** @ngInject */
    function config($translateProvider) {
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider
            .useStaticFilesLoader({
                prefix: './assets/locales/',
                suffix: '.json'
            })
            .fallbackLanguage('en')
            .preferredLanguage('de');
    }

})();