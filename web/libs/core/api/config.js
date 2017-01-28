// (function () {

//     'use strict';

//     var dependencies = [
//         'pascalprecht.translate',
//         'ngSanitize'
//     ];

//     angular
//         .module('core.config', dependencies)
//         .constant('APP_CONFIG', {
//             URL: {
//                 APP_URL: 'http://localhost:3000',
//                 API_URL: 'http://138.68.29.83:3000'
//             }
//         })
//         .config(config);

//     /** @ngInject */
//     function config($translateProvider) {
//         $translateProvider.useSanitizeValueStrategy(null);
//         $translateProvider
//             .useStaticFilesLoader({
//                 prefix: './assets/locales/',
//                 suffix: '.json?v=' + APP_VERSION
//             })
//             .fallbackLanguage('en')
//             .preferredLanguage('en');
//     }

// })();