;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('LocationsService', function ($http, baseUrl) {

      function getLocation(coords) {
        var filter = {
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

        return $http.post(baseUrl + '/locations/_search', filter);
      }

      function getLocationFromZip(zip) {
        var filter = {
          'query': {
            'filtered': {
              'query': {
                'term': {'zip':zip }
              },
              'filter': {
                'term': { 'additionalNumber':0 }
              }
            }
          }
        };

        return $http.post(baseUrl + '/locations/_search', filter);
      }

      return {
        getLocation: getLocation,
        getLocationFromZip: getLocationFromZip
      };

    });

}());



