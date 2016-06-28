;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('ConfigService', function ($cookies) {

      var config = {};

      // default config when not set with a cookie
      function resetConfig() {
        config.address = '';
        config.zip = undefined;
        config.coords = undefined;
        config.educations = false;
        config.apprenticeships = false;
        config.localInfo = '';
        config.distanceType = 'transport';
        config.availableDistanceType={
          distance:true,
          transport:true,
          drive:false,
          bike:false
        };
        config.initialDistance={
          distance:30,
          transport:30,
          drive:30,
          bike:30
        };
        config.mapType = 'osm';
      }

      resetConfig();

      function init() {
        var cookieConfig = $cookies.getObject('config');
        if (cookieConfig) {
          config = cookieConfig;
        }
        return config;
      }

      function persist() {
        var now = new Date();
        $cookies.remove('config');
        $cookies.putObject('config', config, {expires: new Date(now.getFullYear() + 10, now.getMonth())});
      }

      function reset() {
        $cookies.remove('config');
        resetConfig();
      }

      return {
        init: init,
        config: config,
        persist: persist,
        reset: reset
      };

    });

}());



