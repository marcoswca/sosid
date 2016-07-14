(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.doctors', dependencies)
        .controller('DoctorsViewController', DoctorsViewController);

    /** @ngInject */
    function DoctorsViewController() {
        // Private variables
        var self = this;

        // Public variables
        self.viewName = 'Doctors view'; //temporary

        // Public methods

        // Private methods
        return (function init() {

        })();
    }
})();
