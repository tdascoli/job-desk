;(function() {

  'use strict';

  angular.module('job-desk')
    .factory('JobsService', function ($http, baseUrl) {

      var path = 'resource/jobs';

      function all() {
        return $http.get(path);
      }

      function find(params) {
        var path = path;

        var counter = 0;
        for (var param in params) {
          if (params[param] || params[param] === false) {
            if (counter > 0) {
              path = path + '&'
            } else {
              path = path + '?';
            }
            path = path + param + '=' + params[param];
            counter++;
          }
        }
        return $http.get(path);
      }


      function count(coords, params, cb){

        $http.post(baseUrl+'/locations/area', {coord: coords, radius: params.km}).success(function(result){
          var nearestZip='', locations=[], i=0;
          angular.forEach(result.areas, function(location){
            if (i===0){
              nearestZip=location.CODE+' ('+location.TEXT+')';
            }
            if (locations.indexOf(location.CODE)===-1) {
              locations.push(location.CODE);
            }
          });

          $http.post(baseUrl+'/jobs/countJobs', {plz: locations, isco: params.isco, isco2: params.isco2, fulltime: params.fulltime, history: params.history}).success(function(result){
            cb(result.count,nearestZip);
          });
        });
      }

      return {
        all: all,
        find: find,
        count: count
      }

    });

}());



