(function () {
    'use strict';

    var BaseModelModule = angular.module('Nxt.baseModel', []);

    BaseModelModule.service('BaseModel', BaseModel);

    function BaseModel() {

        this.make = function (modelConfig) {

            function NxtModel(data) {
                data = data || {};
                angular.extend(this, angular.copy(data));

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

            // definindo metodos de instancia
            if (modelConfig.instanceMethods) {
                NxtModel.prototype = modelConfig.instanceMethods;
            }

            NxtModel.prototype._getCommittedField = function(field) {
                return this.__commitedValues[field];
            };

            NxtModel.prototype._syncCommitValues = function () {
                var self = this;
                self.__commitedValues = {};
                _.each(modelConfig.enabledUpdateAttributes, function (value) {
                    self.__commitedValues[value] = self[value];
                });
            };

            NxtModel.prototype._commitValues = function () {
                var self = this;
                var changedKeys = _.keys(self._getChangedValues());

                self._syncCommitValues();

                if (typeof modelConfig.onCommitValues === 'function') {
                    modelConfig.onCommitValues.call(this, changedKeys);
                }
            };

            NxtModel.prototype._rollbackValues = function () {
                var self = this;
                _.each(modelConfig.enabledUpdateAttributes, function (value) {
                    self[value] = self.__commitedValues[value];
                });
            };

            NxtModel.prototype._getChangedValues = function () {
                var self = this;
                var changed = {};
                _.each(modelConfig.enabledUpdateAttributes, function (key) {
                    if (!_.isEqual(self[key], self.__commitedValues[key])) {
                        changed[key] = self[key];
                    }
                });
                return changed;
            };

            return NxtModel;
        };

    }

})();