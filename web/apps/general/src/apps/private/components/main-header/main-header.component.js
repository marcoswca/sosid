(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.components.mainHeader', dependencies)
        .directive('mainHeader', MainHeader);

    /** @ngInject */
    function MainHeader() {

        return {
            bindToController: {
                pipeline: '='
            },
            controller: MainHeaderCtrl,
            controllerAs: 'MainHeaderCtrl',
            templateUrl: 'templates/main-header.component.html'
        };

        function MainHeaderCtrl(Session) {
            var self = this;

            // public variables

            // public methods
            self.logout = Session.destroy;

            return init();

            function init() {}

        }
    }
})();
