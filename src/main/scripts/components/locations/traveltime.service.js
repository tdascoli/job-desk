;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('TravelTimeService', function ($http, travelTimeUrl) {

      function getTravelTimePolygon(coords, time, mode) {
        var wsapikey='50a3c7abaaeff63afc079e3ac2b2fe94';
        console.log(travelTimeUrl+'/v1/traveltime_polygon/json?wsapikey='+wsapikey+'&origin='+coords.lat+'%2C'+coords.lon+'&time='+time+'&mode='+mode);
        return $http.post(travelTimeUrl+'/v1/traveltime_polygon/json?wsapikey='+wsapikey+'&origin='+coords.lat+'%2C'+coords.lon+'&time='+time+'&mode='+mode);
      }

      return {
        getTravelTimePolygon: getTravelTimePolygon
      };

    });

}());



