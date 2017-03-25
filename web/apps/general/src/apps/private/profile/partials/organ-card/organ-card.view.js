(function() {
    'use strict';

    var dependencies = [
        'model.organCard'
    ];

    angular
        .module('private.views.organCard', dependencies)
        .controller('OrganCardViewController', OrganCardViewController);

    /** @ngInject */
    function OrganCardViewController($scope, OrganCard) {
        // Private variables
        var ProfileViewCtrl = $scope.$parent.ProfileViewCtrl,
            self = this;

        // Public variables
        self.item = undefined;

        // Public methods

        // Private methods
        return (function init() {
            getItem();
        })();

        function getItem() {
            ProfileViewCtrl.setLoading(true);
            return OrganCard
                .get()
                .then(function(data) {
                    self.item = new OrganCard(data);
                })
                .catch(function(result) {
                    if (result.status === 404) {
                        self.item = new OrganCard();
                    }
                })
                .finally(function() {
                    ProfileViewCtrl.setLoading(false);
                });
        }
    }
})();
