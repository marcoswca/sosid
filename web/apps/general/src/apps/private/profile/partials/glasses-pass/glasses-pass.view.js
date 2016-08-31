(function () {
    'use strict';

    var dependencies = [
        'model.glassesPass'
    ];

    angular
        .module('private.views.glassesPass', dependencies)
        .controller('GlassesPassViewController', GlassesPassViewController);

    /** @ngInject */
    function GlassesPassViewController($scope, GlassesPass) {
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
            return GlassesPass
                .get()
                .then(function (data) {
                    self.item = new GlassesPass(data);
                })
                .catch(function(result) {
                    if (result.status === 404) {
                        self.item = new GlassesPass();
                    }
                })
                .finally(function () {
                    ProfileViewCtrl.setLoading(false);
                });
        }
    }
})();
