;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('JobsService', function ($http, baseUrl) {

      var params = {
        distance: 30,
        onlineSince: 5,
        fulltime: 1,
        iscoMajorGroup: '',
        iscoGroupLevel2: ''
      };

      function find(coords) {
        var filter = {
          'query': {
            'filtered': {
              'query': {
                'match_all': {}
              },
              'filter': {
                'and' : [
                  {
                    'range': {
                      'onlineSince': {
                        'lte': params.onlineSince
                      }
                    }
                  },
                  {
                    'nested': {
                      'path': 'locations',
                      'filter':{
                        'geo_distance': {
                          'distance': params.distance + 'km',
                          'locations.coords': coords
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        };

      if (params.fulltime==='2') {
        filter.query.filtered.filter.and.push({'term':{'fulltime': 'false'}});
      }
      if (params.iscoMajorGroup!=='') {
        filter.query.filtered.filter.and.push({'term':{'iscoMajorGroup': params.iscoMajorGroup}});
      }
      if (params.iscoGroupLevel2!=='') {
        filter.query.filtered.filter.and.push({'term':{'iscoGroupLevel2': params.iscoGroupLevel2}});
      }
      return $http.post(baseUrl + '/jobs/_search', filter);
    }

      return {
        find: find,
        params: params
      };

    });

}());



