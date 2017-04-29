(function() {
    'use strict';

    var dependencies = [
        'private.components.mainHeader',
        'private.components.mainFooter'

    ];

    angular
        .module('private.views.master', dependencies)
        .controller('MasterViewController', MasterViewController);

    /** @ngInject */
    function MasterViewController($mdSidenav, $log, Session) {
        
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
        
        // Private variables
        var self = this;

        // Public variables
        self.isLoading = false;

        // Public methods
        self.setLoading = setLoading;
        self.close = close;

        if (Session.user.profile.plan && Session.user.profile.plan.moreInformations.isTrial) {
            self.days = Date.dateDiff('d', new Date(), new Date(Session.user.profile.plan.moreInformations.expiration));
        }
        // Private methods
        return (function init() {

        })();

        function setLoading(status) {
            self.isLoading = status;
        }

        function close() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
                .then(function() {
                    $log.debug("close RIGHT is done");
                });
        }
    }
})();
