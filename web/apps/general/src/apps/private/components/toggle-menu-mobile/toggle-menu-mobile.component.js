(function() {
    'use strict';

    var dependencies = [];

    angular
        .module('private.components.toggleMenuMobile', dependencies)
        .directive('toggleMenuMobile', ToggleMenuMobile);

    /** @ngInject */
    function ToggleMenuMobile() {

        return {
            bindToController: {
                pipeline: '='
            },
            controller: ToggleMenuMobileCtrl,
            controllerAs: 'ToggleMenuMobileCtrl',
            templateUrl: 'templates/toggle-menu-mobile.component.html'
        };

        function ToggleMenuMobileCtrl($mdSidenav, $log) {
            var self = this;

            // public variables

            // public methods
            self.toggleRight = buildToggler('left');

            return init();

            function init() {}

            function buildToggler(navID) {

                return function() {
                    $mdSidenav(navID)
                        .toggle()
                        .then(function() {
                            $log.debug("toggle " + navID + " is done");
                        });
                };
            }
        }
    }
})();
