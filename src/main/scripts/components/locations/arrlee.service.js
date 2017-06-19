;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('ArrleeService', function ($http, arrleeUrl, arrleeModes) {

      var publicTransportParams = {
        start_zip: '',
        start_country: 'CH',
        'start-time': 7,
        year: 0,
        month: 1,
        day: 25,
        max_travel_time: 30,
        edgeLength: 2.25
      };

      function getPublicTransportHeatmap(zip, travelTime) {
        publicTransportParams.start_zip = zip;
        publicTransportParams.max_travel_time = travelTime;

        doArrleeDateParam();

        return $http.get(arrleeUrl + '/heatmap?' + buildParamsString(publicTransportParams));
      }

      function getWaysHeatmap(coords, time, mode) {

        var way_type = 'car';
        if (mode == arrleeModes.bicycle) {
          way_type = 'bicycle'
        }

        var waysParams = {
          lat: coords.lat,
          lng: coords.lon,
          max_travel_time: time * 60, // time in this arrlee function is in seconds
          way_type: way_type,
          edgeLength: 1
        }

        return $http.get(arrleeUrl+'/heatmap-ways?' + buildParamsString(waysParams));
      }

      function getZips(travelTime) {
        return $http.get(arrleeUrl + '/poi?poi_types=PLZCH&max_tt=' + travelTime);
      }

      function buildParamsString(params) {
        var paramsString = '';
        for (var key in params) {
          if (paramsString !== '') {
            paramsString += '&';
          }
          paramsString += key + '=' + encodeURIComponent(params[key]);
        }

        return paramsString;
      }

      function doArrleeDateParam(){
        var currentDate = moment();
        var monday                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       = currentDate.add(7, 'd').day(1); // Next Monday Week
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

        // there is a problem if day === 0 (wrong results > bug in arrlee)
        if (day===0){
          day=7;
        }

        publicTransportParams.day=day;
        publicTransportParams.month=month;
        publicTransportParams.year=year;
        //return {day:day,month:month,year:year};
      }

      return {
        getPublicTransportHeatmap: getPublicTransportHeatmap,
        getWaysHeatmap: getWaysHeatmap,
        getZips: getZips
      };

    });

}());



