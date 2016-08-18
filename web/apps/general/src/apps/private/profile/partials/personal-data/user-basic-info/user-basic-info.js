(function () {
    'use strict';

    var dependencies = [
        'model.user'
    ];

    angular
        .module('private.components.userBasicInfo', dependencies)
        .directive('userBasicInfo', userBasicInfo);

    /** @ngInject */
    function userBasicInfo() {

        return {
            restrict: 'E',
            scope: true,
            controller: UserBasicInfoCtrl,
            controllerAs: 'UserBasicInfoCtrl',
            templateUrl: 'templates/user-basic-info.html'
        };

        function UserBasicInfoCtrl($scope, Session, $timeout) {
            // Private variables
            var self = this;

            // Public variables
            self.user = Session.user;
            self.allowEdit = false;

            // Public methods
            self.enableEdit = enableEdit;
            self.cancelUpdate = cancelUpdate;
            self.updateProfile = updateProfile;


            // Private methods
            return (function init() {
            })();

            function enableEdit() {
                $scope.userProfileForm.$setUntouched();
                self.allowEdit = true;
            }

            function updateProfile() {
                return self.user
                    .updateProfile()
                    .then(function () {
                        $timeout(function() {
                            self.allowEdit = false;
                        });
                    });
            }

            function cancelUpdate() {
                self.allowEdit = false;
                self.user.profile._rollbackValues();
            }
        }

    }
})();
