;(function () {

  'use strict';

  angular.module('job-desk')
    .controller('ConfigCtrl', function ($scope, $rootScope, ConfigService, LocationsService, lodash) {

      $scope.lookupCoords=false;
      $scope.idle=false;

      $scope.config=ConfigService.config;

      ConfigService.init();

      $scope.$watch('myCoords', function () {
        if ($rootScope.myCoords !== undefined && $scope.config.coords === undefined) {
          initCoords();
        }
      });

      $scope.chooseAddress=function(index){
        var coords={
                    lon:$scope.lookupCoords[index].geometry.location.K,
                    lat:$scope.lookupCoords[index].geometry.location.G
                    };
        var plzIndex=lodash.findIndex($scope.lookupCoords[0].address_components,{types:['postal_code']});

        $scope.config.coords = coords;
        $scope.config.zip = parseInt($scope.lookupCoords[index].address_components[plzIndex].long_name, 10);
        $scope.lookupCoords=false;
      };

      //** todo HANDLING?!??
      $scope.receiveCoords=function(){
        var geocoder = new google.maps.Geocoder();
        $scope.idle=true;

        geocoder.geocode( { 'address': $scope.config.address+' '+$scope.config.zip }, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
            var coords={
              lon:results[0].geometry.location.K,
              lat:results[0].geometry.location.G
            };
            var plzIndex=lodash.findIndex(results[0].address_components,{types:['postal_code']});
            $scope.config.coords = coords;
            $scope.config.zip = parseInt(results[0].address_components[plzIndex].long_name, 10);
            $scope.idle=false;
          }
        });
      };

      $scope.saveConfig=function(){
        ConfigService.persist();
        $rootScope.myCoords=$scope.config.coords;
      };

      function initCoords() {
        if (!$scope.config.coords){
          $scope.config.coords=$rootScope.myCoords;
        }
        LocationsService.getLocation($scope.config.coords).success(function (nearestZip) {
           $scope.config.zip = parseInt(nearestZip.hits.hits[0]._source.zip,10);
        })
        .error(function (error) {
          // todo error handling
          console.log(error);
        });
      }
    });


}());



