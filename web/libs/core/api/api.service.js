(function() {

    'use strict';

    var HTTP_STATUS_NOT_FOUND = 404,
        HTTP_STATUS_UNAUTHORIZED = 401,
        HTTP_STATUS_FORBIDDEN = 403,
        HTTP_STATUS_BAD_REQUEST = 400,
        NO_HTTP_STATUS = 0;

    var dependencies = ['core.config', 'ngCookies'];

    angular
        .module('core.api.ApiService', dependencies)
        .service('ApiService', ApiService)
        .service('NegativeStatusHandler', NegativeStatusHandler)
        .config(config);

    /** @ngInject */
    function config($httpProvider) {
        $httpProvider.defaults.withCredentials = false;
        $httpProvider.interceptors.push('NegativeStatusHandler');
    }

    /** @ngInject */
    function NegativeStatusHandler($q, $window, APP_CONFIG, $cookies,jwtHelper) {

        return {
            request: function(config) {
                var token = $cookies.get('sessionToken');
                if (config.url.indexOf('https://s3.eu-central-1.amazonaws.com') !== -1) {
                    config.headers.Authorization = " ";
                } else if (token && config.url.indexOf('https://s3.eu-central-1.amazonaws.com') === -1) {
                    config.headers.Authorization = 'Bearer ' + token;
                }

                return config;
            },
            responseError: function(response) {

                if (response.status === HTTP_STATUS_NOT_FOUND) {
                    console.log("not found");
                }

                if (response.status === HTTP_STATUS_UNAUTHORIZED) {

                }

                if (response.status === HTTP_STATUS_FORBIDDEN) {
                    var decoded = jwtHelper.decodeToken($cookies.get("sessionToken"));
                    console.log(decoded);
                    if (decoded.scope.indexOf('admin') > -1) {
                        window.location.replace("https://sosid.pimentagroup.de/dashboard");
                    }
                    console.log("HTTP_STATUS_FORBIDDEN");
                }

                if (response.status === NO_HTTP_STATUS) {
                    // do something
                }

                if (response.status === HTTP_STATUS_BAD_REQUEST) {
                    console.log(response);
                    console.log("BAD REQUEST");
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

            var responseType;

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

            if (options.responseType) {
                responseType = angular.copy(options.responseType);
            }

            url = options.url;

            $http({
                    method: methodName,
                    url: url,
                    data: data,
                    params: params,
                    cache: cache,
                    responseType: responseType
                })
                .then(function(response) {
                    deferred.resolve(response.data);
                })
                .catch(function(response) {
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
            Get: function(options) {
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
            Post: function(options) {
                return _http('post', options);
            },

            PostMultiformData: function(options, Upload) {
                return Upload.upload({
                    url: options.url,
                    data: options.data
                });
            },

            PutMultiformData: function(options, Upload) {
                return Upload.upload({
                    url: options.url,
                    method: 'PUT',
                    data: options.data
                });
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
            Delete: function(options) {
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
            Put: function(options) {
                return _http('put', options);
            }
        };
    }

})();
