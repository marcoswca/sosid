(function () {
    'use strict';

    var dependencies = [
        'private.components.mainHeader'
    ];

    angular
        .module('private.views.master', dependencies)
        .controller('MasterViewController', MasterViewController);

    /** @ngInject */
    function MasterViewController($mdSidenav, $log) {
        // Private variables
        var self = this;

        // Public variables
        self.isLoading = false;

        // Public methods
        self.setLoading = setLoading;
        self.close = close;

        // Private methods
        return (function init() {

        })();

        function setLoading(status) {
            self.isLoading = status;
        }

        function close() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        }
    }
})();
