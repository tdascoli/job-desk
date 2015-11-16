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
        // Älggi-Alp : Geographical centre of Switzerland
        return {
          lat: 46.798530,
          lon: 8.231803
        };
      }

      return {
        getLocation: getLocation,
        getLocationFromZip: getLocationFromZip,
        getDefaultLocation: getDefaultLocation
      };

    });

}());



