(function() {
    'use strict';

    var dependencies = ['model.userResources'];

    angular
        .module('private.components.userResources', dependencies)
        .directive('userResources', userResources);

    /** @ngInject */
    function userResources() {

        return {
            restrict: 'E',
            scope: true,
            controller: UserResourcesCtrl,
            controllerAs: 'UserResourcesCtrl',
            templateUrl: 'templates/resources.html'
        };

        function UserResourcesCtrl(UserResources) {
            // Private variables
            var self = this;

            UserResources.getAll().then(function successCallback(data) {
                self.files = data;
            }, function errorCallback(reason) {

            });

            self.openFile = function(file) {

                UserResources.getFile(file.url).then(function successCallback(data) {
                    var toOpen = new Blob([data], {
                        type:  file.mimeType
                    });

                    var fileURL = URL.createObjectURL(toOpen);
                    window.open(fileURL);

                }, function errorCallback(reason) {
                    console.log(reason);
                });
            };

            self.byteToMbyte = function(syzeInBytes) {
                return (syzeInBytes / (1024 * 1024)).toFixed(2);
            };

            self.removeFile = function(file) {
                UserResources.remove(file.id).then(function successCallback(data) {
                    var index = self.files.indexOf(file);
                    self.files.splice(index, 1);
                }, function errorCallback(reason) {

                });
            };

        }

    }
})();
