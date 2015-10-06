;(function () {

  'use strict';

  angular.module('job-desk')
    .controller('ConfigCtrl', function ($scope, $rootScope, ConfigService, LocationsService, lodash, geolocation) {

      $scope.lookupCoords=false;
      $scope.idle=false;
      $scope.locationError=false;

      $scope.config=ConfigService.init();

      $scope.$watchCollection('myCoords', function () {
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

      $scope.resetCoords=function(){
        $scope.idle=true;
        $scope.config.coords=undefined;
        $scope.config.zip='';
        geolocation.getLocation().then(function (data) {
          $rootScope.myCoords = {lat: data.coords.latitude, lon: data.coords.longitude};
        });
        $scope.$digest();
        initCoords();
      };

      $scope.receiveCoords=function(){
        $scope.idle=true;
        LocationsService.getLocationFromZip($scope.config.zip).success(function (nearestZip) {
          if (nearestZip.hits.total > 0) {
            $scope.config.coords = nearestZip.hits.hits[0]._source.geoLocation;
          }
          else {
            // todo error handling
            $scope.locationError=true;
          }
          $scope.idle=false;
        })
        .error(function (error) {
          // todo error handling
          console.log(error);
            $scope.idle=false;
        });
      };

      $scope.saveConfig=function(){
        ConfigService.persist();
        $rootScope.myCoords=$scope.config.coords;
        $rootScope.appConfig=$scope.config;
      };

      $scope.closeError=function(){
        $scope.locationError=false;
      };

      function initCoords() {
        $scope.idle=true;
        if (!$scope.config.coords){
          $scope.config.coords=$rootScope.myCoords;
        }
        LocationsService.getLocation($scope.config.coords).success(function (nearestZip) {
          $scope.config.zip = parseInt(nearestZip.hits.hits[0]._source.zip,10);
          $scope.idle=false;
        })
          .error(function (error) {
            // todo error handling
            console.log(error);
            $scope.idle=false;
          });
      }
    });


}());



