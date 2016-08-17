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

        function UserBasicInfoCtrl($scope, User, Session) {
            // Private variables
            var self = this;

            // Public variables
            $scope.a = new Date();
            self.user = {};
            self.allowEdit = false;

            // Public methods
            self.enableEdit = enableEdit;
            self.cancelUpdate = cancelUpdate;
            self.updateProfile = updateProfile;


            // Private methods
            return (function init() {
                self.user = new User(Session.user);
                console.log(self.user);
            })();

            function enableEdit() {
                $scope.userProfileForm.$setUntouched();
                self.allowEdit = true;
            }

            function updateProfile() {
                return self.user
                    .updateProfile()
                    .then(function () {
                        self.allowEdit = false;
                    });
            }

            function cancelUpdate() {
                self.allowEdit = false;
                self.user.profile._rollbackValues();
            }
        }

    }
})();
