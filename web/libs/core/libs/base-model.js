(function(){
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

                this.syncValues();
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

            NxtModel.prototype._updateViewValues = function(values) {
                var self = this;
                _.each(values, function(value, key) {
                    if (_.indexOf(modelConfig.enabledUpdateAttributes, key) > -1) {
                        self[key] = value;
                    }
                });
            };

            NxtModel.prototype.syncValues = function() {
                this.__values = _.pickBy(this, function(value, key) {
                   return (_.indexOf(modelConfig.enabledUpdateAttributes, key) > -1);
                });
            };

            NxtModel.prototype.changedValues = function() {
                var self = this;

                return _.omitBy(self, function(value, key) {
                    if (_.indexOf(modelConfig.enabledUpdateAttributes, key) > -1) {
                        return _.isEqual(value, self.__values[key]);
                    } else {
                        return true;
                    }
                });
            };

            return NxtModel;
        };

    }

})();