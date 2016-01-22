;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('ArrleeService', function ($http, arrleeUrl) {

      var arrleeParams = {
        start_zip: '',
        start_country: 'CH',
        'start-time': 7,
        year: 0,
        month: 1,
        day: 25,
        max_travel_time: 30,
        edgeLength: 2.25
      };

      function getHeatmap(zip, travelTime) {
        arrleeParams.start_zip = zip;
        arrleeParams.max_travel_time = travelTime;
        arrleeParams.day=getNextMonday().day; // Next Monday of Week
        arrleeParams.month=getNextMonday().month; // Month
        arrleeParams.year=getNextMonday().year; // Month

        var arrleeParamsString = '';
        for (var key in arrleeParams) {
          if (arrleeParamsString !== '') {
            arrleeParamsString += '&';
          }
          arrleeParamsString += key + '=' + encodeURIComponent(arrleeParams[key]);
        }

        return $http.get(arrleeUrl + '/heatmap?' + arrleeParamsString);
      }

      function getZips(travelTime) {
        return $http.get(arrleeUrl + '/poi?poi_types=PLZCH&max_tt=' + travelTime);
      }

      function getNextMonday(){
        var currentDate = moment();
        var monday = currentDate.add(7, 'd').day(1); // Next Monday Week
        var year=parseInt(monday.format('YYYY'));

        if (year!==moment().year()){
          // if next monday is a new year
          year=1;
        }
        else {
          year=0;
        }

        var day=parseInt(monday.format('DD'));
        var month=parseInt(monday.format('MM'));

        // convert from exact date (1-31 and 1-12) to arrlee date (0-31 and 0-11)
        day--;
        month--;

        return {day:day,month:month,year:year};
      }

      return {
        getHeatmap: getHeatmap,
        getZips: getZips
      };

    });

}());



