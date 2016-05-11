;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('EducationsService', function ($http, baseUrl, ConfigService) {

      var search = {};
      var params = {};
      var visitedJobs = [];

      function resetSearchParams() {
        params.from = 0;
        params.size = 20;
        params.distanceType = ConfigService.init().distanceType;
        params.distance = 30;
        params.travelTime = 30;
        params.swissdocMajorGroup = '';
        params.swissdocGroupLevel2 = '';
        params.language = '';
        params.zips = undefined;
        params.shape = undefined;
        params.currentZip = '';
        params.currentCoords = undefined;
        params.sort = {};
        params.sort.field = 'title';
        params.sort.order = 'desc';
      }

      resetSearchParams();

      function resetSearch() {
        params.heatmap = undefined;
        params.count = 0;
        params.nearestZip = '';
      }

      resetSearch();

      function find() {
        var filter = {
          'from': params.from,
          'size': params.size,
          'query': {
            'filtered': {
              'query': {
                'match_all': {}
              },
              'filter': {
                'bool': {
                  'must': [],
                  'must_not': [],
                  'should': []
                }
              }
            }
          },
          'sort': []
        };

        // QUERY
        if (params.swissdocMajorGroup !== '') {
          filter.query.filtered.query = {'prefix': {'swissdoc': '9.' + params.swissdocMajorGroup}};
        }
        if (params.swissdocGroupLevel2 !== '' && params.swissdocGroupLevel2 !== 0 && params.swissdocGroupLevel2 !== '0') {
          filter.query.filtered.query = {'prefix': {'swissdoc': '9.' + params.swissdocGroupLevel2}};
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
            'terms': {
              'location.zip': params.zips
            }
          });
        }
        if (params.language !== '') {
          if (params.language !== 'other') {
            filter.query.filtered.filter.bool.should.push({'term': {'languages': params.language}});
            if (params.language === 'ger') {
              filter.query.filtered.filter.bool.should.push({'term': {'languages': 'de'}});
            }
            else {
              filter.query.filtered.filter.bool.should.push({'term': {'languages': params.language.substr(0, 2)}});
            }
          }
          else {
            filter.query.filtered.filter.bool.must.push({'not': {'terms': {'languages': ['ger', 'de', 'fre', 'fr', 'ita', 'it', 'eng', 'en']}}});
          }
        }
        // SORT
        var sort = {};
        sort[params.sort.field] = {order: params.sort.order};
        filter.sort.push(sort);
        return $http.post(baseUrl + '/educations/_search', filter);
      }

      function addVisitedJob(jobId) {
        if (!isVisited(jobId)) {
          visitedJobs.push(jobId);
        }
      }

      function isVisited(jobId) {
        return visitedJobs.indexOf(jobId) > -1;
      }

      function resetVisitedJobs() {
        visitedJobs = [];
      }

      return {
        find: find,
        search: search,
        params: params,
        resetSearchParams: resetSearchParams,
        addVisitedJob: addVisitedJob,
        isVisited: isVisited,
        resetVisitedJobs: resetVisitedJobs
      };

    });


}());



