var dependencies = [];

var module = angular.module('Nxt.utility', dependencies);

module.factory('NxtUtility', function($injector) {

    function modelInstantiate(Model, item) {
        if (typeof Model === 'string') {
            Model = $injector.get(Model);
        }

        return new Model(item);
    }

    return {
        /**
         * @param model to validate
         * @return {boolen} true if given model is a HeraModel and false if its not.
         */
        isModel: function(model) {
            return !!(typeof model === 'function' && model.name === 'NxtModel');
        },

        isNumber: function(value) {
            var type = typeof value;
            return type === 'number' ||
                value && type === 'object' && Object.prototype.toString.call(value) === '[object Number]' || false;
        },

        isNaN: function(value) {
            // `NaN` as a primitive is the only value that is not equal to itself
            // (perform the [[Class]] check first to avoid errors with some host objects in IE)
            return this.isNumber(value) && value !== +value;
        },

        /**
         * @param value the value to validate
         * @returns {boolean} true if the given value is null, undefined, an empty string, NaN returns false
         */
        isEmpty: function(value) {
            if (this.isNaN(value)) {
                return false;
            }
            return !this.notEmpty(value);
        },

        /**
         * @param value the value
         * @returns {boolean} true if the given value is not null, not undefined, not an empty string, NaN returns false
         */
        notEmpty: function(value) {
            if (this.isNaN(value)) {
                return false;
            }
            return angular.isDefined(value) && value !== '' && value !== null;
        },

        has: function(object, key) {
            return object ? Object.prototype.hasOwnProperty.call(object, key) : false;
        },

        /**
         * Checks if a string value starts with a given prefix.
         *
         * @param value the value
         * @param prefix the prefix
         * @returns {boolean} true if the given value starts with the given prefix.
         */
        startsWith: function(value, prefix) {
            return angular.isString(value) &&
                angular.isString(prefix) &&
                value.lastIndexOf(prefix, 0) === 0;
        },

        objByString: function(o, s) {
            s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            s = s.replace(/^\./, ''); // strip a leading dot
            var a = s.split('.');
            for (var i = 0, n = a.length; i < n; ++i) {
                var k = a[i];
                if (k in o) {
                    o = o[k];
                } else {
                    return;
                }
            }
            return o;
        },

        modelInstantiate: modelInstantiate,

        bulkInstantiate: function(Model, list) {

            var _list = [];

            list.forEach(function(item) {
                _list.push(modelInstantiate(Model, item));
            });

            return _list;
        }

    };
});
