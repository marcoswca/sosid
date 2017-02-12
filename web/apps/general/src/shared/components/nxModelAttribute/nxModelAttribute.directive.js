(function() {
    'use strict';

    var dependencies = [
        'ngMaterial',
        'ngMessages',
        'Nxt.validators',
        'Nxt.utility'
    ];

    angular
        .module('app.shared.components.modelAttribute', dependencies)
        .service('NxValidator', NxValidator)
        .directive('input', inputDirective)
        .directive('nxModelAttribute', nxModelAttributeDirective);

    /** @ngInject */
    function NxValidator($injector) {
        /*jshint validthis:true */

        var validatorPostfix = 'Validator';

        var validators = {};

        function getValidator(validatorName) {
            var realValidatorName;

            if (!validators[validatorName]) {

                realValidatorName = validatorName + validatorPostfix;

                if ($injector.has(realValidatorName)) {
                    validators[validatorName] = $injector.get(realValidatorName);
                } else {
                    return false;
                }

            }

            return validators[validatorName];
        }

        this.getValidator = getValidator;

    }

    function inputDirective(NxValidator) {
        return {
            restrict: 'E',
            require: ['?^mdInputContainer', '?ngModel', '?^nxModelAttribute'],
            link: postLink
        };

        function postLink(scope, element, attrs, ctrls) {
            var mdInputContainer = ctrls[0];
            var ngModel = ctrls[1];
            var nxModelAttribute = ctrls[2];

            if (!nxModelAttribute) {
                return;
            }

            //element.attr('placeholder', 'uninformed');

            nxModelAttribute.ngModel = ngModel;

            var validations, ignoraAllValidations, blackList = [];

            validations = nxModelAttribute.validations;

            // verificando se existe validações para ignorar
            if (attrs['nxIgnoreValidations']) {
                // verifica se é true ignora todas
                if (attrs['nxIgnoreValidations'] === 'true') {
                    ignoraAllValidations = true;
                } else {
                    _.forEach(_.split(attrs['nxIgnoreValidations'], ','), function(value) {
                        blackList.push(_.trim(value));
                    });
                }
            }

            if (!ignoraAllValidations) {
                angular.forEach(validations, function(validatorConfig, validatorName) {

                    if (_.indexOf(blackList, validatorName) !== -1) {
                        return true;
                    }

                    if (validatorConfig.isAsync) {
                        setDebounceDefault();
                        ngModel.$asyncValidators[validatorName] = function(modelValue, viewValue) {
                            var id;

                            // todo: identificar o id da instancia que esta tendo update
                            return validatorConfig.validate(modelValue, id);
                        };

                    } else {
                        var validator = NxValidator.getValidator(validatorName);
                        if (validator) {
                            ngModel.$validators[validatorName] = function validation(modelValue, viewValue) {
                                return validator.validate(modelValue, validatorConfig);
                            };
                        }
                    }
                });
            }

            function setDebounceDefault() {
                var debounceTimeMs = 300;

                if (!ngModel.$options) {
                    ngModel.$options = {
                        debounce: {
                            'default': debounceTimeMs
                        },
                        updateOnDefault: true
                    };
                } else {
                    ngModel.$options.updateOnDefault = ngModel.$options.updateOnDefault || true;
                    ngModel.$options.debounce = angular.extend((ngModel.$options.debounce || {}), {
                        'default': debounceTimeMs
                    });
                }
            }
        }
    }

    function nxModelAttributeDirective($injector) {

        return {
            restrict: 'A',
            require: '?mdInputContainer',
            controller: NxModelAttrCtrl,
            controllerAs: 'nxModelAttrCtrl',
            scope: true,
            compile: function(tEl, tAttrs) {

                var modelName, attributeName;

                // verifica se tem atributo para fazer o split
                // no caso deve definir no md-input-container o atributo da seguinte forma
                // ng-model-attribute="Model:Atributo"
                // ex: ng-model-attribute="Doctor:firstName"
                if (tAttrs['nxModelAttribute']) {
                    var modelAttribute = tAttrs['nxModelAttribute'].split(':');

                    modelName = modelAttribute[0];
                    attributeName = modelAttribute[1];

                    if (!modelName || !attributeName) {
                        return;
                    }
                }

                // todo: verificar se o nome do modelo é valido
                var Model = $injector.get(modelName);

                // todo: verificar se o modelo possui o atributo informado
                var attribute = Model.attributes[attributeName];

                // inclui label caso esteja definido
                if (attribute.label) {
                    if (attribute.phoneNumber) {
                        tEl.prepend('<label style="margin-left:50px" translate="' + getLabelTranslation() + '"></label>');
                    } else if (typeof attribute.label === 'string') {
                        tEl.prepend('<label> ' + attribute.label + ' </label>');
                    } else {
                        tEl.prepend('<label translate="' + getLabelTranslation() + '"></label>');
                    }
                }

                // todo: adicionar placeholder caso esteja definido
                if (!attribute.placeholder) {
                    // todo: usar traducao para o uninformed
                    //tEl.find('input').attr('placeholder', 'uninformed');
                }

                // define aos atributos do elemento as validacoes para serem usadas no controller dessa directiva
                tAttrs.$attr.nxValidations = attribute.validate;

                // criando elemento de mensagens de validação
                var messages = angular.element('<div ng-messages="nxModelAttrCtrl.ngModel.$error" multiple md-auto-hide="auto"></div>');
                // verificando todas as validações e adicionando ao elemento de mensagens
                angular.forEach(attribute.validate, function(value, key) {
                    if (typeof value === 'object') {
                        if (value.message) {
                            if (typeof value.message === 'string') {
                                messages.append('<div ng-message="' + key + '"> ' + value.message + ' </div>');
                            } else {
                                messages.append('<div ng-message="' + key + '" translate="' + getValidationTranslation(key) + '"></div>');
                            }
                        }
                    }
                });

                // adicionando elemento de mensagens ao corpo da directiva
                tEl.append(messages);

                function getValidationTranslation(key) {
                    return 'MODELS.' + _.upperCase(_.snakeCase(modelName)) + '.ATTRIBUTES.' + _.upperCase(_.snakeCase(attributeName)) + '.VALIDATE.' + _.upperCase(_.snakeCase(key));
                }

                function getLabelTranslation() {
                    return 'MODELS.' + _.upperCase(_.snakeCase(modelName)) + '.ATTRIBUTES.' + _.upperCase(_.snakeCase(attributeName)) + '.LABEL';
                }
            }
        };

        /** @ngInject */
        function NxModelAttrCtrl($attrs) {
            var self = this;
            self.validations = $attrs.$attr.nxValidations;
        }
    }
})();
