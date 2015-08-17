;(function() {

  'use strict';

  angular.module('job-desk')
    .factory('EducationsService', function ($http, baseUrl) {

      var params = {
        distance: 30,
        educationGroup: ''
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

        if (params.educationGroup !== '') {
          filter.query.filtered.filter.and.push({'prefix': {'swissdoc': '0.' + params.swissdocMajorGroup}});
        }
        return $http.post(baseUrl + '/educations/_search', filter);
      }

      return {
        find: find,
        params: params
      };

    });


}());



