;(function() {

  'use strict';

  angular.module('job-desk')
    .controller('JobsCtrl', function ($scope, $rootScope, $state, $filter, JobsService, lodash) {

      $rootScope.searchType='jobs';
      $scope.searchParams = JobsService.params;

      $scope.distanceOptions = {min:10,max:150,step:10,value:30};
      $scope.onlineSinceOptions = {min:1,max:60,step:1,value:5};
      $scope.iscoCategory=[{text:'isco.category1',code:'1'},{text:'isco.category2',code:'2'},{text:'isco.category3',code:'3'},{text:'isco.category4',code:'4'},{text:'isco.category5',code:'5'},{text:'isco.category6',code:'6'},{text:'isco.category7',code:'7'},{text:'isco.category8',code:'8'},{text:'isco.category9',code:'9'}];

      $scope.idle=false;
      $scope.count=0;
      $scope.nearestZip='';
      $scope.currentCoords=undefined;
      $scope.sort=0;

      $scope.showResults = function() {
        $state.go('job-result');
      };

      $scope.setIscoGroup=function(isco){
        $scope.searchParams.iscoMajorGroup=isco;
        $scope.searchParams.iscoGroupLevel2='';
        $state.go('job-search');
      };

/*      $scope.showTimeInH=function(){
        var hour = Math.floor($scope.searchParams.time/60);
        var minute = $scope.searchParams.time-(hour*60);
        if (minute<10){
          minute=minute+'0';
        }
        if ($scope.searchParams.areaType===2){
          return hour+":"+minute+' h';
        }
        return '';
      };*/

      $scope.countStellen=function(){
        JobsService.find($scope.currentCoords).success(function(result){
          $rootScope.jobs = result.hits.hits;
          $scope.count = result.hits.total;
        })
        .error(function (error) {
          console.log(error);
        });
      };

      $scope.setCurrentCoords=function(coords){
        $scope.currentCoords=coords;
        $scope.$digest();
      };

/*      $scope.navigateToJob=function(nextJob){
        var index = lodash.findIndex($rootScope.jobs,{'_id':$rootScope.job._id});
        if (nextJob){
          index++;
          if (index===$rootScope.jobs.length){
            index=0;
          }
        }
        else {
          if (index===0){
            index=$rootScope.jobs.length;
          }
          index--;
        }
        $state.go('job-detail',{jobId:$rootScope.jobs[index].id});
      };*/

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

      var orderBy = $filter('orderBy');
      $scope.sortList=[
        {code:{field:'onlineSince',order:false}, text:'global.sort.neuste'},
        {code:{field:'quotaTo',order:true}, text:'global.sort.pensum_0'},
        {code:{field:'quotaTo',order:false}, text:'global.sort.pensum_100'},
        {code:{field:'title.de',order:false}, text:'global.sort.jobtitel_az'},
        {code:{field:'title.de',order:true}, text:'global.sort.jobtitel_za'}
      ];
      $scope.sortResultList=function(){
        var sort = lodash.findIndex($scope.sortList,$scope.sort);
        $rootScope.jobs = orderBy($rootScope.jobs, $scope.sortList[sort].code.field, $scope.sortList[sort].code.order);
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



