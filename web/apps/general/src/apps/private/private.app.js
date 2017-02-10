(function() {
    'use strict';

    var dependencies = [
        'Nxt.RouterHelper',

        // Vendors
        'ui.utils.masks',
        'model.user',
        'betsol.intlTelInput',

        // Settings Routes
        'private.routes.changePassword',
        'private.routes.paymentHistory',
        'private.routes.subscriptionUpgrade',

        // Profile Routes
        'private.routes.organCard',
        'private.routes.personalData',
        'private.routes.medications',
        'private.routes.livingWill',
        'private.routes.doctors',
        'private.routes.emergencyContacts',
        'private.routes.healthConditions',
        'private.routes.healthInsurance',
        'private.routes.allergies',
        'private.routes.glassesPass',

        // Views
        'private.views.master'

    ];

    angular
        .module('private', dependencies)
        .config(config)
        .run(run);

    /** @ngInject */
    function config($mdIconProvider, $mdThemingProvider, $urlRouterProvider, intlTelInputOptions) {
        //$urlRouterProvider.when('/', '/profile/');
        angular.extend(intlTelInputOptions, {
            nationalMode: false,
            utilsScript: './js/libs/utils.js',
            defaultCountry: 'auto',
            preferredCountries: ['de', 'pt'],
            autoFormat: true,
            autoPlaceholder: true
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
            .iconSet('toggle', 'assets/material-icons/toggle-icons.svg', 24)
            .iconSet('sosid', 'assets/material-icons/sosid-icons.svg', 24);
    }

    /** @ngInject **/
    function run(NxtRouterHelper, $rootScope, Session, $state, $mdDialog) {

        var states = [{
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
        }];
        NxtRouterHelper.configureStates(states, '/profile');

        console.log(Session);

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

            console.log(Session);

            if (toState.name !== 'settings.subscriptionUpgrade' && toState.data.rolePlans) {
                // || Session.user.profile.plan.moreInformations.isExpired
                if (!Session.user.profile.plan) {
                    showWelcome();
                } else {
                    var planName = Session.user.profile.plan.name;
                    var statePlanRoles = toState.data.rolePlans;
                    var hasPermission = statePlanRoles.indexOf(planName.toLowerCase().trim()) > -1;
                    if (!hasPermission) {
                        event.preventDefault();
                        $state.go('settings.subscriptionUpgrade');
                    }
                }
            } else {
                $mdDialog.hide();
            }
        });

        function showWelcome($event) {
            return $mdDialog.show({
                controller: 'WelcomeController',
                controllerAs: '$WelcomeController',
                templateUrl: 'templates/welcome.view.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: false,
                fullscreen: true,
                escapeToClose: false
            });
        }
    }
})();
