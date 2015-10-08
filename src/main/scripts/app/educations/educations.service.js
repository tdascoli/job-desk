;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('EducationsService', function ($http, baseUrl) {

      var params = {
        from: 0,
        size: 20,
        distanceType: 'distance',
        distance: 30,
        travelTime: 30,
        swissdocMajorGroup: '',
        swissdocGroupLevel2: '',
        language: '',
        zips: undefined,
        currentZip: '',
        currentCoords: undefined,
        sort: {
          field: 'title',
          order: 'desc'
        }
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
                'bool' : {
                  'must' : [],
                  'must_not' : [],
                  'should' : []
                }
              }
            }
          },
          'sort': []
        };

        // QUERY
        if (params.swissdocMajorGroup !== '') {
          filter.query.filtered.query={'prefix': {'swissdoc': '9.' + params.swissdocMajorGroup}};
        }
        if (params.swissdocGroupLevel2 !== '' && params.swissdocGroupLevel2 !== 0 && params.swissdocGroupLevel2 !== '0') {
          filter.query.filtered.query={'prefix': {'swissdoc': '9.' + params.swissdocGroupLevel2}};
        }
        // FILTER
        if (params.distanceType === 'distance') {
          filter.query.filtered.filter.bool.must.push({
            'geo_distance': {
              'distance': params.distance + 'km',
              'location.coords': params.currentCoords
            }
          });
        }
        else {
          filter.query.filtered.filter.bool.must.push({
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
        if (params.language !== '') {
          if (params.language!=='other') {
            filter.query.filtered.filter.bool.should.push({'term': {'languages': params.language}});
            if (params.language === 'ger') {
              filter.query.filtered.filter.bool.should.push({'term': {'languages': 'de'}});
            }
            else {
              filter.query.filtered.filter.bool.should.push({'term': {'languages': params.language.substr(0, 2)}});
            }
          }
          else {
            filter.query.filtered.filter.bool.must.push({'not': {'terms': {'languages':['ger','de','fre','fr','ita','it','eng','en']}}});
          }
        }
        // SORT
        var sort = {};
        sort[params.sort.field]={order:params.sort.order};
        filter.sort.push(sort);
        return $http.post(baseUrl + '/educations/_search', filter);
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



