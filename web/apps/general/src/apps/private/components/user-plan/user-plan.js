(function() {
    'use strict';

    var dependencies = [];

    angular
        .module('private.components.userPlan', dependencies)
        .directive('userPlan', userPlan);

    /** @ngInject */
    function userPlan() {

        return {
            restrict: 'E',
            scope: true,
            controller: UserPlanCtrl,
            controllerAs: 'UserPlanCtrl',
            templateUrl: 'templates/user-plan.html'
        };

        function UserPlanCtrl(Session) {

            var self = this;

            Date.dateDiff = function(datepart, fromdate, todate) {
                datepart = datepart.toLowerCase();
                var diff = todate - fromdate;
                var divideBy = {
                    w: 604800000,
                    d: 86400000,
                    h: 3600000,
                    n: 60000,
                    s: 1000
                };

                return Math.floor(diff / divideBy[datepart]);
            };

            self.getLocaleDate = getLocaleDate;
            self.user = Session.user;
            self.plan = self.user.profile.plan;
            self.loading = true;

            if (self.plan) {
                var used = Date.dateDiff('d', new Date(self.plan.moreInformations.registration), new Date());
                self.plan.moreInformations.monthsUsed = Math.floor(used / 31);

                var remaining = Date.dateDiff('d', new Date(self.plan.moreInformations.expiration), new Date());
                remaining = Math.abs(remaining);
                self.plan.moreInformations.remainingMonths = Math.floor(remaining / 31);

                self.registration = self.getLocaleDate(self.plan.moreInformations.registration);
                self.plan.moreInformations.expiration = self.getLocaleDate(self.plan.moreInformations.expiration);
                self.loading = false;
            }
            return (function init() {})();

            function getLocaleDate(date) {
                return new Date(date).toLocaleString();
            }
        }
    }
})();
