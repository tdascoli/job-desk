;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('LocationsService', function ($http, baseUrl, googleAPIUrl) {

      function getLocation(coords) {
        var filter = {
          'size': 1,
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
          'size': 1,
          'query': {
            'term': {'zip': zip}
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

      // todo autocompleter
      /*
      function getLocationAutocompleter(value, coords) {
        var filter = {
          'size': 10,
          'query': {
            'filtered': {
              'query': {
                'match_all': {}
              },
              'filter': {
                'prefix' : { 'name' : value }
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
      */

      // google geocoding api key: AIzaSyD2zQC5PTp8ZxkefDSgTQJB0_KGDFgiISE
      // http://maps.googleapis.com/maps/api/geocode/ json ? address='' & key=AIzaSyD2zQC5PTp8ZxkefDSgTQJB0_KGDFgiISE
      function getLocationFromAddress(address){
        return $http.get(googleAPIUrl+'/api/geocode/json?address='+ address);
      }

      function checkLocation(coords, callback) {
        var location = coords;
        getLocation(coords).success(function (nearestZip) {
            if (nearestZip.hits.total <= 0) {
              location = getDefaultLocation();
            }
            callback(location);
          })
          .error(function (error) {
            console.error(error);
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
        getLocationFromAddress: getLocationFromAddress,
        getDefaultLocation: getDefaultLocation,
        checkLocation: checkLocation
      };

    });

}());



