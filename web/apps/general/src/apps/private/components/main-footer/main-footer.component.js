(function () {
    'use strict';

    var dependencies = [
        'private.views.privacy',
        'printCard.views.privacy'
    ];

    angular
        .module('private.components.mainFooter', dependencies)
        .directive('mainFooter', MainFooter);

    /** @ngInject */
    function MainFooter() {

        return {
            bindToController: {
                pipeline: '='
            },
            controller: MainFooterCtrl,
            controllerAs: 'MainFooterCtrl',
            templateUrl: 'templates/main-footer.component.html'
        };

        function MainFooterCtrl() {
            var self = this;

            // public variables

            function init() {}

            return init();

        }
    }
})();
