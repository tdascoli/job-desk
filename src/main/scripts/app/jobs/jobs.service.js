;(function() {

  'use strict';

  angular.module('job-desk')
    .factory('JobsService', function ($http, $resource, baseUrl) {

      var params = {
        areaType:1,
        km:30,
        time:60,
        history:5,
        fulltime:true,
        isco:'',
        isco2:'',
        locations:[],
        search:'jobs'
      };

      function find(cb) {
        $http.post(baseUrl+'/jobs/getJobs', {plz: params.locations, isco: params.isco, isco2: params.isco2, fulltime: params.fulltime, history: params.history}).success(function(result){
          //console.log(jobs);
          cb(result);
        });
      }

      function count(coords, cb){

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
            cb(result.count,locations,nearestZip);
          });
        });
      }

      return {
        find: find,
        count: count,
        params: params
      }

    });

}());



