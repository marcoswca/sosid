(function() {
    'use strict';

    var dependencies = [
        'model.userProfile'
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

        function UserBasicInfoCtrl($scope, Session, $timeout, UserProfileApi) {
            // Private variables
            var self = this;

            // Public variables
            self.user = Session.user;
            self.allowEdit = false;

            // Public methods
            self.enableEdit = enableEdit;
            self.cancelUpdate = cancelUpdate;
            self.updateProfile = updateProfile;

            self.addAddress = addAddress;
            self.removeAddress = removeAddress;

            // Private methods
            return (function init() {})();

            function enableEdit() {
                $scope.userProfileForm.$setUntouched();
                self.allowEdit = true;
            }

            function updateProfile() {
              console.log(self.user);
                return self.user
                    .updateProfile(self.user)
                    .then(function() {
                        $timeout(function() {
                            self.allowEdit = false;
                        });
                    });
            }

            function removeAddress(address) {
                var query = "?street=" + address.street + "&number=" + address.number;
                return UserProfileApi.deleteAddress(query).then(function successCallback(data) {
                    var index = self.user.profile.address.indexOf(address);
                    console.log(index);
                    self.user.profile.address.splice(index, 1);
                }, function errorCallback(reason) {

                });
            }

            function addAddress() {
                return self.user.profile.address.push({
                    street: undefined,
                    city: undefined,
                    country: undefined,
                    postalCode: undefined,
                    type: undefined,
                    provincy: undefined
                });
            }

            function cancelUpdate() {
                self.allowEdit = false;
                self.user.profile._rollbackValues();
            }
        }

    }
})();
