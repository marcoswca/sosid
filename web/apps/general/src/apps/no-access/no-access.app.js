(function(){
    'use strict';

    var dependencies = [
        'ngMaterial'
    ];

    angular
        .module('noAccess', dependencies)
        .config(config)
        .run(run);

    /** @ngInject */
    function config($mdThemingProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('orange', {
                'default': '800', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '600', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '500', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': '400' // use shade A100 for the <code>md-hue-3</code> class
            })
            .accentPalette('blue', {
                'default': 'A700', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '800', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '700', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': '600' // use shade A100 for the <code>md-hue-3</code> class
            });
    }

    /** @ngInject **/
    function run(NxtRouterHelper, $rootScope, $window) {

        $rootScope.reload = function() {
            $window.location.reload();
        };

        var states = [
            {
                state: 'public',
                config: {
                    url: '/',
                    views: {
                        'layout': {
                            templateUrl: 'templates/no-access.html'
                        }
                    }
                }
            }
        ];

        NxtRouterHelper.configureStates(states, '/');
    }

})();