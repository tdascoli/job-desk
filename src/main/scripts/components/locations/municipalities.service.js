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

      function getMunicipalitiesGeoJSON(coords,distance,callback){
        getMunicipalities(coords,distance).success(function(result){
            callback(getGeoJSON(result.hits.hits));
        })
        .error(function(error){
          // todo error handling
          console.log(error);
          return false;
        });
      }

      function getMunicipalitiesFromZipsGeoJSON(zips, callback){
        getMunicipalitiesFromZips(zips).success(function(result){
            callback(getGeoJSON(result.hits.hits));
        })
        .error(function(error){
          // todo error handling
          console.log(error);
          return false;
        });
      }

      function getGeoJSON(data){
        var geoJSON = {
          type: 'GeometryCollection',
          geometries: []
        };

        angular.forEach(data, function (municipality) {
          var point={
            type: 'Point',
            coordinates: [municipality._source.locations.geoLocation[0].coords.lon,municipality._source.locations.geoLocation[0].coords.lat],
            properties: {
              name: municipality._source.name
            }
          };

          geoJSON.geometries.push(point);
        });
        return geoJSON;
      }

      return {
        getMunicipalities: getMunicipalities,
        getMunicipalitiesFromZips: getMunicipalitiesFromZips,
        getMunicipalitiesGeoJSON:getMunicipalitiesGeoJSON,
        getMunicipalitiesFromZipsGeoJSON: getMunicipalitiesFromZipsGeoJSON
      };

    });

}());



