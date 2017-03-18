(function() {
    'use strict';

    var dependencies = ['model.plan', 'ngCookies'];

    angular
        .module('private.views.subscriptionUpgrade', dependencies)
        .controller('SubscriptionUpgradeViewController', SubscriptionUpgradeViewController);

    /** @ngInject */
    function SubscriptionUpgradeViewController(Session, Plan, $cookies) {
        // Private variables
        var self = this;

        // Public variables
        self.viewName = 'Subscription Upgrade';

        if (Session.user.profile.plan) {
            self.actual = Session.user.profile.plan.name;
        }

        self.getPlans = function() {
            Plan.getAll().then(function successCallback(data) {
                self.plans = data;
            }, function errorCallback(reason) {
                // body...
            });
        };

        self.getPlans();

        self.upgradePlan = function(planName) {
            self.plans.forEach(function(planInstance, index) {
                if (planInstance.name.trim().toLowerCase() === planName) {
                    mountCart(planInstance);
                }
            });
        };

        function mountCart(planInstance) {
            var object = {
                description: planInstance.name,
                quantity: 1,
                price: planInstance.plans.price,
                isPlan: true,
                id: planInstance.id
            };

            self.shoppingCart = {
                cartId: 1,
                amount: planInstance.plans.price,
                items: [object],
                token: $cookies.get('sessionToken'),
                cartBlock: true
            };
            $cookies.putObject('cart', self.shoppingCart);
            window.open("http://35.156.122.23/store/#/commerce/cart/", "_blank");
        }

        self.changeExibition = function(type, number) {
            if (type == 'basic') {
                if (number == '1') {
                    self.personalData = !self.personalData;
                } else if (number == '2') {
                    self.emergencyContact = !self.emergencyContact;
                } else {
                    self.cardPrint = !self.cardPrint;
                }
            } else if (type == 'standard') {
                if (number == '1') {
                    self.personalDataS = !self.personalDataS;
                } else if (number == '2') {
                    self.emergencyContactS = !self.emergencyContactS;
                } else if (number == '3') {
                    self.doctorsS = !self.doctorsS;
                } else if (number == '4') {
                    self.healthConditionS = !self.healthConditionS;
                } else {
                    self.cardPrintStd = !self.cardPrintStd;
                }
            } else {
                if (number == '1') {
                    self.personalDataP = !self.personalDataP;
                } else if (number == '2') {
                    self.emergencyContactP = !self.emergencyContactP;
                } else if (number == '3') {
                    self.doctorsP = !self.doctorsP;
                } else if (number == '4') {
                    self.allergies = !self.allergies;
                } else if (number == '5') {
                    self.medications = !self.medications;
                } else if (number == '6') {
                    self.healthInsurance = !self.healthInsurance;
                } else if (number == '7') {
                    self.healthConditionP = !self.healthConditionP;
                } else if (number == '8') {
                    self.livingWill = !self.livingWill;
                } else if (number == '9') {
                    self.organDononCard = !self.organDononCard;
                } else if (number == '10') {
                    self.glassesPass = !self.glassesPass;
                } else {
                    self.cardPrintPr = !self.cardPrintPr;
                }
            }
        };

        // Private methods
        return (function init() {})();
    }
})();
