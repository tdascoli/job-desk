;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('TravelTimeService', function ($http, arrleeUrl) {

      function getTravelTimePolygon(coords, time, mode) {

        // time in arrlee service is in seconds
        time *= 60;

        // TODO find a better way to do
        var way_type = 'car';
        if (mode == 'bike') {
          way_type = 'bicycle'
        }

        // defines the size of a single square in the heatmap (between 0.01 and 100)
        var edgeLength = 1;

        return $http.get(arrleeUrl+'/heatmap-ways?lat='+coords.lat+'&lng='+coords.lon+'&max_travel_time='+time+'&way_type='+way_type+'&edgeLength='+edgeLength);
      }

      return {
        getTravelTimePolygon: getTravelTimePolygon
      };

    });

}());



