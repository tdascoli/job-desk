;(function () {

  'use strict';

  angular.module('job-desk')
    .controller('ConfigCtrl', function ($scope, $rootScope, ConfigService, LocationsService, lodash, geolocation, $mdToast) {

      $scope.idle = false;

      $scope.config = ConfigService.init();

      $scope.resetConfig = function () {
        ConfigService.reset();
        displayToast('Cookie successfully deleted!', true);
      };

      $scope.receiveCoords = function () {
        $scope.idle = true;
        LocationsService.getLocationFromZip($scope.config.zip).success(function (nearestZip) {
            if (nearestZip.hits.total > 0) {
              $scope.config.coords = nearestZip.hits.hits[0]._source.geoLocation;
            }
            else {
              // todo error handling
              displayToast('Postal code not valid!', false);
            }
            $scope.idle = false;
          })
          .error(function (error) {
            // todo error handling
            console.log(error);
            $scope.idle = false;
          });
      };

      $scope.saveConfig = function () {
        ConfigService.persist();
        $rootScope.myCoords = $scope.config.coords;
        $rootScope.appConfig = $scope.config;
        displayToast('Configuration successfully saved!', true);
      };

      function displayToast(message, success) {
        $mdToast.show($mdToast.simple()
          .textContent(message)
          .position('top right')
          .theme(success ? 'toast-success' : 'toast-error')
        );
      }

    });

}());



