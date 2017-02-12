(function() {
    'use strict';

    var dependencies = [
      'core.api.ApiService', 'ngFileUpload'
    ];

    angular
        .module('api.livingWill', dependencies)
        .service('LivingWillApi', LivingWillApi);

    /** @ngInject */
    function LivingWillApi(APP_CONFIG, ApiService, Upload) {

        var url = APP_CONFIG.URL.API_URL + '/user-living-will';

        this.get = function (params, options) {
            options = options || {};
            options.url = url;
            options.params = params || {};

            return ApiService.Get(options);
        };

        this.create = function(data, options) {
            options = options || {};
            options.url = url;
            options.data = data;
            return ApiService.PostMultiformData(options, Upload);
        };

        this.update = function(id, data, options) {
            options = options || {};
            options.url = url;
            options.data = data;
            return ApiService.PutMultiformData(options, Upload);
        };

        this.UpdateImageProfile = function (data) {
          var options = {};
          options.url = APP_CONFIG.URL.API_URL +  '/user-profile/avatar';
          console.log(options);
          options.data = data;
          return ApiService.PostMultiformData(options, Upload);
        };
    }

})();
