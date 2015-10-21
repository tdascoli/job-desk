;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('JobsService', function ($http, baseUrl) {

      var params = {};
      resetSearchParams();

      function find() {
        var filter = {
          'from' : params.from,
          'size' : params.size,
          'query': {
            'filtered': {
              'query': {'match_all': {}},
              'filter': {
                'and': [
                  {
                    'range': {
                      'publicationDate': {
                        'gte': moment().subtract(params.onlineSince, 'days').format('YYYY-MM-DD') //yyyy-MM-dd
                      }
                    }
                  }
                ]
              }
            }
          },
          'sort': []
        };

        // QUERY
        if (params.iscoMajorGroup !== '') {
          filter.query.filtered.query={'term': {'isco.majorGroup': params.iscoMajorGroup}};
        }
        if (params.iscoGroupLevel2 !== '' && params.iscoGroupLevel2 !== 0 && params.iscoGroupLevel2 !== '0') {
          filter.query.filtered.query={'term': {'isco.groupLevel2': params.iscoGroupLevel2}};
        }
        // FILTER
        if (params.distanceType === 'distance') {
          filter.query.filtered.filter.and.push({
            'nested': {
              'path': 'location.locations',
              'filter': {
                'geo_distance': {
                  'distance': params.distance + 'km',
                  'location.locations.geoLocation': params.currentCoords
                }
              }
            }
          });
        }
        else {
          filter.query.filtered.filter.and.push({
            'nested': {
              'path': 'location.locations',
              'filter': {
                'terms': {
                  'zip': params.zips
                }
              }
            }
          });
        }
        // todo change to pensumBis/Von solution
        if (params.fulltime === '2') {
          filter.query.filtered.filter.and.push({'term': {'fulltime': 'false'}});
        }
        // SORT
        var sort = {};
        sort[params.sort.field]={order:params.sort.order};
        filter.sort.push(sort);

        return $http.post(baseUrl + '/job/_search', filter);
      }

      function resetSearchParams() {

        params.from = 0;
        params.size = 20;
        params.distanceType = 'distance';
        params.distance = 30;
        params.travelTime = 30;
        params.onlineSince = 5;
        params.fulltime = 1;
        params.iscoMajorGroup = '';
        params.iscoGroupLevel2 = '';
        params.zips = undefined;
        params.currentZip = '';
        params.currentCoords = undefined;
        params.sort = {};
        params.sort.field = 'publicationDate';
        params.sort.order = 'desc';
      }

      return {
        find: find,
        params: params,
        resetSearchParams: resetSearchParams
      };
    });
}());



