(function () {
    'use strict';

    var dependencies = [
        'model.livingWill'
    ];

    angular
        .module('private.views.livingWill', dependencies)
        .controller('LivingWillViewController', LivingWillViewController);

    /** @ngInject */
    function LivingWillViewController($scope, LivingWill) {
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
            return LivingWill
                .get()
                .then(function (data) {
                    self.item = new LivingWill(data);
                })
                .catch(function(result) {
                    if (result.status === 404) {
                        self.item = new LivingWill();
                    }
                })
                .finally(function () {
                    ProfileViewCtrl.setLoading(false);
                });
        }
    }
})();
