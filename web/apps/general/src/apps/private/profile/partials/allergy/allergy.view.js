(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.allergyView', dependencies)
        .controller('AllergyViewCtrl', AllergyViewCtrl);

    /** ngInject */
    function AllergyViewCtrl($scope, Allergy, $filter, NxtUtility) {
        // Private variables
        var _loadedItems = [],
            ProfileViewCtrl = $scope.$parent.ProfileViewCtrl,
            ALLERGY_TYPES = Allergy.getTypes(),
            self = this;

        // Public variables
        self.allergyTypes = [];

        // Public Methods

        // Private Methods

        return (function () {
            getItems();
        })();

        function configureTypes() {
            self.allergyTypes = _.map(ALLERGY_TYPES, function (value, key) {
                var items = angular.copy($filter('filter')(_loadedItems, {allergieType: value}));
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
                        items.unshift(new Allergy({ allergieType: value }));
                    },
                    cancelCreate: function cancelCreate() {
                        hideCreateButton = false;
                        items.shift();
                    },
                    createSuccess: function createSuccess(item) {
                        hideCreateButton = false;
                        items.shift();
                        items.unshift(item);
                    },
                    removeSuccess: function (index) {
                        items.splice(index, 1);
                    }
                };
            });
        }

        function getItems() {
            ProfileViewCtrl.setLoading(true);
            return Allergy
                .getAll()
                .then(function (result) {
                    _loadedItems = NxtUtility.bulkInstantiate('Allergy', result.rows);
                    configureTypes();
                })
                .finally(function () {
                    ProfileViewCtrl.setLoading(false);
                });
        }
    }
})();