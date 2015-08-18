;(function() {

  'use strict';

  angular.module('job-desk')
    .factory('EducationsService', function ($http, baseUrl) {

      var params = {
        distance: 10,
        swissdocMajorGroup: '',
        swissdocGroupLevel2: ''
      };

      function find(coords) {
        var filter = {
          'query': {
            'filtered': {
              'query': {
                'match_all': {}
              },
              'filter': {
                'and': [
                  {
                    'geo_distance': {
                      'distance': params.distance + 'km',
                      'location.coords': coords
                    }
                  }
                ]
              }
            }
          }
        };

        if (params.swissdocMajorGroup !== '') {
          filter.query.filtered.filter.and.push({'prefix': {'swissdoc': '9.' + params.swissdocMajorGroup}});
        }
        if (params.swissdocGroupLevel2 !== '') {
          filter.query.filtered.filter.and.push({'term': {'swissdoc': '9.' + params.swissdocGroupLevel2}});
        }
        return $http.post(baseUrl + '/educations/_search', filter);
      }

      return {
        find: find,
        params: params
      };

    });


}());



