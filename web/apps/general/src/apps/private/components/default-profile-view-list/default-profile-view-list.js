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
        function Controller($scope, $injector, $state, NxtUtility) {

            var ModelName = $state.current.data.modelName,
                ProfileViewCtrl = $scope.$parent.ProfileViewCtrl,
                Model,
                self = this;

            // Public variables
            self.allowCreate = false;
            self.items = [];

            // Public methods
            self.enableCreate = enableCreate;
            self.cancelCreate = cancelCreate;
            self.createSuccess = createSuccess;
            self.removeSuccess = removeSuccess;

            // Private methods
            self.$onInit = function() {
                Model = $injector.get(ModelName);
                getItems();
                ProfileViewCtrl.contentHeader = {
                    button: {
                        show: function() {
                            return !self.allowCreate;
                        },
                        name: $state.current.data.addButtonText,
                        fn: enableCreate
                    }
                };

                $scope.$on('$destroy', function() {
                    ProfileViewCtrl.contentHeader = {
                        button: {}
                    };
                });
            };

            function getItems() {
                ProfileViewCtrl.setLoading(true);
                return Model
                    .getAll()
                    .then(function(result) {
                        if (result.count) {
                            self.items = NxtUtility.bulkInstantiate(ModelName, result.rows);
                        } else {
                            enableCreate();
                        }

                    })
                    .finally(function() {
                        ProfileViewCtrl.setLoading(false);
                    });
            }

            function enableCreate() {
                self.allowCreate = true;
                self.items.unshift(new Model({}));
            }

            function removeSuccess(item, index) {
                //item.___removed = true;
                self.items.splice(index, 1);
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
