(function () {
    'use strict';

    var dependencies = [
        'private.components.progressCircle',
        'private.components.toggleMenuMobile',
        'private.views.privacy'
    ];

    angular
        .module('private.views.profile', dependencies)
        .controller('ProfileViewController', ProfileViewController);

    /** @ngInject */
    function ProfileViewController($mdDialog) {
        // Private variables
        var self = this;

        // Public variables

        // Public methods
        self.showPrivacySettings = showPrivacySettings;

        // Private methods
        return (function init() {

        })();

        function showPrivacySettings($event) {
            return $mdDialog.show({
                controller: 'PrivacyController',
                controllerAs: '$PrivacyController',
                templateUrl: 'templates/privacy.view.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true
            });
        }
    }
})();
