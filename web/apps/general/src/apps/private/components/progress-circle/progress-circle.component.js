(function() {
    'use strict';

    var dependencies = ['model.livingWill'];

    angular
        .module('private.components.progressCircle', dependencies)
        .directive('progressCircle', ProgressCircle);

    /** @ngInject */
    function ProgressCircle() {

        return {
            bindToController: {
                pipeline: '='
            },
            controller: ProgressCircleCtrl,
            controllerAs: 'ProgressCircleCtrl',
            templateUrl: 'templates/progress-circle.component.html'
        };

        function ProgressCircleCtrl(LivingWill, Session) {
            var self = this;
            self.hasAvatar = function() {
                return !!Session.user.profile.File;
            };

            self.UpdateImageProfile = function(file) {
                var object = {
                    file: file
                };
                LivingWill.UpdateImageProfile(object).then(function successCallback(data) {
                    Session.user.profile.File = data.data.file;
                }, function errorCallback(reason) {
                    console.log(reason);
                });
            };

            self.getFilePath = function() {
                if (Session.user.profile.File) {
                    return Session.user.profile.File.filePath;
                } else {
                    return undefined;
                }
            };

            return init();

            function init() {}
        }
    }
})();
