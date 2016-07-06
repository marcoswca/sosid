(function () {

    'use strict';

    var dependencies = [];

    angular
        .module('app.shared.components.autocomplete', dependencies)
        .directive('mdAutocomplete', setAutocompleteController)
        .directive('hmMultiAutocomplete', multiAutocompleteDirective)
        .directive('hmAutocomplete', autocompleteDirective);

    /**
     * now if mdAutocomplete is a child of hmAutocomplete it will set his controller into hmAutocomplete controller
     */
    function setAutocompleteController() {
        return {
            require: ['^?hmAutocomplete'],
            link: postLink
        };

        function postLink(scope, element, attrs, ctrls) {
            var hmAutocompleteController = ctrls[0];

            if (hmAutocompleteController) {
                hmAutocompleteController.$mdAutocompleteCtrl = element.controller('mdAutocomplete');
            }
        }
    }

    function setAutocompleteAttributes($scope, $element) {
        /*jshint validthis:true*/

        var self = this;

        self.projectContext = undefined;

        self.container = $element.inheritedData('$hmInputContainerController');

        self.modelAttribute = self.container.modelAttribute;
        self.autocomplete = self.modelAttribute.autocomplete;
        self.placeholder = self.modelAttribute.placeholder;
        self.searchMethod = self.autocomplete.searchMethod;
        self.loadAll = self.autocomplete.loadAll;
        self.value = self.autocomplete.value;
        self.display = self.autocomplete.display;
        self.groupBy = self.autocomplete.groupBy;
        self.groupValue = self.autocomplete.groupValue;
        self.disableSort = self.autocomplete.disableSort;
        self.createFunction = self.autocomplete.create;
        self.disableSearch = self.autocomplete.disableSearch;
        self.searchText = '';

        if (!self.autocomplete) {
            throw new Error('Nao e possivel utilizar autocomplete para um atributo que nao possui configuracoes de autocomplete.');
        }

        self.dictionary = null;
    }

    /**
     * PROJECT SOURCE FUNCTION
     * utilize este paramatro no hm-autocomplete para alterar o projectContext, por exemplo:
     * Exite um outro autocomplete que é de projeto, você seta seu ngModel no projectSource deste autocomplete
     * toda vez que o projeto for alterado, o autocomplete aqui irá recarregar passando este novo projectId como parametro.
     *
     * Esta opção esta sendo utilizada em tipos de eventos e tarefa, pois no load do tipos é preciso enviar o projectId para
     * ser retornado tipos referente aquele projeto.
     */
    function defineProjectSource($scope) {
        /*jshint validthis:true*/
        var self = this;

        if ($scope.hasProjectSource) {
            $scope.$watch('projectSource', function (newValue, oldValue) {
                if (newValue && newValue != self.projectContext) {
                    self.projectContext = $scope.projectSource;
                    self.items = $scope.getAll(true);
                }
            });
        }
    }

    /**
     * DEPENDS ON FUNCTION
     * utilize este parametro caso necessite que o autocomplete seja dependente de outro autocomplete, functiona parecido
     * com o project source, porém passa um segundo parametro para o loadAll com o valor da dapendencia.
     *
     * Esta opção é utilizada por exemplo, no autocomplete de cidades, onde depende de estado.
     */
    function defineDependsOn($scope) {
        /*jshint validthis:true*/
        var self = this;

        if ($scope.hasDependsOn) {
            $scope.$watch('dependsOn', function (newValue, oldValue) {
                if (newValue) {
                    self.items = $scope.getAll(true);
                }
            });
        }
    }


    /** @ngInject */
    function autocompleteDirective($timeout) {
        return {
            restrict: 'E',
            require: '^?hmInputContainer',
            scope: {
                hasClearMethod: '@clearMethod',
                clearMethod: '=',
                mdAutoFocus: '=',
                ngModel: '=',
                groupValue: '=',
                selectedObject: '=',
                hasSelectedObject: '@selectedObject',
                hasWatchItems: '@watchItems',
                watchItems: '=',
                hasFilteredItems: '@filteredItems',
                filteredItems: '=',
                dependsOn: '=',
                hasDependsOn: '@dependsOn',
                projectSource: '=',
                hasProjectSource: '@projectSource',
                hasExternalItems: '@externalItems',
                externalItems: '=',
                readonly: '='
            },
            controller: AutocompleteCtrl,
            controllerAs: 'ctrl',
            templateUrl: 'templates/autocomplete.html'
        };

        /** @ngInject */
        function AutocompleteCtrl($scope, $element, NxtUtility, $q, $mdDialog) {

            var self = this;
            var lastGroupCheck;

            //basic attributes
            setAutocompleteAttributes.call(this, $scope, $element);

            // project source handler
            defineProjectSource.call(this, $scope);

            // dependency handler
            defineDependsOn.call(this, $scope);


            self.items = getAll(true);
            self.noCache = true;
            self.searchTextChange = searchTextChange;
            self.selectedItemChange = selectedItemChange;
            self.filter = filter;
            self.create = create;
            $scope.getAll = getAll;

            if ($scope.hasClearMethod) {
                $scope.clearMethod = clearModelValue;
            }

            function create($event) {
                var confirm = $mdDialog.confirm()
                    .title('Adicionar "' + self.searchText + '" como nova financiadora?')
                    .content('Ao adiciona-la, todos os usuários a terão como nova opção na listagem de financiadoras.')
                    .ariaLabel('Nova Financiadora')
                    .ok('Sim, cadastrar.')
                    .cancel('Cancelar')
                    .targetEvent($event);

                $mdDialog.show(confirm).then(function () {
                    self.disabled = true;

                    self.items = getAll(true);

                    self.createFunction(self.searchText)
                        .then(function (result) {
                            var f = result.data.data;

                            self.container.ngModel.$setViewValue(f.id);
                            self.container.ngModel.$render();

                            self.items = getAll(true);

                            self.disabled = false;

                            self.$mdAutocompleteCtrl.hidden = true;


                        });
                });
            }


            /** watching the container.inputElement */
            var inputElementWatch = $scope.$watch(getInputElement, onInputElement);

            /** used to watch the container.inputElement */
            function getInputElement() {
                return self.container.inputElement;
            }

            /** verify if the input element is found and make the magic to suggestions appear on focus **/
            function onInputElement(inputElement) {
                if (inputElement) {

                    if (self.disableSearch) {
                        inputElement.attr('readonly', true);
                    }

                    angular.element(inputElement).on('focus', function () {
                        //Deve aparecer sugestões ao focar o input, mesmo quando algo estiver selecionado.
                        if (self.searchText && self.searchText.length > 0 && self.selectedItem) {
                            openSuggestions();
                        }
                    });

                    self.$mdAutocompleteCtrl.mouseUp = function(){
                        $timeout(function(){ inputElement.focus(); });
                    };

                    //unbind watch we just need to get the inputElement once.
                    inputElementWatch();
                }
            }

            /** open suggestions if you click on element */
            $element.on('mousedown', function () {
                if (self.$mdAutocompleteCtrl.hidden) {
                    openSuggestions();
                }
            });

            /** md-autocomplete hack to make the suggestions appear */
            function openSuggestions() {
                // do not allow open suggetions if the container is disabled.
                if (!self.container.disabled) {
                    filter(self.searchText)
                        .then(function (items) {
                            if (!_.isEmpty(items)) {
                                self.$mdAutocompleteCtrl.matches = items;
                                self.$mdAutocompleteCtrl.hidden = false;
                            }
                        });
                }
            }

            /** watching model value change **/
            var modelValueWatch = $scope.$watch(getModelValue, selectItem);

            /** used to watch if model value changes */
            function getModelValue() {
                return self.container.ngModel.$modelValue;
            }

            /** select the item by the value */
            function selectItem(value) {
                if (!self.selectedItem || value !== self.selectedItem.value) {
                    self
                        .items
                        .then(function (items) {
                            _.forEach(items, function (item) {
                                if (item.value === value) {
                                    self.selectedItem = item;
                                }
                            });
                        });
                }
            }

            /** on this scope destroy executes cleanUp */
            $scope.$on('$destroy', cleanup);

            // clean the watchers
            function cleanup() {
                modelValueWatch();
            }

            function selectedItemChange(item) {
                var value = (item) ? item.value : null;
                if (value || value === 0) {
                    if ($scope.hasSelectedObject) {
                        $scope.selectedObject = item.values;
                    }
                    $scope.groupValue = item.groupValue;
                    isValidSelection(true);
                    self.container.ngModel.$setViewValue(value);
                    self.container.ngModel.$render();
                }
            }

            function isValidSelection(status) {
                self.container.ngModel.$setValidity('invalidSelection', status);
            }

            function clearModelValue() {
                self.searchText = '';
                self.container.ngModel.$setViewValue(null);
                self.container.ngModel.$render();
            }

            function searchTextChange(query) {
                // Validação
                isValidSelection(!query);
                clearModelValue();

                if (!query && self.searchMethod) {
                    self.items = getAll(false);
                }

                if (query && self.searchMethod) {
                    self.items = self.searchMethod(query)
                        .then(function (data) {
                            return mountReturn(data.results);
                        });
                }
            }

            function filter(query) {

                if (self.searchMethod) {
                    return self.items;
                }

                return self.items
                    .then(function () {
                        var _items = (self.disableSort && self.searchText !== '' && self.searchText.replace(' ','').length > 3) ? self.dictionary.suggestItems(query) : self.dictionary.suggestSortItemsBySuggestion(query, {minWordSize:1});
                        if ($scope.hasFilteredItems) {
                            $scope.filteredItems = _items;
                        }
                        return builkUpdateItemShowGroup(_items);
                    });
            }


            function builkUpdateItemShowGroup(items) {
                if (self.groupBy) {
                    return items.map(function (item) {
                        return updateItemShowGroup(item);
                    });
                }
                else {
                    return items;
                }
            }

            function updateItemShowGroup(item) {
                item.showGroup = (lastGroupCheck !== item.groupName);
                lastGroupCheck = item.groupName;
                return item;
            }

            // if selected is true, it will selected the item that matchs if ng-model
            function getAll(selected) {

                // If this autocomplete has a dependency, return nothing in case of dependency is null.
                if ($scope.hasDependsOn && NxtUtility.isEmpty($scope.dependsOn)) {
                    return $q.when();
                }

                // if has external items it return these items instead of loadAll function;
                if ($scope.hasExternalItems) {
                    if (_.isEmpty($scope.externalItems)) {
                        return $q.when();
                    } else {
                        return $q
                            .when($scope.externalItems)
                            .then(function (items) {
                                return mountReturn(items, selected);
                            });
                    }
                }

                return self
                    .loadAll(self.projectContext, $scope.dependsOn)
                    .then(function (items) {
                        if ($scope.hasWatchItems) {
                            $scope.watchItems = items;
                        }
                        return mountReturn(items, selected);
                    });
            }

            // if selected is true, it will selected the item that matchs if ng-model
            function mountReturn(items, selected) {

                self.dictionary = new HmAutoCompleteDictionary_();

                if (self.groupBy) {
                    items = _.sortBy(items, function (_item) {
                        return NxtUtility.objByString(_item, self.groupBy);
                    });
                }

                var foundSelectedItem = false, mappedItems;

                mappedItems = _.map(items, function (_item) {
                    var item = {
                        value: _item[self.value],
                        display: NxtUtility.objByString(_item, self.display),
                        values: _item
                    };

                    if (self.groupBy) {
                        item.groupName = NxtUtility.objByString(_item, self.groupBy);
                    }

                    if (self.groupValue) {
                        item.groupValue = NxtUtility.objByString(_item, self.groupValue);
                    }

                    // selecionar um valor de acordo com o valor que veio do ngModel
                    if (selected && (item.value === self.container.ngModel.$modelValue)) {

                        foundSelectedItem = true;

                        $timeout(function () {
                            self.selectedItem = item;
                        });
                    }

                    return item;
                });

                // Se está setado para selecionar um valor  e não encontrou o item correspondente;
                // Deve setar a seleção como invalida;
                if (selected && !foundSelectedItem && self.container.ngModel.$modelValue) {
                    clearModelValue();
                    $scope.$$childHead.$mdAutocompleteCtrl.clear();

                    if ($scope.hasDependsOn) {
                        $scope.$$childHead.$mdAutocompleteCtrl.focus();
                    }
                }



                self.dictionary.bulkAddItems(mappedItems, 'display');

                return mappedItems;
            }

        }

    }

    /** @ngInject */
    function multiAutocompleteDirective() {
        return {
            restrict: 'E',
            require: '^?hmInputContainer',
            scope: {
                ngModel: '=',
                groupValue: '=',
                selectedObject: '=',
                watchItems: '=',
                dependsOn: '=',
                hasDependsOn: '@dependsOn',
                projectSource: '=',
                hasProjectSource: '@projectSource',
                onAppend: '=',
                onRemove: '='
            },
            controller: MultiAutocompleteCtrl,
            controllerAs: 'ctrl',
            templateUrl: 'templates/multi-autocomplete.html'
        };

        /** @ngInject */
        function MultiAutocompleteCtrl($scope, $element, NxtUtility, $q) {
            var self = this;

            //basic attributes
            setAutocompleteAttributes.call(this, $scope, $element);

            // project source handler
            defineProjectSource.call(this, $scope);

            // dependency handler
            defineDependsOn.call(this, $scope);

            // public attributes
            self.noCache = true;
            self.items = getAll(true);
            self.search = search;
            self.selectedItemChange = selectedItemChange;
            self.filter = filter;
            self.onRemove = onRemove;
            self.onAppend = onAppend;

            $scope.getAll = getAll;

            function onRemove(chip, index) {
                if ($scope.onRemove) {
                    $scope.onRemove(chip, index);
                }
            }

            function onAppend(chip, index) {
                if ($scope.onAppend) {
                    $scope.onAppend(chip, index);
                }

                return chip;
            }

            function selectedItemChange(item) {
            }

            function search(query) {
                // se nao foi configurado searchMethod no model, a busca é feita pelo angular
                if (!self.searchMethod) {
                    return;
                }

                if (!query) {
                    self.items = getAll(false);
                }

                if (query) {
                    self.items = self.searchMethod(query)
                        .then(function (data) {
                            return mountReturn(data.results);
                        });
                }
            }

            function filter(query) {

                if (self.searchMethod) {
                    return self.items;
                }

                return self.items
                    .then(function () {
                        var _items = (self.disableSort) ? self.dictionary.suggestItems(query) : self.dictionary.suggestSortItemsBySuggestion(query, {minWordSize:1});
                        return _.filter(_items, function(item){
                            return !isOnSelectedList(item);
                        });
                    });
            }

            // if selected is true, it will selected the item that matchs if ng-model
            function getAll(selected) {

                // If this autocomplete has a dependency, return nothing in case of dependency is null.
                if ($scope.hasDependsOn && NxtUtility.isEmpty($scope.dependsOn)) {
                    return $q.when();
                }

                return self
                    .loadAll(self.projectContext, $scope.dependsOn)
                    .then(function (items) {
                        $scope.watchItems = items;
                        return mountReturn(items, selected);
                    });
            }

            function mountReturn(items, selected) {

                self.dictionary = new HmAutoCompleteDictionary_();

                if (self.groupBy) {
                    items = _.sortBy(items, function (_item) {
                        return NxtUtility.objByString(_item, self.groupBy);
                    });
                }

                var mappedItems;

                mappedItems = _.map(items, function (_item) {
                    var item = {
                        value: _item[self.value],
                        display: NxtUtility.objByString(_item, self.display),
                        values: _item
                    };

                    return item;
                });

                self.dictionary.bulkAddItems(mappedItems, 'display');

                return mappedItems;
            }

            // imposibilita mostrar como resultado um item já selecionado
            function isOnSelectedList(item) {
                var list = _.pluck($scope.ngModel, 'value');
                return (list.indexOf(item.value) > -1);
            }
        }

    }

})();