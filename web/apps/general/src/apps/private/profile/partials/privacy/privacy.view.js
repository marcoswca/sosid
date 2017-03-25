(function() {

    'use strict';

    var dependencies = [
        'api.Privacy'
    ];

    angular
        .module('private.views.privacy', dependencies)
        .controller('PrivacyController', PrivacyController);

    /** @ngInject */
    function PrivacyController(PrivacyApi, Session, $mdDialog) {


        var self = this;


        PrivacyApi.get().then(function successCallback(data) {
            self.categories = data;
        }, function errorCallback(reason) {
            console.log(reason);
        });

        self.hide = function() {
            $mdDialog.hide();
        };

        self.hasPlan = function() {
          return Session.user.profile.plan && Session.user.profile.plan.plans;
        };

        self.blockAll = function() {
            self.categories.forEach(function(category, index) {
                self.updatePrivacy(category, {
                    private: true
                });
            });
        };

        self.unBlockAll = function() {
            self.categories.forEach(function(category, index) {
                self.updatePrivacy(category, {
                    private: false
                });
            });
        };

        self.updatePrivacy = function(category, allCategories) {
            var data = {};
            if (allCategories) {
                data = allCategories;
            } else {
                data = {
                    private: !category.private
                };
            }
            PrivacyApi.update(category.id, data).then(function successCallback(success) {
                category.private = data.private;
            }, function errorCallback(reason) {
                console.log(reason);
            });
        };
    }
})();
