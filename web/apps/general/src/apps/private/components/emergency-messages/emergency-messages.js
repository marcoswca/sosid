(function() {
    'use strict';

    var dependencies = [
        'model.emergencyMessages'
    ];

    angular
        .module('private.components.emergencyMessages', dependencies)
        .directive('emergencyMessages', emergencyMessages);

    /** @ngInject */
    function emergencyMessages() {

        return {
            restrict: 'E',
            scope: true,
            controller: EmergencyMessagesCtrl,
            controllerAs: 'EmergencyMessagesCtrl',
            templateUrl: 'templates/emergency-messages.html'
        };

        function EmergencyMessagesCtrl($scope, EmergencyMessages) {
            // Private variables
            var self = this;
            self.user = {};

            EmergencyMessages.getAll().then(function successCallback(data) {
                self.user.messages = data.rows;
            }, function errorCallback(reason) {

            });

            self.addEmergencyMessage = function() {
                self.user.messages.push({
                    toSend: true
                });
            };

            self.deleteMessage = function(emergencyMessage) {
                if (emergencyMessage.id) {
                    EmergencyMessages.remove(emergencyMessage.id).then(function successCallback(data) {
                        var index = self.user.messages.indexOf(emergencyMessage);
                        self.user.messages.splice(index, 1);
                    }, function errorCallback(reason) {
                        console.log(reason);
                    });
                } else {
                    var index = self.user.messages.indexOf(emergencyMessage);
                    self.user.messages.splice(index, 1);
                }
            };

            self.changeStatus = function(emergencyMessage) {
                return emergencyMessage.toSend = !emergencyMessage.toSend;
            };

            self.sendMessage = function(emergencyMessage) {
                var payload = {
                    message: emergencyMessage.message
                };
                var id = emergencyMessage.id;
                if (emergencyMessage.id) {
                    EmergencyMessages.update(id, payload).then(function successCallback(data) {
                        emergencyMessage.toSend = false;
                    }, function errorCallback(reason) {
                        console.log(reason);
                    });
                } else {
                    EmergencyMessages.create(payload).then(function successCallback(data) {
                        emergencyMessage.toSend = false;
                        emergencyMessage.id = data.id;
                    }, function errorCallback(reason) {
                        console.log(reason);
                    });
                }
            };
            // Public variables

            // Private methods
            return (function init() {})();

        }

    }
})();
