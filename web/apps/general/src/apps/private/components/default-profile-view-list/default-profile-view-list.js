(function () {
    'use strict';

    var dependencies = [
        'private.components.defaultItem'
    ];

    angular
        .module('private.components.defaultProfileViewList', dependencies)
        .directive('defaultProfileViewList', Directive);

    /** @ngInject */
    function Directive() {

        return {
            restrict: 'E',
            controller: Controller,
            controllerAs: 'DefaultProfileViewListCtrl',
            templateUrl: 'templates/default-profile-view-list.html'
        };

        /** @ngInject */
        function Controller($scope, $injector, $state) {
            // Private variables
            var Model,
                self = this;

            // Public variables
            self.allowCreate = false;
            self.items = [];

            // Public methods
            self.enableCreate = enableCreate;
            self.cancelCreate = cancelCreate;
            self.createSuccess = createSuccess;

            // Private methods
            self.$onInit = function() {
                Model = $injector.get($state.current.data.modelName);
                getItems();
                $scope.ProfileViewCtrl.contentHeader = {
                    button: {
                        show: function() {
                            return !self.allowCreate;
                        },
                        name: $state.current.data.addButtonText,
                        fn: enableCreate
                    }
                };
            };

            function getItems() {
                $scope.ProfileViewCtrl.setLoading(true);
                return Model
                    .getAll()
                    .then(function(result) {
                        self.items = result.rows;
                    })
                    .finally(function() {
                        $scope.ProfileViewCtrl.setLoading(false);
                    });
            }

            function enableCreate() {
                self.allowCreate = true;
                self.items.unshift({});
            }

            function createSuccess() {
                self.allowCreate = false;
            }

            function cancelCreate() {
                self.allowCreate = false;
                self.items.shift();
            }
        }

    }
})();
