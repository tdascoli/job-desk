;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('LocationsService', function ($http, baseUrl) {

      function getLocation(coords) {
        var filter = {
          "query": {
            "filtered": {
              "query": {
                "match_all": {}
              },
              "filter": {
                "geo_distance": {
                  "distance": "10km",
                  "geoLocation": {
                    "lat": coords.lat,
                    "lon": coords.lng
                  }
                }
              }
            }
          },
          "sort": [
            {
              "_geo_distance": {
                "geoLocation": {
                  "lat": coords.lat,
                  "lon": coords.lng
                },
                "order": "asc",
                "unit": "km",
                "distance_type": "plane"
              }
            }
          ]
        };

        return $http.post(baseUrl + '/locations/_search', filter);
      }

      return {
        getLocation: getLocation
      }

    });

}());



