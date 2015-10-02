;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('MunicipalitiesService', function ($http, baseUrl) {

      function getMunicipalities(coords,distance) {
        var size = Math.ceil(distance/3);
        //size = 4000;
        var filter = {
          'query': {
            'filtered': {
              'query': {
                'term': {
                  'initial': 'false'
                }
              },
              'filter': {
                'and':[{
                  'nested': {
                    'path': 'locations.geoLocation',
                    'filter': {
                      'geo_distance': {
                        'distance': distance + 'km',
                        'locations.geoLocation.coords': coords
                      }
                    }
                  }
                }]
              }
            }
          }
        };
        /*
         ,
         {
         'range': {
         'communitySize': {
         'gt': 2,
         'lt': 4
         }
         }
         }
         */
        return $http.post(baseUrl + '/municipalities/_search?size='+size, filter);
      }

      function getMunicipalitiesFromZips(zips) {
        var filter = {
          'query': {
            'filtered': {
              'query': {
                'term': {
                  'initial': 'false'
                }
              },
              'filter': {
                'and':[{
                  'nested': {
                    'path': 'locations.geoLocation',
                    'filter': {
                      'terms': {
                        'locations.geoLocation.zip': zips
                      }
                    }
                  }
                },
                  {
                    'term': {
                      'city': 'true'
                    }
                  }]
              }
            }
          }
        };

        return $http.post(baseUrl + '/municipalities/_search', filter);
      }

      return {
        getMunicipalities: getMunicipalities,
        getMunicipalitiesFromZips: getMunicipalitiesFromZips
      };

    });

}());



