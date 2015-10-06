;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('JobsService', function ($http, baseUrl) {

      var params = {
        from: 0,
        size: 20,
        distanceType: 'distance',
        distance: 30,
        travelTime: 30,
        onlineSince: 5,
        fulltime: 1,
        iscoMajorGroup: '',
        iscoGroupLevel2: '',
        zips: undefined,
        currentZip: '',
        currentCoords: undefined
      };

      function find() {
        var filter = {
          'from' : params.from,
          'size' : params.size,
          'query': {
            'filtered': {
              'query': {
                'match_all': {}
              },
              'filter': {
                'and': [
                  {
                    'range': {
                      'onlineSince': {
                        'lte': params.onlineSince
                      }
                    }
                  }
                ]
              }
            }
          }
        };

        if (params.distanceType === 'distance') {
          filter.query.filtered.filter.and.push({
            'nested': {
              'path': 'locations.location',
              'filter': {
                'geo_distance': {
                  'distance': params.distance + 'km',
                  'locations.location.coords': params.currentCoords
                }
              }
            }
          });
        }
        else {
          filter.query.filtered.filter.and.push({
            'nested': {
              'path': 'locations.location',
              'filter': {
                'terms': {
                  'zip': params.zips
                }
              }
            }
          });
        }

        if (params.fulltime === '2') {
          filter.query.filtered.filter.and.push({'term': {'fulltime': 'false'}});
        }
        if (params.iscoMajorGroup !== '') {
          filter.query.filtered.filter.and.push({'term': {'isco.majorGroup': params.iscoMajorGroup}});
        }
        if (params.iscoGroupLevel2 !== '' && params.iscoGroupLevel2 !== 0) {
          filter.query.filtered.filter.and.push({'term': {'isco.groupLevel2': params.iscoGroupLevel2}});
        }
        return $http.post(baseUrl + '/jobs/_search', filter);
      }

      function resetSearchParams() {
        params = {
          distanceType: 'distance',
          distance: 30,
          travelTime: 30,
          onlineSince: 5,
          fulltime: 1,
          iscoMajorGroup: '',
          iscoGroupLevel2: '',
          zips: undefined,
          currentZip: '',
          currentCoords: undefined
        };
        return params;
      }

      return {
        find: find,
        params: params,
        resetSearchParams: resetSearchParams
      };

    });

}());



