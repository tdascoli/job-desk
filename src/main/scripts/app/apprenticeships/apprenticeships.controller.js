;(function() {

  'use strict';

  angular.module('job-desk')
    .controller('ApprenticeshipsCtrl', function ($scope, $rootScope, $state, ApprenticeshipsService) {

      $rootScope.searchType='apprenticeships';
      $scope.searchParams = ApprenticeshipsService.params;

      $scope.kmOptions = {min:10,max:150,step:10,value:30};

      $scope.idle=false;
      $scope.count=0;
      $scope.nearestZip='';
      $scope.currentCoords=undefined;
      $scope.sort=0;

      $scope.executeSearch = function() {
        $state.go('apprenticeship-result');
      };

      $scope.executeSearch = function() {
        ApprenticeshipsService.find($scope.searchParams).success(function(result) {
          $scope.apprenticeships = result;
        })
      };

      $scope.setSwissdocGroup=function(swissdoc){
        $scope.searchParams.swissdoc=swissdoc;
        $scope.searchParams.swissdoc2='';
        $state.go('apprenticeship-search');
      };

      $scope.countStellen=function(){
        $scope.idle=true;
        ApprenticeshipsService.count($scope.currentCoords, function(count,locations,nearestZip){
          $scope.count=count;
          $scope.nearestZip=nearestZip;
          $scope.searchParams.locations=locations;
          $scope.idle=false;
        });
      };

      $scope.showDistanceInKM=function(){
        if ($scope.searchParams.areaType===1){
          return $scope.searchParams.km+' km';
        }
        return '';
      };

      $scope.setCurrentCoords=function(coords){
        $scope.currentCoords=coords;
        $scope.$digest();
      };

      $scope.$watch('currentCoords', function(){
        if ($scope.currentCoords!==undefined){
          $scope.countStellen();
        }
      });

      $scope.$watch('myCoords', function(){
        if ($rootScope.myCoords!==undefined){
          $scope.currentCoords=$rootScope.myCoords;
        }
      });

    });


}());



