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
      $scope.iscoMajorGroup=[{text:'isco.1000',code:'1'},{text:'isco.2000',code:'2'},{text:'isco.3000',code:'3'},{text:'isco.4000',code:'4'},{text:'isco.5000',code:'5'},{text:'isco.6000',code:'6'},{text:'isco.7000',code:'7'},{text:'isco.8000',code:'8'},{text:'isco.9000',code:'9'}];

      $scope.iscoGroupLevel2=[];
      $scope.iscoGroupLevel2['1']=[
        {code:'11', text:'isco.1100'},
        {code:'12', text:'isco.1200'},
        {code:'13', text:'isco.1300'},
        {code:'14', text:'isco.1400'}
      ];
      $scope.iscoGroupLevel2['2']=[
        {code:'21', text:'isco.2100'},
        {code:'22', text:'isco.2200'},
        {code:'23', text:'isco.2300'},
        {code:'24', text:'isco.2400'},
        {code:'25', text:'isco.2500'},
        {code:'26', text:'isco.2600'}
      ];
      $scope.iscoGroupLevel2['3']=[
        {code:'31', text:'isco.3100'},
        {code:'32', text:'isco.3200'},
        {code:'33', text:'isco.3300'},
        {code:'34', text:'isco.3400'},
        {code:'35', text:'isco.3500'}
      ];
      $scope.iscoGroupLevel2['4']=[
        {code:'41', text:'isco.4100'},
        {code:'42', text:'isco.4200'},
        {code:'43', text:'isco.4300'},
        {code:'44', text:'isco.4400'}
      ];
      $scope.iscoGroupLevel2['5']=[
        {code:'51', text:'isco.5100'},
        {code:'52', text:'isco.5200'},
        {code:'53', text:'isco.5300'},
        {code:'54', text:'isco.5400'}
      ];
      $scope.iscoGroupLevel2['6']=[
        {code:'61', text:'isco.6100'},
        {code:'62', text:'isco.6200'},
        {code:'63', text:'isco.6300'}
      ];
      $scope.iscoGroupLevel2['7']=[
        {code:'71', text:'isco.7100'},
        {code:'72', text:'isco.7200'},
        {code:'73', text:'isco.7300'},
        {code:'74', text:'isco.7400'},
        {code:'75', text:'isco.7500'}
      ];
      $scope.iscoGroupLevel2['8']=[
        {code:'81', text:'isco.8100'},
        {code:'82', text:'isco.8200'},
        {code:'83', text:'isco.8300'}
      ];
      $scope.iscoGroupLevel2['9']=[
        {code:'91', text:'isco.9100'},
        {code:'92', text:'isco.9200'},
        {code:'93', text:'isco.9300'},
        {code:'94', text:'isco.9400'},
        {code:'95', text:'isco.9500'},
        {code:'96', text:'isco.9600'}
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
            $scope.locationError('global.error.noValidCoords');
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
            $scope.locationError('global.error.noValidZip');
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
        {code:{field:'_source.title.'+$translate.use(),order:false}, text:'global.sort.jobtitel_az'},
        {code:{field:'_source.title.'+$translate.use(),order:true}, text:'global.sort.jobtitel_za'}
      ];
      $scope.sortResultList=function(){
        //var sort = lodash.findIndex($scope.sortList,$scope.sort);
        $rootScope.jobs = orderBy($rootScope.jobs, $scope.sortList[$scope.sort].code.field, $scope.sortList[$scope.sort].code.order);
      };

      // SSI Tastatur
      $scope.ssiKeyPrint=function(){
        alert('print?');
      };
    });


}());



