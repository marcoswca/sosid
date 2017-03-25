(function() {

    'use strict';

    var dependencies = ['model.userProfile', 'model.EmergencyContact'];

    angular
        .module('printCard.views.privacy', dependencies)
        .controller('PrintCardController', PrintCardController);

    /** @ngInject */
    function PrintCardController($mdDialog, UserProfile, EmergencyContact) {

        var self = this;

        self.hide = function() {
            $mdDialog.hide();
        };

        UserProfile.get().then((result) => {
            self.user = result;
        });

        EmergencyContact.getAll().then((result) => {
            self.emergencyContact = result.rows[result.rows.length-1];
        });

        self.printCard = function() {
            UserProfile.getSosCardPrint().then(function successCallback(card) {
                var file = new Blob([card], {
                    type: 'application/pdf'
                });
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            });
        };
    }

})();
