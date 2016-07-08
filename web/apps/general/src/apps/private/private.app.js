(function () {
    'use strict';

    var dependencies = [
        // Vendors
        'ui.utils.masks',

        // Routes
        'private.routes.settings',

        // Profile Routes
        'private.routes.organDonation',
        'private.routes.personalData',
        'private.routes.medications',
        'private.routes.livingWill',

        // Views
        'private.views.master'

    ];

    angular
        .module('private', dependencies)
        .config(config)
        .run(run);

    /** @ngInject */
    function config($mdIconProvider, $mdThemingProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/', '/profile/');

        $mdThemingProvider.theme('default')
            .primaryPalette('orange', {
                'default': '800', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '600', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '500', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': '400' // use shade A100 for the <code>md-hue-3</code> class
            })
            .accentPalette('blue', {
                'default': 'A700', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '800', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '700', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': '600' // use shade A100 for the <code>md-hue-3</code> class
            });

        $mdIconProvider
            .iconSet('action', 'assets/material-icons/action-icons.svg', 24)
            .iconSet('alert', 'assets/material-icons/alert-icons.svg', 24)
            .iconSet('av', 'assets/material-icons/av-icons.svg', 24)
            .iconSet('communication', 'assets/material-icons/communication-icons.svg', 24)
            .iconSet('content', 'assets/material-icons/content-icons.svg', 24)
            .iconSet('device', 'assets/material-icons/device-icons.svg', 24)
            .iconSet('editor', 'assets/material-icons/editor-icons.svg', 24)
            .iconSet('file', 'assets/material-icons/file-icons.svg', 24)
            .iconSet('hardware', 'assets/material-icons/hardware-icons.svg', 24)
            .iconSet('icons', 'assets/material-icons/icons-icons.svg', 24)
            .iconSet('image', 'assets/material-icons/image-icons.svg', 24)
            .iconSet('maps', 'assets/material-icons/maps-icons.svg', 24)
            .iconSet('navigation', 'assets/material-icons/navigation-icons.svg', 24)
            .iconSet('notification', 'assets/material-icons/notification-icons.svg', 24)
            .iconSet('social', 'assets/material-icons/social-icons.svg', 24)
            .iconSet('toggle', 'assets/material-icons/toggle-icons.svg', 24);
    }

    /** @ngInject **/
    function run(NxtRouterHelper) {
        var states = [
            {
                state: 'private',
                config: {
                    url: '/',
                    abstract: true,
                    views: {
                        layout: {
                            controller: 'MasterViewController',
                            controllerAs: 'MasterViewCtrl',
                            templateUrl: 'templates/master.view.html'
                        }
                    }
                }
            }
        ];

        NxtRouterHelper.configureStates(states, '/profile');


    }

})();