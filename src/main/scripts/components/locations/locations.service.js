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

      function getDefaultLocation() {
        // Bern
        return {
          lat: 46.953,
          lon: 7.461
        };
      }

      return {
        getLocation: getLocation,
        getLocationFromZip: getLocationFromZip,
        getDefaultLocation: getDefaultLocation
      };

    });

}());



