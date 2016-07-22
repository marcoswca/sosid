(function () {
    'use strict';

    var dependencies = [
        'private.components.progressCircle',
        'private.components.toggleMenuMobile'
    ];

    angular
        .module('private.views.profile', dependencies)
        .controller('ProfileViewController', ProfileViewController);

    /** @ngInject */
    function ProfileViewController() {
        // Private variables
        var self = this;

        // Public variables

        // Public methods

        // Private methods
        return (function init() {

        })();
    }
})();
