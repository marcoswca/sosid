
var dependencies = ['Nxt.validators'];

var module = angular.module('Nxt.validation', dependencies);

module.service('NxtValidation', function ($injector, $log) {

    var validatorPostfix = 'Validator';

    var validators = {};

    function getValidator(validatorName) {
        if (!validators[validatorName]) {

            var realValidatorName = validatorName + validatorPostfix;

            if ($injector.has(realValidatorName)) {

                var validator = $injector.get(validatorName + validatorPostfix);
                validators[validatorName] = validator;

            }
        }

        return validators[validatorName];
    }

    this.getValidator = getValidator;

    this.bulkValidate = function (validations, value, fieldName) {

        var validationResults = [];

        // caso alguma validação nao passe, esta variavel ficará false.
        var fieldIsValid = true;

        // para cada atributo de validate
        angular.forEach(validations, function (validatorObj, validatorName) {
            var validator = getValidator(validatorName);

            if (angular.isUndefined(validator)) {
                $log.warn('No validator defined for \'' + validatorName +
                '\'. Can not validate field \'' + fieldName + '\'');
                return;
            }

            var valid = validator.validate(value, validatorObj);

            var validationResult = {
                valid: valid,
                message: validatorObj.message,
                value: value,
                field: fieldName,
                validator: validatorName
            };

            // adiciona este resultado no Array de resultados
            validationResults.push(validationResult);

            fieldIsValid = fieldIsValid && valid;

        });

        return {
            valid: fieldIsValid,
            validationResults: validationResults.length === 0 ? undefined : validationResults
        };

    };
});