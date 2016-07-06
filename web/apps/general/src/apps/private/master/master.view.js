(function () {
    'use strict';

    var dependencies = [
        'private.components.mainHeader'
    ];

    angular
        .module('private.views.master', dependencies)
        .controller('MasterViewController', MasterViewController);

    /** @ngInject */
    function MasterViewController(Session) {
        // Private variables
        var self = this;

        // Public variables
        self.isLoading = false;

        // Public methods
        self.setLoading = setLoading;


        // Private methods
        return (function init() {

        })();

        function setLoading(status) {
            self.isLoading = status;
        }
    }
})();
