;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('EducationsService', function ($http, baseUrl) {

      var params = {
        distanceType: 'distance',
        distance: 30,
        travelTime: 30,
        swissdocMajorGroup: '',
        swissdocGroupLevel2: '',
        language: '',
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
                'and': [],
                'or': []
              }
            }
          }
        };

        if (params.distanceType === 'distance') {
          filter.query.filtered.filter.and.push({
            'geo_distance': {
              'distance': params.distance + 'km',
              'location.coords': params.currentCoords
            }
          });
        }
        else {
          filter.query.filtered.filter.and.push({
            'nested': {
              'path': 'location.zip',
              'filter': {
                'terms': {
                  'zip': params.zips
                }
              }
            }
          });
        }
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
        return $http.post(baseUrl + '/educations/_search?size=5000', filter);
      }

      function resetSearchParams() {
        return {
          distance: 10,
          swissdocMajorGroup: '',
          swissdocGroupLevel2: '',
          language: '',
          zips: undefined,
          currentZip: '',
          currentCoords: undefined
        };
      }

      return {
        find: find,
        params: params,
        resetSearchParams: resetSearchParams
      };

    });


}());



