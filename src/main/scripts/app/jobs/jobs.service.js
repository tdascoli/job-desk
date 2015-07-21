;(function() {

  'use strict';

  angular.module('job-desk')
    .factory('JobsService', function ($http, baseUrl, $rootScope) {

      var params = {
        km:30,
        history:5,
        fulltime:true,
        isco:'',
        isco2:'',
        locations:[]
      };

      function find() {
        $http.post(baseUrl+'/jobs/getJobs', {plz: params.locations, isco: params.isco, isco2: params.isco2, fulltime: params.fulltime, history: params.history}).success(function(result){
          $rootScope.jobs=result.jobs;
        })
        .error(function(error){
          console.log(error);
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

      function getJob(jobId) {
        $http.get(baseUrl+'/jobdetails/'+jobId).success(function(result){
          $rootScope.job=result;
        })
        .error(function(error){
          console.log(error);
        });
      }

      return {
        find: find,
        count: count,
        params: params,
        getJob: getJob
      }

    });

}());



