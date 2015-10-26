;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('MunicipalitiesService', function ($http) {

      function getMunicipalities(coords,distance) {
        var size = Math.ceil(distance/3);
        //size = 4000;
        var filter = {
          'size': size,
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
        return $http.post('http://localhost:9000/jobdeskdev/municipality/_search', filter);
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

        return $http.post('http://localhost:9000/jobdeskdev/municipality/_search', filter);
      }

      return {
        getMunicipalities: getMunicipalities,
        getMunicipalitiesFromZips: getMunicipalitiesFromZips
      };

    });

}());



