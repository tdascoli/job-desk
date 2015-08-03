;(function() {

  'use strict';

  angular.module('job-desk')
    .factory('EducationsService', function ($http) {

      var params = {
        search:'educations'
      };

      var path = 'resource/educations';

      function all() {
        return $http.get(path);
      }

      function find(params) {
        var path = path;

        var counter = 0;
        for (var param in params) {
          if (params[param] || params[param] === false) {
            if (counter > 0) {
              path = path + '&';
            } else {
              path = path + '?';
            }
            path = path + param + '=' + params[param];
            counter++;
          }
        }
        return $http.get(path);
      }

      return {
        all: all,
        find: find,
        params: params
      };

    });


}());



