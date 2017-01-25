(function() {
    'use strict';

    var dependencies = [
        'private.components.userBasicInfo', 'private.components.emergencyMessages', 'private.components.familyDoctor','private.components.userPlan', 'private.components.userResources'
    ];

    angular
        .module('private.views.personalData', dependencies)
        .controller('PersonalDataViewController', PersonalDataViewController);

    /** @ngInject */
    function PersonalDataViewController() {
        // Private variables
        var self = this;

        // Public variables
        self.isPrivate = false;

        self.user = {
            // firstName: 'Paulo Régis',
            // lastName: 'de Medeiros Cavalcante',
            // age: '26',
            // sex: 'male',
            // bloodType: 'Group AB',
            // address: 'Düesbergweg 10, 48153 Münster',
            // plan: 'Lorem Ipsum sit dolor amet plan',
            // period: 'Good from 25 July, 2016 to 31 March, 2017',
            // messages: [
            //     { text: 'lorem ipsum sit dolor amet consectuor, lorem ipsum sit dolor amet consectuor arrent meqnet ralen, lorem ipsum sit dolor amet consectuor'},
            //     { text: 'lorem ipsum sit dolor amet consectuor, lorem ipsum sit dolor amet consectuor arrent meqnet ralen, lorem ipsum sit dolor amet consectuor'},
            //     { text: 'lorem ipsum sit dolor amet consectuor, lorem ipsum sit dolor amet consectuor arrent meqnet ralen, lorem ipsum sit dolor amet consectuor'}
            // ]

        };

        self.userFullname = self.user.firstName + " " + self.user.lastName;

        // Public methods

        self.togglePrivacy = function() {
            self.isPrivate = !self.isPrivate;
            console.log(self.isPrivate);
        };

        // Private methods
        return (function init() {})();
    }
})();
