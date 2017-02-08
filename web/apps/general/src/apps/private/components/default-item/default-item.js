(function() {
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
                index: '@',
                onCreateCancel: '=',
                onCreateSuccess: '=',
                onRemoveSuccess: '=',
                getAttributes: '='
            },
            restrict: 'E',
            controller: Controller,
            controllerAs: 'DefaultItemCtrl',
            template: function(tEl, tAttrs) {
                var itemTemplate = (tAttrs.itemTemplate) ? tAttrs.itemTemplate : $state.current.data.itemTemplate;
                return $templateCache.get('templates/' + itemTemplate);
            }
        };

        /** @ngInject */
        function Controller($scope, $injector) {
            // Private variables
            var self = this;

            // Public variables
            self.isCreate = false;
            self.disableFields = true;

            // Public methods
            self.save = save;
            self.cancel = cancel;
            self.remove = remove;
            self.enableFields = enableFields;


            var originatorEv = originatorEv;

            // Private methods
            self.$onInit = function() {
                self.isCreate = (self.item.id === undefined);
                if (self.isCreate) {
                    if (self.getAttributes) {
                        self.attributes = self.getAttributes();
                    }
                    console.log(self.item);
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
                    .then(function(data) {
                        self.disableFields = true;

                        if (self.isCreate) {
                            self.isCreate = false;
                            if (_.isFunction(self.onCreateSuccess)) {
                                self.onCreateSuccess(self.item);
                            }
                        }
                    }, function(reason) {
                        console.log(reason);
                    })
                    .finally(function() {
                        setLoading(false);
                    });
            }

            function remove() {
                setLoading(true);
                return self.item
                    .remove()
                    .then(function() {
                        if (_.isFunction(self.onRemoveSuccess)) {
                            return self.onRemoveSuccess(self.item, self.index);
                        }
                    })
                    .finally(function() {
                        setLoading(false);
                    });
            }

            function cancel() {
                if (self.isCreate) {
                    if (_.isFunction(self.onCreateCancel)) {
                        return self.onCreateCancel();
                    }
                } else {
                    self.item._rollbackValues();
                    self.disableFields = true;
                }
            }

            function enableFields() {
                if ($scope.form) {
                    $scope.form.$setUntouched();
                }
                self.disableFields = false;
            }

            this.openMenu = function($mdMenu, ev) {
                originatorEv = ev;
                $mdMenu.open(ev);
            };

            this.set = function(rel) {
                self.item.relationship = rel;

                console.log(self.item.relationship);
                console.log(rel);
            };
        }
    }
})();
