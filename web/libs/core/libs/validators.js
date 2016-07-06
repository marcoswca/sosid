var dependencies = ['Nxt.utility'];

var module = angular.module('Nxt.validators', dependencies);

module.factory('emailValidator', function (NxtUtility) {

    // the e-mail pattern used in angular.js
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return {
        name: 'email',

        /**
         * Checks if the value is a valid email address.
         *
         * @param value the value to validate
         * @returns {boolean} true if valid
         */
        validate: function (value) {
            return NxtUtility.isEmpty(value) || EMAIL_REGEXP.test(value);
        }
    };
});

module.factory('lenValidator', function () {

    return {
        name: 'len',
        validate: function (value, validatorObj) {
            var minLength = validatorObj.args[0],
                maxLength = validatorObj.args[1] || 200;

            value = value || '';
            return value.length >= minLength &&
                (maxLength === undefined || value.length <= maxLength) || value.length === 0;
        }
    };

});

module.factory('requiredValidator', function (NxtUtility) {

    return {
        name: 'required',
        validate: function (value) {
            return NxtUtility.notEmpty(value);
        }
    };

});

module.factory('passwordValidator', function(){

    var passwordRegex = /(?=[\s\S]*[a-z][\s\S]*)(?=[\s\S]*[0-9][\s\S]*)/i;

    return {
        name: 'password',
        validate: function(value) {
            value = value || '';
            return (passwordRegex.test(value) || !value);
        }
    };

});