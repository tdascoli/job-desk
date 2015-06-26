;(function() {

  'use strict';

  angular.module('job-desk')
    .factory('CodesService', function ($http) {

      var path = 'resource/codes';

      function all(type) {
        return $http.get(path + '?type=' + type);
      }

      function find(params, type) {
        var query = path + '?type=' + type;

        for (var param in params) {
          if (params[param] || params[param] === false) {
            query = query + '?' + param + '=' + params[param];
          }
        }
        return $http.get(query);
      }

      return {
        all: all,
        find: find
      }

    });


}());



