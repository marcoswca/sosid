(function () {
    'use strict';

    var dependencies = [
        'ngMaterial',

        /* COMPONENTS */
        'app.shared.components.input',
        'app.shared.components.autocomplete',

        /** SERVICES **/
        'app.shared.services.session',
        'app.shared.services.alert'
    ];

    angular
        .module('app.shared', dependencies);


})();