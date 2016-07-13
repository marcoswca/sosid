(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.components.progressCircle', dependencies)
        .directive('progressCircle', ProgressCircle);

    /** @ngInject */
    function ProgressCircle() {

        return {
            bindToController: {
                pipeline: '='
            },
            controller: ProgressCircleCtrl,
            controllerAs: 'ProgressCircleCtrl',
            templateUrl: 'templates/progress-circle.component.html'
        };

        function ProgressCircleCtrl() {
            var self = this;

            // public variables

            // public methods

            return init();

            function init() {}

        }
    }
})();
