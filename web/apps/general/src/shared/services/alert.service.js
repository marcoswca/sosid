(function () {

    'use strict';

    var dependencies = [
        'app.shared.alert.template.confirmWarning',
        'app.shared.alert.template.info'
    ];

    angular
        .module('app.shared.services.alert', dependencies)
        .service('AlertService', AlertService);

    /** @ngInject */
    function AlertService($mdDialog, $translate) {

        var self = this;

        /**
         *
         * @param content
         * @param $event
         * @returns {promise}
         */
        self.confirmRemove = function (content, $event) {

            return $translate('ALERT')
                .then(function(title) {
                    return confirmWarning(title, content, $event);
                });

        };

        self.confirmWarning = confirmWarning;

        function confirmWarning(title, content, $event) {
            var locals = {
                title: title,
                content: content
            };

            return $mdDialog.show({
                controller: 'ConfirmWarningAlertController',
                controllerAs: '$ConfirmWarningAlertController',
                templateUrl: 'templates/confirm-warning.alert.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: false,
                locals: locals
            });
        }

        /**
         *
         * @param title
         * @param content
         * @param confirmText
         * @param $event
         * @returns {promise}
         */
        self.info = function (title, content, confirmText, $event) {

            var locals = {
                title: title,
                content: content,
                confirmText: confirmText
            };

            return $mdDialog.show({
                controller: 'InfoAlertController',
                controllerAs: '$InfoAlertController',
                templateUrl: 'templates/info.alert.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: false,
                locals: locals
            });

        };

    }

})();