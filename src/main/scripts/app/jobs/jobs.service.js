;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('JobsService', function ($http, $rootScope, baseUrl, ConfigService, lodash) {

      var search = {};
      var params = {};
      var visitedJobs = [];

      function resetSearchParams() {
        var distance =  30;
        var transport =  30;
        var drive =  30;
        var bike =  30;
        if (ConfigService.init().initialDistance!==undefined){
          distance =  ConfigService.init().initialDistance.distance;
          transport =  ConfigService.init().initialDistance.transport;
          drive =  ConfigService.init().initialDistance.drive;
          bike =  ConfigService.init().initialDistance.bike;
        }
        params.from = 0;
        params.size = 20;
        params.distanceType = ConfigService.init().distanceType;
        params.distance =  distance;
        params.transport =  transport;
        params.drive =  drive;
        params.bike =  bike;
        params.fulltime = 1;
        params.iscoMajorGroup = '';
        params.iscoGroupLevel2 = '';
        params.iscoGroupLevel3 = '';
        params.zips = undefined;
        params.shape = undefined;
        params.currentZip = '';
        params.currentCoords = undefined;
        params.sort = {};
        params.sort.field = 'publicationDate';
        params.sort.order = 'desc';
      }

      resetSearchParams();

      function resetSearch() {
        params.heatmap = undefined;
        params.count = 0;
        params.nearestZip = '';
      }

      resetSearch();

      function doDriveQuery(filter){
        var coords=[];
        angular.forEach(params.shape, function(value) {
          if (value.length>1){
            coords.push(lodash.flatten(value));
          }
          else {
            coords.push(value[0]);
          }
        });

        angular.forEach(coords, function(value) {
          var query ={
            'nested': {
              'path': 'location.locations',
              'filter': {
                'geo_polygon': {
                  'geoLocation': {
                    'points': value
                  }
                }
              }
            }
          };
          filter.push(query);
        });
        return filter;
      }

      function find() {

        if (params.currentCoords === undefined) {
          params.currentCoords = $rootScope.myCoords;
        }

        if (params.zips!==undefined || params.shape!==undefined || params.currentCoords!==undefined) {
          var filter = {
            'from': params.from,
            'size': params.size,
            'query': {
              'filtered': {
                'query': {'match_all': {}},
                'filter': {
                  'and': []
                }
              }
            },
            'sort': []
          };

          // QUERY
          if (params.iscoMajorGroup !== '') {
            filter.query.filtered.query = {'term': {'isco.majorGroup': params.iscoMajorGroup}};
          }
          if (params.iscoGroupLevel2 !== '' && params.iscoGroupLevel2 !== 0 && params.iscoGroupLevel2 !== '0') {
            filter.query.filtered.query = {'term': {'isco.groupLevel2': params.iscoGroupLevel2}};
          }
          if (params.iscoGroupLevel3 !== '' && params.iscoGroupLevel3 !== 0 && params.iscoGroupLevel3 !== '0') {
            filter.query.filtered.query = {'term': {'isco.groupLevel3': params.iscoGroupLevel3}};
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
          else if (params.distanceType === 'drive' || params.distanceType === 'bike') {
            var query_filter = [];
            filter.query.filtered.filter.and.push({or: doDriveQuery(query_filter)});
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
          if (params.fulltime === '2') {
            filter.query.filtered.filter.and.push({'term': {'fulltime': 'false'}});
          }
          // SORT
          var sort = {};
          if (params.sort.field === 'distance') {
            sort._geo_distance = {
              'location.locations.geoLocation': params.currentCoords,
              order: params.sort.order,
              mode: 'min',
              unit: 'km',
              distance_type: 'sloppy_arc'
            };
          }
          else {
            sort[params.sort.field] = {order: params.sort.order};
          }
          filter.sort.push(sort);

          return $http.post(baseUrl + '/job/_search', filter);
        }
        return false;
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
        resetSearch: resetSearch,
        addVisitedJob: addVisitedJob,
        isVisited: isVisited,
        resetVisitedJobs: resetVisitedJobs
      };
    });
}());



