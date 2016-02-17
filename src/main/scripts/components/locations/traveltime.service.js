;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('TravelTimeService', function ($http, travelTimeUrl) {

      function getTravelTimePolygon(coords, time) {
        var wsapikey='50a3c7abaaeff63afc079e3ac2b2fe94';

        return $http.post(travelTimeUrl+'/v1/traveltime_polygon/json?wsapikey='+wsapikey+'&origin='+coords.lat+'%2C'+coords.lon+'&time='+time+'&mode=drive&congestion=true');
      }

      return {
        getTravelTimePolygon: getTravelTimePolygon
      };

    });

}());



