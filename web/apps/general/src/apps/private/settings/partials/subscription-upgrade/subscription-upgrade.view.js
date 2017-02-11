(function() {
    'use strict';

    var dependencies = [];

    angular
        .module('private.views.subscriptionUpgrade', dependencies)
        .controller('SubscriptionUpgradeViewController', SubscriptionUpgradeViewController);

    /** @ngInject */
    function SubscriptionUpgradeViewController(Session) {
        // Private variables
        var self = this;

        // Public variables
        self.viewName = 'Subscription Upgrade';
        console.log(Session);
        self.actual = Session.user.profile.plan.name;



        //BASIC
        self.personalData = false;
        self.emergencyContact = false;
        self.cardPrint = false;
        //STANDARD
        self.personalDataS = false;
        self.emergencyContactS = false;
        self.doctorsS = false;
        self.healthConditionS = false;
        //PREMIUM
        self.personalDataP = false;
        self.emergencyContactP = false;
        self.doctorsP = false;
        self.allergies = false;
        self.medications = false;
        self.healthInsurance = false;
        self.healthConditionP = false;
        self.livingWill = false;
        self.organDononCard = false;
        self.glassesPass = false;

        // Public methods

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
                } else {
                    self.healthConditionS = !self.healthConditionS;
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
                } else {
                    self.glassesPass = !self.glassesPass;
                }
            }
        };

        // Private methods
        return (function init() {})();
    }
})();
