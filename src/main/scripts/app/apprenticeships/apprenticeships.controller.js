;(function() {

  'use strict';

  angular.module('job-desk')
    .controller('ApprenticeshipsCtrl', function ($scope, $rootScope, $state, $filter, $translate, ApprenticeshipsService, LocationsService, $mdDialog) {

      $rootScope.searchType='apprenticeships';
      $scope.searchParams = ApprenticeshipsService.params;

      $scope.searchRowGutter=20;
      $scope.searchRowHeight=(($(window).outerHeight(true)-$('#topnav').outerHeight(true)-$('#filter').outerHeight(true))/3)-$scope.searchRowGutter;

      $scope.distanceOptions = {min:5,max:50,step:5,value:10};

      $scope.count=0;
      $scope.nearestZip='';
      $scope.currentZip='';
      $scope.currentCoords=undefined;
      $scope.sort=0;

      $scope.setSwissdocGroup=function(swissdoc){
        $scope.searchParams.swissdoc=swissdoc;
        $scope.searchParams.swissdoc2='';
        $state.go('apprenticeship-search');
      };

      $scope.countStellen=function(){
        ApprenticeshipsService.find($scope.currentCoords).success(function(result){
          $rootScope.apprenticeships = result.hits.hits;
          $scope.count = result.hits.total;
        })
          .error(function (error) {
            // todo error handling
            console.log(error);
          });
      };

      function setNewCoords(coords){
        LocationsService.getLocation(coords).success(function(nearestZip){
          if (nearestZip.hits.total>0) {
            $scope.currentCoords=coords;
            $scope.nearestZip = nearestZip.hits.hits[0]._source.zip + ' (' + nearestZip.hits.hits[0]._source.name + ')';
            $scope.currentZip = nearestZip.hits.hits[0]._source.zip;
            $scope.countStellen();
          }
          else {
            $scope.locationError('apprenticeships.search.error.noValidCoords');
          }
        })
          .error(function(error){
            // todo error handling
            console.log(error);
          });
      }

      $scope.setCurrentCoords=function(coords){
        setNewCoords(coords);
      };

      $scope.$watch('currentCoords', function(){
        if ($scope.currentCoords!==undefined){
          setNewCoords($scope.currentCoords);
        }
      });

      $scope.$watch('myCoords', function(){
        if ($rootScope.myCoords!==undefined){
          $scope.currentCoords=$rootScope.myCoords;
        }
      });
      $scope.setCurrentZip=function(zip){
        LocationsService.getLocationFromZip(zip).success(function(nearestZip){
          if (nearestZip.hits.total>0) {
            setNewCoords(nearestZip.hits.hits[0]._source.geoLocation);
          }
          else {
            // todo error handling
            $scope.setCurrentZip($scope.currentZip);
            $scope.locationError('apprenticeships.search.error.noValidZip');
          }
        })
          .error(function(error){
            // todo error handling
            console.log(error);
          });
      };

      $scope.locationError=function(errorKey){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .content($translate.instant(errorKey))
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      };

      $scope.sort=0;
      var orderBy = $filter('orderBy');
      $scope.sortList=[
        {code:{field:'_source.onlineSince',order:false}, text:'global.sort.neuste'},
        {code:{field:'_source.title.de',order:false}, text:'global.sort.jobtitel_az'},
        {code:{field:'_source.title.de',order:true}, text:'global.sort.jobtitel_za'}
      ];
      $scope.sortResultList=function(){
        //var sort = lodash.findIndex($scope.sortList,$scope.sort);
        $rootScope.apprenticeships = orderBy($rootScope.apprenticeships, $scope.sortList[$scope.sort].code.field, $scope.sortList[$scope.sort].code.order);
      };

    });


}());



