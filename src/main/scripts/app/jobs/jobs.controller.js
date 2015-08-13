;(function() {

  'use strict';

  angular.module('job-desk')
    .controller('JobsCtrl', function ($scope, $rootScope, $state, $filter, $translate, JobsService, LocationsService, $mdDialog) {

      $rootScope.searchType='jobs';
      $scope.searchParams = JobsService.params;

      $scope.searchRowGutter=20;
      $scope.searchRowHeight=(($(window).outerHeight(true)-$('#topnav').outerHeight(true)-$('#filter').outerHeight(true))/3)-$scope.searchRowGutter;

      $scope.distanceOptions = {min:10,max:150,step:10,value:30};
      $scope.onlineSinceOptions = {min:1,max:60,step:1,value:5};
      $scope.iscoMajorGroup=[{text:'isco.category1',code:'1'},{text:'isco.category2',code:'2'},{text:'isco.category3',code:'3'},{text:'isco.category4',code:'4'},{text:'isco.category5',code:'5'},{text:'isco.category6',code:'6'},{text:'isco.category7',code:'7'},{text:'isco.category8',code:'8'},{text:'isco.category9',code:'9'}];

      $scope.iscoGroupLevel2=[];
      $scope.iscoGroupLevel2['1']=[
        {code:'11', text:'isco.1.11'},
        {code:'12', text:'isco.1.12'},
        {code:'13', text:'isco.1.13'},
        {code:'14', text:'isco.1.14'}
      ];
      $scope.iscoGroupLevel2['2']=[
        {code:'21', text:'isco.2.21'},
        {code:'22', text:'isco.2.22'},
        {code:'23', text:'isco.2.23'},
        {code:'24', text:'isco.2.24'},
        {code:'25', text:'isco.2.25'},
        {code:'26', text:'isco.2.26'}
      ];
      $scope.iscoGroupLevel2['3']=[
        {code:'31', text:'isco.3.31'},
        {code:'32', text:'isco.3.32'},
        {code:'33', text:'isco.3.33'},
        {code:'34', text:'isco.3.34'},
        {code:'35', text:'isco.3.35'}
      ];
      $scope.iscoGroupLevel2['4']=[
        {code:'41', text:'isco.4.41'},
        {code:'42', text:'isco.4.42'},
        {code:'43', text:'isco.4.43'},
        {code:'44', text:'isco.4.44'}
      ];
      $scope.iscoGroupLevel2['5']=[
        {code:'51', text:'isco.5.51'},
        {code:'52', text:'isco.5.52'},
        {code:'53', text:'isco.5.53'},
        {code:'54', text:'isco.5.54'}
      ];
      $scope.iscoGroupLevel2['6']=[
        {code:'61', text:'isco.6.61'},
        {code:'62', text:'isco.6.62'},
        {code:'63', text:'isco.6.63'}
      ];
      $scope.iscoGroupLevel2['7']=[
        {code:'71', text:'isco.7.71'},
        {code:'72', text:'isco.7.72'},
        {code:'73', text:'isco.7.73'},
        {code:'74', text:'isco.7.74'},
        {code:'75', text:'isco.7.75'}
      ];
      $scope.iscoGroupLevel2['8']=[
        {code:'81', text:'isco.8.81'},
        {code:'82', text:'isco.8.82'},
        {code:'83', text:'isco.8.83'}
      ];
      $scope.iscoGroupLevel2['9']=[
        {code:'91', text:'isco.9.91'},
        {code:'92', text:'isco.9.92'},
        {code:'93', text:'isco.9.93'},
        {code:'94', text:'isco.9.94'},
        {code:'95', text:'isco.9.95'},
        {code:'96', text:'isco.9.96'}
      ];

      $scope.count=0;
      $scope.nearestZip='';
      $scope.currentZip='';
      $scope.currentCoords=undefined;

      $scope.showResults = function() {
        $state.go('job-result');
      };

      $scope.setIscoGroup=function(isco){
        $scope.searchParams.iscoMajorGroup=isco;
        $scope.searchParams.iscoGroupLevel2='';
        $state.go('job-search');
      };

      $scope.countStellen=function(){
        JobsService.find($scope.currentCoords).success(function(result){
          $rootScope.jobs = result.hits.hits;
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
            $scope.locationError('jobs.search.error.noValidCoords');
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
            $scope.locationError('jobs.search.error.noValidZip');
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
        {code:{field:'_source.quotaTo',order:true}, text:'global.sort.pensum_0'},
        {code:{field:'_source.quotaTo',order:false}, text:'global.sort.pensum_100'},
        {code:{field:'_source.title.de',order:false}, text:'global.sort.jobtitel_az'},
        {code:{field:'_source.title.de',order:true}, text:'global.sort.jobtitel_za'}
      ];
      $scope.sortResultList=function(){
        //var sort = lodash.findIndex($scope.sortList,$scope.sort);
        $rootScope.jobs = orderBy($rootScope.jobs, $scope.sortList[$scope.sort].code.field, $scope.sortList[$scope.sort].code.order);
      };

      // SSI Tastatur
      $scope.ssiKeyStart=function(){
        $state.go('startpage');
      };
      $scope.ssiKeyInfo=function(){
        $state.go('frontpage');
      };
      function ssiKeyBack(location){
        $state.go(location);
      }
      $scope.ssiKeySearch=function(){
        ssiKeyBack('job-search');
      };
      $scope.ssiKeyResults=function(){
        ssiKeyBack('job-result');
      };
      $scope.ssiKeyNext=function(){
        $scope.navigateToJob(true);
      };
      $scope.ssiKeyBack=function(){
        $scope.navigateToJob(false);
      };
    });


}());



