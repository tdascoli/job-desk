;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('EducationsService', function ($http, baseUrl) {

      var params = {
        distance: 10,
        swissdocMajorGroup: '',
        swissdocGroupLevel2: '',
        language: ''
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
                ],
                'or': []
              }
            }
          }
        };

        if (params.swissdocMajorGroup !== '') {
          filter.query.filtered.filter.and.push({'prefix': {'swissdoc': '9.' + params.swissdocMajorGroup}});
        }
        if (params.swissdocGroupLevel2 !== '') {
          filter.query.filtered.filter.and.push({'prefix': {'swissdoc': '9.' + params.swissdocGroupLevel2}});
        }
        if (params.language !== '') {
          if (params.language!=='other') {
            filter.query.filtered.filter.or.push({'term': {'languages': params.language}});
            if (params.language === 'ger') {
              filter.query.filtered.filter.or.push({'term': {'languages': 'de'}});
            }
            else {
              filter.query.filtered.filter.or.push({'term': {'languages': params.language.substr(0, 2)}});
            }
          }
          else {
            filter.query.filtered.filter.and.push({'not': {'terms': {'languages':['ger','de','fre','fr','ita','it','eng','en']}}});
          }
        }
        return $http.post(baseUrl + '/educations/_search', filter);
      }

      function resetSearchParams() {
        return {
          distance: 10,
          swissdocMajorGroup: '',
          swissdocGroupLevel2: ''
        };
      }

      return {
        find: find,
        params: params,
        resetSearchParams: resetSearchParams
      };

    });


}());



