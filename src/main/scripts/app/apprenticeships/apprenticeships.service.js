;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('ApprenticeshipsService', function ($http, baseUrl, ConfigService) {


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
        params.sort.field = 'company.address.zip';
        params.sort.order = 'asc';
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
                'and': []
              }
            }
          },
          'sort': []
        };

        // QUERY
        if (params.swissdocMajorGroup !== '') {
          filter.query.filtered.query = {'prefix': {'swissdoc': '0.' + params.swissdocMajorGroup}};
        }
        if (params.swissdocGroupLevel2 !== '' && params.swissdocGroupLevel2 !== 0 && params.swissdocGroupLevel2 !== '0') {
          filter.query.filtered.query = {'prefix': {'swissdoc': '0.' + params.swissdocGroupLevel2}};
        }
        // FILTER
        if (params.distanceType === 'distance') {
          filter.query.filtered.filter.and.push({
            'geo_distance': {
              'distance': params.distance + 'km',
              'geoLocation': params.currentCoords
            }
          });
        }
        else {
          filter.query.filtered.filter.and.push({
            'terms': {
              'company.address.zip': params.zips
            }
          });
        }
        // SORT
        var sort = {};
        sort[params.sort.field] = {order: params.sort.order};
        filter.sort.push(sort);

        return $http.post(baseUrl + '/apprenticeships/_search', filter);
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



