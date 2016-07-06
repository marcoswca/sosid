(function () {
    'use strict';

    var dependencies = [
        'Nxt.validators',
        'Nxt.utility'
    ];

    angular
        .module('app.shared.components.input', dependencies)
        .service('hmValidation', hmValidation)
        .directive('hmInputContainer', hmInputContainerDirective)
        .directive('input', inputDirective)
        .directive('textarea', inputDirective)
        .directive('hmFormConfig', hmFormConfigDirective)
        .directive('mdRadioGroup', setElementToContainer)
        .directive('mdCheckbox', setElementToContainer)
        .directive('mdSwitch', setElementToContainer)
        .directive('hmAutocomplete', setNgModelToContainer)
        .directive('hmMultiAutocomplete', setNgModelToContainer)
        .directive('customValidationMessages', customValidationMessages)
        .directive('mdSelect', setElementToContainer)
        .directive('newInputContainerCss', newInputContainerCss);

    function newInputContainerCss() {
        return {
            restrict: 'A',
            controller: newInputContainerCssController
        };

        function newInputContainerCssController($scope) {
        }
    }

    function customValidationMessages() {
        return {
            restrict: 'A',
            require: '^hmInputContainer',
            scope: {
                messages: '=customValidationMessages'
            },
            link: postLink
        };

        function postLink(scope, element, attrs, inputContainer) {
            inputContainer.customValidationMessages = scope.messages;
        }
    }

    /** @ngInject */
    function hmFormConfigDirective($parse) {
        return {
            restrict: 'A',
            scope: {
                hmFormConfig: '='
            },
            controller: FormController
        };

        function FormController($scope, $attrs) {

            var config = $scope.hmFormConfig;

            this.isFormTypeCreate = config.isCreate;

            this.permissionInAction = true;

            this.hmFormSubmit = $parse(config.submit, null, true);

            this.instance = config.instance;

        }
    }

    /** @ngInject */
    function hmValidation($injector) {
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

    // seta o element e ngModel no container
    function setElementToContainer() {
        return {
            restrict: 'E',
            require: ['^?hmInputContainer', '?^ngModel'],
            link: postLink
        };

        function postLink(scope, element, attr, ctrls) {
            var containerCtrl = ctrls[0];
            var ngModelController = ctrls[1];
            var isReadonly = angular.isDefined(attr.readonly);

            if (!containerCtrl) {
                return;
            }

            if (containerCtrl.inputElement) {
                return;
            }

            if (containerCtrl) {

                var prefix = Math.floor((Math.random() * 999) + 1) + '_';
                element.attr('id', prefix + containerCtrl.fieldName);

                containerCtrl.inputElement = element;
                containerCtrl.ngModel = ngModelController;
            }
        }
    }

    // seta o element e ngModel no container
    function setNgModelToContainer() {
        return {
            restrict: 'E',
            require: ['^?hmInputContainer', '?ngModel'],
            link: postLink
        };

        function postLink(scope, element, attr, ctrls) {
            var containerCtrl = ctrls[0];
            var ngModelController = ctrls[1];

            if (containerCtrl && ngModelController) {
                containerCtrl.ngModel = ngModelController;
            }
        }
    }

    function inputDirective($translate) {

        return {
            restrict: 'E',
            require: ['^?hmInputContainer', '^ngModel', '^?hmAutocomplete', '^?hmMultiAutocomplete'],
            link: postLink
        };

        function postLink(scope, element, attr, ctrls) {
            var containerCtrl = ctrls[0];
            var ngModelController = ctrls[1];
            var autocompleteController = ctrls[2];
            var multiAutocompleteController = ctrls[3];
            var isReadonly = angular.isDefined(attr.readonly);

            if (!containerCtrl) {
                return;
            }

            if (containerCtrl.inputElement) {
                return;
            }

            if (!autocompleteController && !multiAutocompleteController) {
                setPlaceholder();

                containerCtrl.inputElement = element;

                if (ngModelController) {
                    containerCtrl.ngModel = ngModelController;
                }
                containerCtrl.isInput = true;

                //setValidations();

                if (!isReadonly) {
                    element
                        .on('focus', function (ev) {
                            containerCtrl.setFocused(true);
                        })
                        .on('blur', function (ev) {
                            containerCtrl.setFocused(false);
                            containerCtrl.submit();
                        });
                }
            }

            function setPlaceholder() {
                element.attr('aria-label', 'input');
                if (!element.attr('placeholder') && containerCtrl.modelAttribute) {
                    if (!containerCtrl.modelAttribute.placeholder) {
                        throw new Error('<hm-input-container> atributo do model não possui placeholder');
                    }

                    $translate(containerCtrl.modelAttribute.placeholder)
                        .then(function(placeholder) {
                            element.attr('placeholder', placeholder);
                        })
                        .catch(function(placeholder) {
                            element.attr('placeholder', placeholder);
                        });

                }

                var prefix = Math.floor((Math.random() * 999) + 1) + '_';
                element.attr('id', prefix + containerCtrl.fieldName);
            }

            if (autocompleteController || multiAutocompleteController) {
                setPlaceholder();
                containerCtrl.inputElement = element;
                containerCtrl.isInput = true;
            }

        }

    }

    function hmInputContainerDirective($injector, $templateCache, NxtUtility, $timeout) {

        var inputContainerTemplate = $templateCache.get('templates/input-container.html');

        return {
            restrict: 'E',
            require: ['?^hmFormConfig', '?^form', '?^newInputContainerCss'],
            replace: true,
            scope: true,
            bindToController: {
                customAttributes: '='
            },
            controller: ContainerController,
            controllerAs: 'container',
            compile: function (tEl, tAttrs) {

                var internalContentTag, mdInputContainer, inputContainer, mdInputTags;

                internalContentTag = tEl[0].children[0].tagName;

                inputContainer = angular.element(inputContainerTemplate);

                inputContainer.find('main').prepend(tEl.contents());

                //TODO: adicionar funcao de inline
                //if (tAttrs.hmInline === 'true') {
                //    inputContainer.addClass('inline');
                //
                //    angular.element(inputContainer.find('label')).attr('flex', '');
                //
                //    //inputContainer[0].children[1] == <div class="input-not-inline-position"></div>
                //    angular.element(inputContainer[0].children[1]).append(inputContainer.find('main'));
                //}

                /** TRATAMENTO PARA INPUT E TEXTAREA */
                // caso o conteudo interno da diretiva seja input ou textarea ativa o md-input-container

                mdInputTags = ['INPUT', 'TEXTAREA'];

                if (mdInputTags.indexOf(internalContentTag) > -1) {
                    mdInputContainer = angular.element('<md-input-container md-no-float flex></md-input-container>');

                    mdInputContainer.html(inputContainer.find('main').html());

                    inputContainer.find('main').replaceWith(mdInputContainer);
                }

                /** FIM DE TRATAMENTO */

                /** TRATAMENTO PARA AUTOCOMPLETE */
                    // caso o conteudo interno da diretiva seja input ou textarea ativa o md-input-container

                mdInputTags = ['HM-AUTOCOMPLETE'];

                if (mdInputTags.indexOf(internalContentTag) > -1) {
                    inputContainer.find('main').replaceWith(inputContainer.find('main').html());
                }

                /** FIM DE TRATAMENTO */

                tEl.append(inputContainer);

                return postLink;

            }
        };

        function postLink(scope, element, attrs, ctrls) {
            var hmForm = ctrls[0];
            var form = ctrls[1];
            var newInputContainerCss = ctrls[2];

            element.addClass('flex');

            scope.form = form;

            if (hmForm) {
                scope.isFormTypeCreate = !!hmForm.isFormTypeCreate;
                scope.formSubmit = hmForm.hmFormSubmit;
                scope.permissionInAction = hmForm.permissionInAction;
                scope.formInstance = hmForm.instance;
            } else {
                scope.isFormTypeCreate = true;
                scope.permissionInAction = true;
            }

            if (attrs.hmDisabled) {
                scope.permissionInAction = false;
            }

            if (newInputContainerCss) {
                scope.newInputContainerCss = true;
            }

        }

        /** @ngInject */
        function ContainerController($scope, $element, $attrs, hmValidation, $translate) {
            var self = this;

            // pre signed values
            self.submitted = false;
            var label = $attrs['label'];
            self.noLabel = $attrs['noLabel'];
            self.smallLabel = $attrs['smallLabel'];

            var modelName = $attrs['forModel'];

            var inputContainer = angular.element($element[0].firstChild);

            var configLabel = function configLabel(label) {
                if (!self.noValidation && self.modelAttribute && self.modelAttribute.validate && self.modelAttribute.validate.hasOwnProperty('required')) {
                    self.label = label + '*';
                } else {
                    self.label = label;
                }
            };

            // case its for model
            if (modelName || self.customAttributes) {


                if (modelName) {
                    var Model = $injector.get(modelName);

                    self.noValidation = $attrs['noValidation'];

                    self.fieldName = $attrs['andAttribute'];
                    self.setLoading = isLoading;

                    self.modelAttribute = Model.attributes[self.fieldName];

                } else {
                    self.modelAttribute = self.customAttributes;
                }

                self.validationMessages = self.modelAttribute.validate;
                label = self.modelAttribute.label;

                // setando mensagens personalisadas de validações;
                var unbindCustomValidationWatch = $scope.$watch(function(){
                    return self.customValidationMessages;
                }, function(){
                    if (self.customValidationMessages) {

                        if (!self.validationMessages) {
                            self.validationMessages = {};
                        }

                        angular.extend(self.validationMessages, self.customValidationMessages);

                        _.each(self.validationMessages, function(validation) {
                            $translate(validation.message)
                                .then(function(message) {
                                    validation.message = message;
                                });
                        });
                    }

                    // tecnica para remover este watch no primeiro uso, pois eu preciso que ele rode apenas uma vez.;
                    unbindCustomValidationWatch();

                });

                _.each(self.validationMessages, function(validation) {
                    $translate(validation.message)
                        .then(function(message) {
                            validation.message = message;
                        });
                });
            }

            $translate(label)
                .then(function(label) {
                    configLabel(label);
                })
                .catch(function(label) {
                    configLabel(label);
                });

            self.setFocused = function (isFocused) {
                $timeout(function(){
                    self.focused = !!isFocused;
                    inputContainer.toggleClass('hm-input-focused', !!isFocused);
                });
            };

            self.buttonType = function () {

                if (self.isLoading) {
                    return 'loading';
                }

                if (self.submitted) {
                    return 'submitted';
                }

                if (self.ngModel && self.ngModel.$dirty && self.ngModel.$valid && !$scope.isFormTypeCreate && self.isInput && self.focused) {
                    return 'submit';
                }

                if (self.ngModel && self.ngModel.$pristine && !self.focused && $scope.permissionInAction && self.isInput && !$scope.isFormTypeCreate) {
                    return 'edit';
                }

            };

            self.focus = function () {
                $timeout(function(){
                    self.inputElement.focus();
                });
            };

            self.submit = function () {
                if (self.ngModel.$dirty && !$scope.isFormTypeCreate && $scope.form.$valid) {
                    isLoading(true);
                    $timeout(function(){
                        if ($scope.form.$valid) {
                            $scope.formSubmit($scope)
                                .then(function () {
                                    isLoading(false);
                                    $scope.form.$setPristine();
                                    self.ngModel.$setPristine();
                                    self.submitted = true;
                                    $timeout(function () {
                                        self.submitted = false;
                                    }, 1000);
                                });
                        } else {
                            isLoading(false);
                        }
                    }, 300);
                }
            };

            // submit on change
            $scope.$watch(function () {
                return (self.ngModel && self.ngModel.$modelValue);
            }, function () {
                if (self.ngModel) {
                    if (!self.focused && self.ngModel.$dirty || (self.ngModel.$dirty && (self.ngModel.$modelValue instanceof Array) === true)) {
                        self.submit();
                    }
                }
            }, true);

            function isLoading(status) {
                self.isLoading = status;
                if (status) {
                    self.inputElement.attr('disabled', 'disabled');
                } else {
                    self.inputElement.attr('disabled', '');
                }
            }

            $scope.$watch(function () {
                return self.inputElement;
            }, function (hasInput) {
                if (hasInput) {
                    self.labelFor = self.inputElement.attr('id');
                    if (!$scope.permissionInAction) {
                        self.inputElement.attr('disabled', 'disabled');
                        self.inputElement.addClass('no-permission');
                        self.inputElement.attr('placeholder', 'Não definido');
                    }
                }
            });

            $scope.$watch(function () {
                return self.ngModel;
            }, function (hasNgModel) {
                if (hasNgModel) {
                    if (!self.noValidation && self.modelAttribute) {
                        setValidations();
                    }
                }
            });

            function setDebounceDefault() {
                var debounceTimeMs = 300;

                if (!self.ngModel.$options) {
                    self.ngModel.$options = {
                        debounce: {
                            'default': debounceTimeMs
                        },
                        updateOnDefault: true
                    };
                } else {
                    self.ngModel.$options.updateOnDefault = self.ngModel.$options.updateOnDefault || true;
                    self.ngModel.$options.debounce = angular.extend((self.ngModel.$options.debounce || {}), { 'default': debounceTimeMs });
                }
            }

            function setValidations() {

                var validations = self.modelAttribute.validate;



                if (validations) {

                    angular.forEach(validations, function (validatorConfig, validatorName) {

                        if (validatorConfig.isAsync) {
                            setDebounceDefault();
                            self.ngModel.$asyncValidators[validatorName] = function (modelValue, viewValue) {
                                var id;
                                if ($scope.formInstance) {
                                    id = $scope.formInstance.id;
                                }
                                return validatorConfig.validate(modelValue, id);
                            };

                        } else {
                            var validator = hmValidation.getValidator(validatorName);
                            if (validator) {
                                self.ngModel.$validators[validatorName] = function validation(modelValue, viewValue) {
                                    return validator.validate(modelValue, validatorConfig);
                                };
                            }
                        }

                    });
                }

            }

        }
    }
})();
