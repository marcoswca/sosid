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
        self.readonly = false;
        // Lists of fruit names and Vegetable objects
        self.fruitNames = ['Apple', 'Banana', 'Orange'];
        self.roFruitNames = angular.copy(self.fruitNames);
        self.editableFruitNames = angular.copy(self.fruitNames);
        self.tags = [];
        self.vegObjs = [
            {
                'name' : 'Broccoli',
                'type' : 'Brassica'
            },
            {
                'name' : 'Cabbage',
                'type' : 'Brassica'
            },
            {
                'name' : 'Carrot',
                'type' : 'Umbelliferous'
            }
        ];
        self.newVeg = function(chip) {
            return {
                name: chip,
                type: 'unknown'
            };
        };

        // Public variables
        self.viewName = 'Organ donation view'; //temporary

        // Public methods

        // Private methods
        return (function init() {

        })();
    }
})();
