(function() {

    'use strict';

    var dependencies = ['model.userProfile'];

    angular
        .module('printCard.views.privacy', dependencies)
        .controller('PrintCardController', PrintCardController);

    /** @ngInject */
    function PrintCardController($mdDialog, UserProfile) {

        var self = this;

        self.hide = function() {
            $mdDialog.hide();
        };

        self.printCard = function() {
          console.log(UserProfile);
            UserProfile.getSosCardPrint().then((card) => {
                var file = new Blob([card], {
                    type: 'application/pdf'
                });
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            });
        }
    }

})();
