(function() {
    'use strict';

    var dependencies = ['ui.router'];

    angular
        .module('Nxt.RouterHelper', dependencies)
        .provider('NxtRouterHelper', RouterHelperProvider);

    /** @ngInject */
    function RouterHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {

        this.$get = NxtRouter;

        $locationProvider.html5Mode(true);

        /** @ngInject */
        function NxtRouter($state) {
            var hasOtherwise = false;

            var service = {
                configureStates: configureStates,
                getStates: getStates
            };

            return service;

            ///////////////

            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function getStates() { return $state.get(); }
        }
    }

})();