;(function() {

  'use strict';

  angular.module('job-desk')
    .factory('ApprenticeshipsService', function ($http, baseUrl) {

      var params = {
        km:30,
        swissdoc:'',
        swissdoc2:'',
        locations:[]
      };

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

          $http.post(baseUrl+'/lenas/countJobs', {plz: locations, swissdoc: params.swissdoc, swissdoc2: params.swissdoc2}).success(function(result){
            cb(result.count,locations,nearestZip);
          });
        });
      }

      return {
        count: count,
        params: params
      };

    });


}());



