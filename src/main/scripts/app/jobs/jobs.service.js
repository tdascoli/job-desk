;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('JobsService', function ($http, baseUrl) {

      var params = {
        distance: 30,
        travelTime: 30,
        onlineSince: 5,
        fulltime: 1,
        iscoMajorGroup: '',
        iscoGroupLevel2: '',
        zips: undefined
      };


      var arrleeParams = {
        start_zip: '',
        start_country: 'CH',
        'start-time': 7,
        year: 0,
        month: 7,
        day: 25,
        max_travel_time: 30,
        edgeLength: 2.25
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
                    'range': {
                      'onlineSince': {
                        'lte': params.onlineSince
                      }
                    }
                  }
                ]
              }
            }
          }
        };

        if (params.zips === undefined) {
          filter.query.filtered.filter.and.push({
            'nested': {
              'path': 'locations.location',
              'filter': {
                'geo_distance': {
                  'distance': params.distance + 'km',
                  'locations.location.coords': coords
                }
              }
            }
          });
        }
        else {
          filter.query.filtered.filter.and.push({
            'nested': {
              'path': 'locations.location',
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
        if (params.iscoMajorGroup !== '') {
          filter.query.filtered.filter.and.push({'term': {'isco.majorGroup': params.iscoMajorGroup}});
        }
        if (params.iscoGroupLevel2 !== '') {
          filter.query.filtered.filter.and.push({'term': {'isco.groupLevel2': params.iscoGroupLevel2}});
        }
        return $http.post(baseUrl + '/jobs/_search', filter);
      }

      function arrleeHeatmap(currentZip) {
        arrleeParams.start_zip = currentZip;
        arrleeParams.max_travel_time = params.travelTime;

        var arrleeParamsString = '';
        for (var key in arrleeParams) {
          if (arrleeParamsString !== '') {
            arrleeParamsString += '&';
          }
          arrleeParamsString += key + '=' + encodeURIComponent(arrleeParams[key]);
        }

        return $http.get('http://localhost:9000/ajax/heatmap?' + arrleeParamsString);
      }

      function arrleeZips() {
        return $http.get('http://localhost:9000/ajax/poi?poi_types=PLZCH&max_tt=' + params.travelTime);
      }

      function resetSearchParams() {
        params = {
          distance: 30,
          onlineSince: 5,
          fulltime: 1,
          iscoMajorGroup: '',
          iscoGroupLevel2: ''
        };
        return params;
      }

      return {
        find: find,
        params: params,
        resetSearchParams: resetSearchParams,
        arrleeHeatmap: arrleeHeatmap,
        arrleeZips: arrleeZips
      };

    });

}());



