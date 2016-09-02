(function () {

    'use strict';

    var HTTP_STATUS_NOT_FOUND = 404,
        HTTP_STATUS_UNAUTHORIZED = 401,
        HTTP_STATUS_FORBIDDEN = 403,
        NO_HTTP_STATUS = 0;

    var dependencies = ['core.config','ngCookies'];

    angular
        .module('core.api.ApiService', dependencies)
        .service('ApiService', ApiService)
        .service('NegativeStatusHandler', NegativeStatusHandler)
        .config(config);

    /** @ngInject */
    function config($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push('NegativeStatusHandler');
    }

    /** @ngInject */
    function NegativeStatusHandler($q, $window, APP_CONFIG, $cookies) {

        return {
            request: function(config) {
                var token = $cookies.get('sessionToken');
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }

                return config;
            },
            responseError: function (response) {

                if (response.status === HTTP_STATUS_NOT_FOUND) {
                    // do something
                }

                if (response.status === HTTP_STATUS_UNAUTHORIZED) {
                    if ($window.location.pathname !== '/login') {
                        //$window.location = APP_CONFIG.APP_URL + '/login';
                    }
                }

                if (response.status === HTTP_STATUS_FORBIDDEN) {
                    // do something
                }

                if (response.status === NO_HTTP_STATUS) {
                    // do something
                }

                return $q.reject(response);
            }
        };

    }

    /** @ngInject */
    function ApiService($http, $q, $log) {

        function _http(methodName, options) {

            var cache = false;

            var deferred = $q.defer();

            var promise = deferred.promise;

            var url, data, params = {};

            var methodsAllowed = ['get', 'post', 'put', 'delete'];

            if (methodsAllowed.indexOf(methodName) === -1) {
                deferred.reject(new Error('ApiService: not a valid http method'));
            }

            if (!options.url || (typeof options.url !== 'string')) {
                deferred.reject(new Error('ApiService: you need to inform a url'));
            }

            if (options.params) {
                params = angular.copy(options.params);
            }

            // filters to params
            if (options.filters) {
                var filters = angular.copy(options.filters);
                params = _.extend(params, filters);
            }

            // pagination to params
            if (options.pagination) {
                var pagination = angular.copy(options.pagination);
                params = _.extend(params, pagination);
            }

            if (options.data) {
                data = angular.copy(options.data);
            }

            if (options.cache) {
                cache = true;
            }

            url = options.url;

            $http({
                method: methodName,
                url: url,
                data: data,
                params: params,
                cache: cache
            })
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(function (response) {
                    deferred.reject(response);
                });

            return promise;

        }

        return {
            /**
             * Wrapper para método http get.
             *
             * @param {Object} options
             * @param {String} options.url
             * @param {Object} options.params
             * @param {Object} options.filters
             * @param {Boolean} options.cache
             */
            Get: function (options) {
                return _http('get', options);
            },

            /**
             * Wrapper para método http post.
             *
             * @param {Object} options
             * @param {String} options.url
             * @param {Object} options.params
             * @param {Object} options.filters
             * @param {Boolean} options.cache
             */
            Post: function (options) {
                return _http('post', options);
            },

            /**
             * Wrapper para método http delete.
             *
             * @param {Object} options
             * @param {String} options.url
             * @param {Object} options.params
             * @param {Object} options.filters
             * @param {Boolean} options.cache
             */
            Delete: function (options) {
                return _http('delete', options);
            },

            /**
             * Wrapper para método http put.
             *
             * @param {Object} options
             * @param {String} options.url
             * @param {Object} options.params
             * @param {Object} options.filters
             * @param {Boolean} options.cache
             */
            Put: function (options) {
                return _http('put', options);
            }
        };
    }

})();