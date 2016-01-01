;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('LocationsService', function ($http, baseUrl) {

      function getLocation(coords) {
        var filter = {
          'size' : 1,
          'query': {
            'filtered': {
              'query': {
                'match_all': {}
              },
              'filter': {
                'geo_distance': {
                  'distance': '10km',
                  'geoLocation': coords
                }
              }
            }
          },
          'sort': [
            {
              '_geo_distance': {
                'geoLocation': coords,
                'order': 'asc',
                'unit': 'km',
                'distance_type': 'plane'
              }
            }
          ]
        };

        return $http.post(baseUrl + '/location/_search', filter);
      }

      function getLocationFromZip(zip) {
        var filter = {
          'size' : 1,
          'query': {
                'term': {'zip':zip }
          },
          'sort': [
            {
              'additionalNumber': {
                'order': 'asc'
              }
            }
          ]
        };

        return $http.post(baseUrl + '/location/_search', filter);
      }

      function checkLocation(coords,callback){
        var location=coords;
        getLocation(coords).success(function(nearestZip){
            if (nearestZip.hits.total <= 0) {
              location=getDefaultLocation();
            }
            callback(location);
          })
          .error(function(error){
            // todo error handling
            console.log(error);
            callback(getDefaultLocation());
          });
      }

      function getDefaultLocation() {
        // Bern
        return {
          lat: 46.946953,
          lon: 7.424150
        };
      }

      return {
        getLocation: getLocation,
        getLocationFromZip: getLocationFromZip,
        getDefaultLocation: getDefaultLocation,
        checkLocation: checkLocation
      };

    });

}());



