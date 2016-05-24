;(function () {

  'use strict';

  angular.module('job-desk')
    .controller('ConfigCtrl', function ($scope, $rootScope, ConfigService, LocationsService, geolocation, lodash, $mdToast, $mdDialog) {

      $scope.idle = false;

      $scope.config = ConfigService.init();

      $scope.circumSearch=function(type){
        if (!type){
          return false;
        }
        else if (
          (!$scope.config.availableDistanceType.distance && !$scope.config.availableDistanceType.transport) ||
          (!$scope.config.availableDistanceType.distance && !$scope.config.availableDistanceType.drive) ||
          (!$scope.config.availableDistanceType.drive && !$scope.config.availableDistanceType.transport)
        ){
          return true;
        }
        return false;
      };

      $scope.$watchCollection('config.availableDistanceType', function () {
        if (!$scope.config.availableDistanceType[$scope.config.distanceType]){
          $scope.config.availableDistanceType[$scope.config.distanceType]=true;
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.body))
              .textContent('Diese Konfiguration ist unzulässig: Umkreissuche - Angebot entspricht nicht der Standardeinstellung.')
              .ariaLabel('Diese Konfiguration ist unzulässig: Umkreissuche - Angebot entspricht nicht der Standardeinstellung.')
              .ok('OK')
          );
        }
      });

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
              displayToast('Postal code not valid!', false);
            }
            $scope.idle = false;
          })
          .error(function (error) {
            console.error(error);
            $scope.idle = false;
          });
      };

      $scope.lookupAddress = function () {
        $scope.idle = true;
        LocationsService.getLocationFromAddress($scope.config.address).success(function (addressLocation) {
            if (addressLocation.status === 'OK') {
              $scope.config.coords = {lat: addressLocation.results[0].geometry.location.lat, lon: addressLocation.results[0].geometry.location.lng};
              var plz =  lodash.find(addressLocation.results[0].address_components, {types:['postal_code']});
              $scope.config.zip = parseInt(plz.long_name);
            }
            else {
              displayToast('Address not valid!', false);
            }
            $scope.idle = false;
          })
          .error(function (error) {
            console.error(error);
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



