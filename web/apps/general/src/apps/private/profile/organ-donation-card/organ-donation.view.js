(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.organDonation', dependencies)
        .controller('OrganDonationViewController', OrganDonationViewController);

    /** @ngInject */
    function OrganDonationViewController() {
        // Private variables
        var self = this;

        // Public variables
        self.viewName = 'Organ donation view'; //temporary

        // Public methods

        // Private methods
        return (function init() {

        })();
    }
})();
