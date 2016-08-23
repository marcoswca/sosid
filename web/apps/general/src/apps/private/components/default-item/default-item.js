(function () {
    'use strict';

    var dependencies = [
        'private.components.contentItemBox'
    ];

    angular
        .module('private.components.defaultItem', dependencies)
        .directive('defaultItem', Directive);

    /** @ngInject */
    function Directive($templateCache, $state) {
        return {
            scope: true,
            bindToController: {
                item: '=',
                modelName: '@',
                onCreateCancel: '=',
                onCreateSuccess: '='
            },
            restrict: 'E',
            controller: Controller,
            controllerAs: 'DefaultItemCtrl',
            template: function(tEl, tAttrs) {
                var itemTemplate = (tAttrs.itemTemplate) ? tAttrs.itemTemplate: $state.current.data.itemTemplate;
                return $templateCache.get('templates/' + itemTemplate);
            }
        };

        /** @ngInject */
        function Controller($scope, $injector) {
            // Private variables
            var Model,
                self = this;

            // Public variables
            self.isCreate = false;
            self.disableFields = true;

            // Public methods
            self.save = save;
            self.cancel = cancel;
            self.enableFields = enableFields;

            // Private methods
            self.$onInit = function() {
                if (!self.modelName) {
                    self.modelName = $state.current.data.modelName;
                }

                Model = $injector.get(self.modelName);
                self.item = new Model(self.item);
                self.isCreate = !self.item.id;

                if (self.isCreate) {
                    enableFields();
                }
            };

            function setLoading(status) {
                $scope.$emit('contentItemBox:Loading', status);
            }

            function save() {
                setLoading(true);
                return self.item
                    .save()
                    .then(function () {
                        self.disableFields = true;

                        if (self.isCreate) {
                            self.onCreateSuccess();
                            self.isCreate = false;
                        }
                    })
                    .finally(function() {
                        setLoading(false);
                    });
            }

            function cancel() {
                if (self.isCreate) {
                    return self.onCreateCancel();
                } else {
                    self.disableFields = true;
                }
            }

            function enableFields() {
                if ($scope.form) {
                    $scope.form.$setUntouched();
                }
                self.disableFields = false;
            }
        }
    }
})();
