(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.components.contentItemBox', dependencies)
        .directive('contentItemBox', contentItemBoxDirective);

    /** @ngInject */
    function contentItemBoxDirective() {
        return {
            transclude: true,
            restrict: 'E',
            controller: ContentItemBoxCtrl,
            controllerAs: 'ContentItemBoxCtrl',
            templateUrl: 'templates/content-item-box.html'
        };

        function ContentItemBoxCtrl($scope, $timeout) {
            // Private variables
            var __loadingDebouce,
                self = this;

            // Public variables
            self.isLoading = false;

            // Public methods
            self.setLoading = setLoading;

            // Private methods
            self.$onInit = function() {
                $scope.$on('contentItemBox:Loading', function($event, status) {
                    setLoading(status);
                });
            };

            function setLoading(status) {
                if (__loadingDebouce) {
                    $timeout.cancel(__loadingDebouce);
                }

                __loadingDebouce = $timeout(angular.noop, 300);

                return __loadingDebouce
                    .then(function () {
                        self.isLoading = status;
                    });
            }

        }
    }
})();
