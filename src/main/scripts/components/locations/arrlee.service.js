;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('ArrleeService', function ($http) {

      var arrleeParams = {
        start_zip: '',
        start_country: 'CH',
        'start-time': 7,
        year: 0,
        month: 7,
        day: 25,
        max_travel_time: 30,
        edgeLength: 2.25
      };

      function getHeatmap(zip,travelTime) {
        arrleeParams.start_zip = zip;
        arrleeParams.max_travel_time = travelTime;

        var arrleeParamsString = '';
        for (var key in arrleeParams) {
          if (arrleeParamsString !== '') {
            arrleeParamsString += '&';
          }
          arrleeParamsString += key + '=' + encodeURIComponent(arrleeParams[key]);
        }

        return $http.get('http://localhost:9000/ajax/heatmap?' + arrleeParamsString);
      }

      function getZips(travelTime) {
        return $http.get('http://localhost:9000/ajax/poi?poi_types=PLZCH&max_tt=' + travelTime);
      }

      return {
        getHeatmap: getHeatmap,
        getZips: getZips
      };

    });

}());



