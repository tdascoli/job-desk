;(function () {

  'use strict';

  angular.module('job-desk')
    .controller('ConfigCtrl', function ($scope, $rootScope, ConfigService, LocationsService, lodash, geolocation) {

      $scope.lookupCoords=false;
      $scope.idle=false;
      $scope.locationError=false;

      $scope.config=ConfigService.init();

      $scope.resetConfig=function(){
        ConfigService.reset();
      };

      $scope.receiveCoords=function(){
        $scope.closeError();
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

    });

}());



