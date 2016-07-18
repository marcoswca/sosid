(function(){
    'use strict';

    var dependencies = [

        /** MODELS **/
        'model.user',

        /** ROUTES **/
        'public.routes.login',
        'public.routes.forgotPassword',
        'public.routes.createAccount',
        'public.routes.passwordReset'
    ];

    angular
        .module('public', dependencies)
        .config(config)
        .run(run)
        .directive('pwCheck', [function () {
            return {
                require: 'ngModel',
                scope: {
                    pwCheck: '='
                },
                link: function (scope, elem, attrs, ctrl) {
                    ctrl.$validators.match = function(modelValue) {
                        return modelValue === scope.$parent.$eval(attrs.pwCheck);
                    };
                }
            };
        }]);

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
    function run(NxtRouterHelper) {
        var states = [
            {
                state: 'public',
                config: {
                    abstract: true,
                    views: {
                        'layout': {
                            templateUrl: 'templates/public.view.html'
                        }
                    }
                }
            }
        ];

        NxtRouterHelper.configureStates(states, '/login');
    }

})();