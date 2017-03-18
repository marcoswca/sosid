(function() {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.allergyView', dependencies)
        .controller('AllergyViewCtrl', AllergyViewCtrl);

    /** ngInject */
    function AllergyViewCtrl($scope, Allergy, $filter, NxtUtility, Session) {
        // Private variables
        var _loadedItems = [],
            ProfileViewCtrl = $scope.$parent.ProfileViewCtrl,
            ALLERGY_TYPES = Allergy.getTypes(),
            self = this;

        // Public variables
        self.allergyTypes = [];

        // Public Methods

        // Private Methods

        return (function() {
            getItems();
        })();

        function configureTypes() {
            self.allergyTypes = _.map(ALLERGY_TYPES, function(value, key) {
                var items = angular.copy($filter('filter')(_loadedItems, { allergyType: value }));
                var total = _.size(items);
                var hideCreateButton = false;

                return {
                    key: key,
                    value: value,
                    option: !!total,
                    hideCreateButton: hideCreateButton,
                    items: items,
                    enableCreate: function enableCreate() {
                        hideCreateButton = true;
                        items.unshift(new Allergy({ allergyType: value }));
                    },
                    cancelCreate: function cancelCreate() {
                        hideCreateButton = false;
                        items.shift();
                    },
                    createSuccess: function createSuccess(item) {
                        hideCreateButton = false;
                        items.shift();
                        items.unshift(item);
                        var acumulator = 0;

                        self.allergyTypes.forEach(function(allergy, index) {
                            acumulator += allergy.items.length;
                        });

                        if (acumulator === 1) {
                            Session.user.profile.categoriesFilled++;
                        }
                    },
                    removeSuccess: function(index) {
                        items.splice(index, 1);
                        var acumulator = 0;

                        self.allergyTypes.forEach(function(allergy, index) {
                            acumulator += allergy.items.length;
                        });

                        if (acumulator === 0) {
                            Session.user.profile.categoriesFilled--;
                        }
                    }
                };
            });
        }

        function getItems() {
            ProfileViewCtrl.setLoading(true);
            return Allergy
                .getAll()
                .then(function(result) {
                    _loadedItems = NxtUtility.bulkInstantiate('Allergy', result.rows);
                    configureTypes();
                })
                .finally(function() {
                    ProfileViewCtrl.setLoading(false);
                });
        }
    }
})();
