;(function() {

  'use strict';

  angular.module('job-desk')
    .controller('EducationsCtrl', function ($scope, $rootScope, $state, $filter, $translate, EducationsService, LocationsService, $mdDialog) {

      $rootScope.searchType='educations';
      $scope.searchParams = EducationsService.params;

      $scope.searchRowGutter=20;
      $scope.searchRowHeight=(($(window).outerHeight(true)-$('#topnav').outerHeight(true)-$('#filter').outerHeight(true))/3)-$scope.searchRowGutter;

      $scope.distanceOptions = {min:10,max:150,step:10,value:30};

      $scope.count=0;
      $scope.nearestZip='';
      $scope.currentZip='';
      $scope.currentCoords=undefined;
      $scope.sort=0;

      $scope.educationGroups=[{text:'swissdoc.category1',code:'1'},{text:'swissdoc.category2',code:'2'},{text:'swissdoc.category3',code:'3'},{text:'swissdoc.category4',code:'4'},{text:'swissdoc.category5',code:'5'},{text:'swissdoc.category6',code:'6'},{text:'swissdoc.category7',code:'7'},{text:'swissdoc.category8',code:'8'}];


      $scope.countStellen=function(){
        EducationsService.find($scope.currentCoords).success(function(result){
          $rootScope.educations = result.hits.hits;
          $scope.count = result.hits.total;
        })
          .error(function (error) {
            // todo error handling
            console.log(error);
          });
      };

      $scope.setSwissdocGroup=function(swissdoc){
        $scope.searchParams.educationGroup=swissdoc;
        $state.go('education-search');
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

      $scope.$watch('myCoords', function(){
        if ($rootScope.myCoords!==undefined){
          $scope.currentCoords=$rootScope.myCoords;
        }
      });

      $scope.$watch('currentCoords', function(){
        if ($scope.currentCoords!==undefined){
          setNewCoords($scope.currentCoords);
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
        {code:{field:'_source.title',order:false}, text:'global.sort.coursetitle_az'},
        {code:{field:'_source.title',order:true}, text:'global.sort.coursetitle_za'},
        {code:{field:'_source.location.zip',order:false}, text:'global.sort.location_1000'},
        {code:{field:'_source.location.zip',order:true}, text:'global.sort.location_9999'}
      ];
      $scope.sortResultList=function(){
        $rootScope.educations = orderBy($rootScope.educations, $scope.sortList[$scope.sort].code.field, $scope.sortList[$scope.sort].code.order);
      };

    });


}());



