(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.personalData', dependencies)
        .controller('PersonalDataViewController', PersonalDataViewController);

    /** @ngInject */
    function PersonalDataViewController() {
        // Private variables
        var self = this;

        // Public variables
        self.viewName = 'Personal Data View';

        self.user = {
            firstName: 'Paulo Régis',
            lastName: 'de Medeiros Cavalcante',
            age: '26',
            sex: 'male',
            bloodType: 'Group AB',
            address: 'Düesbergweg 10, 48153 Münster',
            plan: 'Lorem Ipsum sit dolor amet plan',
            period: 'Good from 25 July, 2016 to 31 March, 2017'
        };

        self.userFullname = self.user.firstName + " " + self.user.lastName;

        // Public methods

        // Private methods
        return (function init() {
            console.log(self.user);
        })();
    }
})();
