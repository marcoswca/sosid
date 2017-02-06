(function() {
    'use strict';

    var BaseModelModule = angular.module('Nxt.baseModel', []);

    BaseModelModule.service('BaseModel', BaseModel);

    function BaseModel() {

        this.make = function(modelConfig) {

            function NxtModel(data) {
                data = data || {};

                var self = this;

                _.each(modelConfig.attributes, function(attrOptions, attrName) {
                    var value = angular.copy(data[attrName]);

                    if (attrOptions.isDate && value) {
                        value = new Date(value);
                    }

                    Object.defineProperty(self, attrName, {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: value || attrOptions.defaultValue
                    });

                    if (attrOptions.set) {
                        Object.defineProperty(self, attrName, {
                            set: attrOptions.set
                        });
                    }

                    if (attrOptions.get) {
                        Object.defineProperty(self, attrName, {
                            get: attrOptions.get
                        });
                    }
                });

                // todo: criar relationships
                angular.extend(this, angular.copy(_.omit(data, _.keysIn(modelConfig.attributes))));

                if (typeof modelConfig.onInstance === 'function') {
                    modelConfig.onInstance.call(this);
                }

                this._syncCommitValues();
            }

            //Adicionando metodos da API como metodos de classe
            angular.extend(NxtModel, modelConfig.api);

            //Adicionando os metodos de classe da configuracao
            angular.extend(NxtModel, modelConfig.classMethods);

            // adicionando os atributos
            NxtModel.attributes = modelConfig.attributes;
            NxtModel.attributesNames = _.keysIn(modelConfig.attributes);
            NxtModel.attributesNamesUpdatable = _.keysIn(_.omitBy(modelConfig.attributes, {
                updateDisabled: true
            }));

            NxtModel.prototype.toJSON = function() {
                return _.omit(this, ['__commitedValues', '__enabledUpdateAttributes']);
            };

            NxtModel.prototype._getCommittedField = function(field) {
                return this.__commitedValues[field];
            };

            NxtModel.prototype._syncCommitValues = function() {
                var self = this;
                self.__commitedValues = {};
                _.each(NxtModel.attributesNamesUpdatable, function(value) {
                    self.__commitedValues[value] = self[value];
                });
            };

            NxtModel.prototype._commitValues = function() {
                var self = this;
                var changedKeys = _.keys(self._getChangedValues());

                self._syncCommitValues();

                if (typeof modelConfig.onCommitValues === 'function') {
                    modelConfig.onCommitValues.call(this, changedKeys);
                }
            };

            NxtModel.prototype._rollbackValues = function() {
                var self = this;
                _.each(NxtModel.attributesNamesUpdatable, function(value) {
                    self[value] = self.__commitedValues[value];
                });
            };

            NxtModel.prototype._getChangedValues = function() {
                var self = this;
                var changed = {};
                _.each(NxtModel.attributesNamesUpdatable, function(key) {
                    if (!_.isEqual(self[key], self.__commitedValues[key])) {
                        changed[key] = self[key];
                    }
                });
                return changed;
            };

            NxtModel.prototype.create = function() {
                var self = this;
                console.log(this);
                console.log(modelConfig);
                return modelConfig.api
                    .create(this)
                    .then(function(createdDoctor) {
                      console.log(createdDoctor);
                        self.id = createdDoctor.id || createdDoctor.data.id;
                        self._syncCommitValues();
                    });
            };

            NxtModel.prototype.update = function() {
                var self = this;

                var changedValues = self._getChangedValues();

                return modelConfig.api
                    .update(self.id, changedValues)
                    .then(function() {
                        self._commitValues();
                    });
            };

            NxtModel.prototype.save = function() {
                return (!this.id) ? this.create() : this.update();
            };

            NxtModel.prototype.remove = function() {
                return modelConfig.api
                    .remove(this.id);
            };

            if (_.isObject(modelConfig.instanceMethods)) {
                angular.extend(NxtModel.prototype, modelConfig.instanceMethods);
            }

            return NxtModel;
        };

    }

})();
