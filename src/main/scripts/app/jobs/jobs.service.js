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
                      'path': 'locations.location',
                      'filter':{
                        'geo_distance': {
                          'distance': params.distance + 'km',
                          'locations.location.coords': coords
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
        filter.query.filtered.filter.and.push({'term':{'isco.majorGroup': params.iscoMajorGroup}});
      }
      if (params.iscoGroupLevel2!=='') {
        filter.query.filtered.filter.and.push({'term':{'isco.groupLevel2': params.iscoGroupLevel2}});
      }
      return $http.post(baseUrl + '/jobs/_search', filter);
    }

      return {
        find: find,
        params: params
      };

    });

}());



