(function () {
    'use strict';

    var dependencies = [
        'ngMaterial',

        /* COMPONENTS */
        'app.shared.components.input',
        'app.shared.components.autocomplete',

        /** SERVICES **/
        'app.shared.services.session',
        'app.shared.services.alert'
    ];

    angular
        .module('app.shared', dependencies)
        .config(config);

    /** @ngInject */
    function config($mdThemingProvider) {

        var blueMap = $mdThemingProvider.extendPalette('blue', {
            '800': '#00A2D3',
            '600': '#1ABADE'
        });
        // Register the new color palette map with the name <code>neonRed</code>
        $mdThemingProvider.definePalette('sosidBlue', blueMap);

        $mdThemingProvider.theme('default')
            .primaryPalette('sosidBlue', {
                'default': '800', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '600', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '500', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': '400' // use shade A100 for the <code>md-hue-3</code> class
            })
            .accentPalette('red', {
                'default': 'A700', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '800', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '700', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': '600' // use shade A100 for the <code>md-hue-3</code> class
            });

    }

})();