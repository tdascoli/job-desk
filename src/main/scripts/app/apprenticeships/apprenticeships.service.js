;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('ApprenticeshipsService', function ($http, baseUrl) {

      var params = {
        distanceType: 'distance',
        distance: 30,
        travelTime: 30,
        swissdocMajorGroup: '',
        swissdocGroupLevel2: '',
        zips: undefined,
        currentZip: '',
        currentCoords: undefined
      };

      function find() {
        var filter = {
          'query': {
            'filtered': {
              'query': {
                'match_all': {}
              },
              'filter': {
                'and': []
              }
            }
          }
        };

        if (params.distanceType === 'distance') {
          filter.query.filtered.filter.and.push({
              'geo_distance': {
                'distance': params.distance + 'km',
                'geoLocation': params.currentCoords
              }
            });
        }
        else {
          filter.query.filtered.filter.and.push({
            'nested': {
              'path': 'company.address.zip',
              'filter': {
                'terms': {
                  'zip': params.zips
                }
              }
            }
          });
        }
        if (params.swissdocMajorGroup !== '') {
          filter.query.filtered.filter.and.push({'prefix': {'swissdoc': '0.' + params.swissdocMajorGroup}});
        }
        if (params.swissdocGroupLevel2 !== '') {
          filter.query.filtered.filter.and.push({'prefix': {'swissdoc': '0.' + params.swissdocGroupLevel2}});
        }
        return $http.post(baseUrl + '/apprenticeships/_search', filter);
      }

      function resetSearchParams(){
        return {
          distanceType: 'distance',
          distance: 30,
          travelTime: 30,
          swissdocMajorGroup: '',
          swissdocGroupLevel2: '',
          zips: undefined,
          currentZip: '',
          currentCoords: undefined
        };
      }

      return {
        find: find,
        params: params,
        resetSearchParams:resetSearchParams
      };

    });


}());



