;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('ApprenticeshipsService', function ($http, baseUrl) {

      var params = {
        from: 0,
        size: 20,
        distanceType: 'distance',
        distance: 30,
        travelTime: 30,
        swissdocMajorGroup: '',
        swissdocGroupLevel2: '',
        zips: undefined,
        currentZip: '',
        currentCoords: undefined,
        sort: {
          field: 'company.address.zip',
          order: 'asc'
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
                'and': []
              }
            }
          },
          'sort': []
        };

        // QUERY
        if (params.swissdocMajorGroup !== '') {
          filter.query.filtered.query={'prefix': {'swissdoc': '0.' + params.swissdocMajorGroup}};
        }
        if (params.swissdocGroupLevel2 !== '' && params.swissdocGroupLevel2 !== 0 && params.swissdocGroupLevel2 !== '0') {
          filter.query.filtered.query={'prefix': {'swissdoc': '0.' + params.swissdocGroupLevel2}};
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
        sort[params.sort.field]={order:params.sort.order};
        filter.sort.push(sort);

        return $http.post(baseUrl + '/apprenticeships/_search', filter);
      }

      function resetSearchParams(){
        return {
          distanceType: 'distance',
          distance: 30,
          travelTime: 30,
          swissdocMajorGroup: '',
          swissdocGroupLevel2: '',
          zips: undefined,
          currentZip: '',
          currentCoords: undefined
        };
      }

      return {
        find: find,
        params: params,
        resetSearchParams:resetSearchParams
      };

    });


}());



