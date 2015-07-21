;(function() {

  'use strict';

  angular.module('job-desk')
    .controller('JobsCtrl', function ($scope, $rootScope, $state, JobsService, lodash) {

      $scope.searchParams = JobsService.params;

      $scope.kmOptions = {min:10,max:150,step:10,value:30};
      $scope.hourOptions = {min:10,max:240,step:5,value:60};
      $scope.historyOptions = {min:1,max:60,step:1,value:5};
      $scope.iscoCategory=[{text:'isco.category1',code:'1'},{text:'isco.category2',code:'2'},{text:'isco.category3',code:'3'},{text:'isco.category4',code:'4'},{text:'isco.category5',code:'5'},{text:'isco.category6',code:'6'},{text:'isco.category7',code:'7'},{text:'isco.category8',code:'8'},{text:'isco.category9',code:'9'}];

      $scope.idle=false;
      $scope.count=0;
      $scope.nearestZip='';

      $scope.jobs = [];

      $scope.currentCoords=undefined;

      $scope.executeSearch = function() {

        $state.go('job-result');

        $scope.idle=true;

        $scope.getJobs();

        $scope.idle=false;
      };



      $scope.getJobs=function(){
        JobsService.find(function(jobs){
          $scope.jobs=jobs;
          console.log($scope.jobs);
        });
      };

      $scope.setIscoGroup=function(isco){
        $scope.searchParams.isco=isco;
        $scope.searchParams.isco2='';
        $state.go('job-search');
      };

      $scope.showTimeInH=function(){
        var hour = Math.floor($scope.searchParams.time/60);
        var minute = $scope.searchParams.time-(hour*60);
        if (minute<10){
          minute=minute+'0';
        }
        if ($scope.searchParams.areaType===2){
          return hour+":"+minute+' h';
        }
        return '';
      };

      $scope.showDistanceInKM=function(){
        if ($scope.searchParams.areaType===1){
          return $scope.searchParams.km+' km';
        }
        return '';
      };

      $scope.countStellen=function(){
        $scope.idle=true;
        JobsService.count($scope.currentCoords, function(count,locations,nearestZip){
          $scope.count=count;
          $scope.nearestZip=nearestZip;
          $scope.searchParams.locations=locations;
          $scope.idle=false;
        });
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

      $scope.$watchCollection('jobs', function(oldVal, newVal){
        console.log('watch',oldVal, newVal);
      });

      // todo wip
      $scope.sortList=[
        {code:{field:'ONLINE_SEIT',order:false}, text:'search.sort.neuste'},
        {code:{field:'UNBEFRISTET_B',order:true}, text:'search.sort.unbefristet'},
        {code:{field:'UNBEFRISTET_B',order:false}, text:'search.sort.befristet'},
        {code:{field:'PENSUM_BIS',order:true}, text:'search.sort.pensum_0'},
        {code:{field:'PENSUM_BIS',order:false}, text:'search.sort.pensum_100'},
        {code:{field:'BEZEICHNUNG',order:false}, text:'search.sort.jobtitel_az'},
        {code:{field:'BEZEICHNUNG',order:true}, text:'search.sort.jobtitel_za'}
      ];
      $scope.sort=null;
      $scope.sortResultList=function(sort){
        $scope.sort=sort;
        $rootScope.resultCollection = orderBy($rootScope.resultCollection, $scope.sortList[sort].code.field, $scope.sortList[sort].code.order);
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
      /*$scope.ssiKeyNext=function(){
        $scope.navigateToJob(true);
      };
      $scope.ssiKeyBack=function(){
        $scope.navigateToJob(false);
      };*/

      /*
      var baseUrl='http://localhost:4000/api';
      baseUrl='http://ssiapi-alvchegov.rhcloud.com/api';
      //baseUrl='http://192.168.2.2:4000/api';

      $scope.params={};
      $scope.params.areaType=1;
      $scope.params.km=30;
      $scope.params.time=60;
      $scope.params.history=5;
      $scope.params.fulltime=true;
      $scope.params.isco2='';
      $scope.params.swissdoc2='';
      if ($scope.params.search===undefined) {
        $scope.params.search = 'jobs';
      }
      $scope.locations=[];
      $scope.stops=[];
      $rootScope.resultCollection=[];
      $rootScope.visitedJobs=[];
      $scope.stellen='';
      $scope.favorite=[];
      $scope.favoritePage=false;

      if ($scope.coords===undefined) {
        geolocation.getLocation().then(function (data) {
          $scope.coords = {lat: data.coords.latitude, lng: data.coords.longitude};
        });
      }

      if ($scope.homeCoords===undefined) {
        geolocation.getLocation().then(function (data) {
          $scope.homeCoords = {lat: data.coords.latitude, lng: data.coords.longitude};
        });
      }

      $scope.$on('$routeChangeSuccess', function(event, next){
        if (next.$$route.originalPath==='/startpage'){
          $scope.resetParams();
        }
      });

      $scope.setIscoGroup=function(isco){
        $scope.params.isco=isco;
        $scope.params.isco2='';
        $location.path('/search');
      };

      $scope.setSwissdocGroup=function(swissdoc){
        $scope.params.swissdoc=swissdoc;
        $scope.params.swissdoc2='';
        $location.path('/search');
      };

      $scope.getSearchFilter=function(){
        return 'template/filter/'+$scope.params.search+'.html';
      };

      $scope.getCategory=function(){
        return 'template/category/'+$scope.params.search+'.html';
      };

      $scope.getResult=function(){
        return 'template/result/'+$scope.params.search+'.html';
      };

      $scope.getTemplate=function(template){
        return 'template/'+template+'/'+$scope.params.search+'.html';
      };

      $rootScope.setCurrentCoords=function(coords){
        $scope.coords = coords;
      };
      $rootScope.setHomeCoords=function(coords){
        $scope.homeCoords = coords;
      };

      $scope.searchAll=function(){
        $scope.params.isco='';
        $scope.params.isco2=false;
        $location.path('/search');
      };

      $scope.showTimeInH=function(){
        var hour = Math.floor($scope.params.time/60);
        var minute = $scope.params.time-(hour*60);
        if (minute<10){
          minute=minute+'0';
        }
        if ($scope.params.areaType===2){
          return hour+":"+minute+' h';
        }
        return '';
      };

      $scope.showDistanceInKM=function(){
        if ($scope.params.areaType===1){
          return $scope.params.km+' km';
        }
        return '';
      };

      $scope.find=function(){
        $scope.idle=true;
        var param = {};

        if ($scope.params.search==='jobs') {
          var isco = $scope.params.isco || '';
          var isco2 = $scope.params.isco2 || '';
          param = {
            plz: $scope.locations,
            isco: isco,
            isco2: isco2,
            fulltime: $scope.params.fulltime,
            history: $scope.params.history
          };
        }
        else if ($scope.params.search==='lenas'){
          param = {plz: $scope.locations, swissdoc: $scope.params.swissdoc};
        }
        $http.post(baseUrl+'/'+$scope.params.search+'/getJobs', param).success(function(result){
          $rootScope.resultCollection = result.jobs;
        });
        $scope.idle=false;
        $location.path('/results');
      };

      $scope.showFavorite=function(){
        $scope.favoritePage=true;
        if ($scope.favorite.length>0){
          $http.post(baseUrl+'/jobs/getJobsById', {jobid: $scope.favorite}).success(function(jobs){
            $rootScope.resultCollection = jobs.jobs;
          });
        }
      };

      $scope.unshowFavorite=function(){
        $scope.favoritePage=false;
        $scope.find();
      };

      $scope.isStarred=function(id){
        return ($scope.favorite.indexOf(id)===-1) ? false : true;
      };

      $scope.star=function(id){
        if ($scope.favorite.indexOf(id)===-1){
          $scope.favorite.push(id);
        }
      };


      var orderBy = $filter('orderBy');
      $scope.sortList=[
        {code:{field:'ONLINE_SEIT',order:false}, text:'search.sort.neuste'},
        {code:{field:'UNBEFRISTET_B',order:true}, text:'search.sort.unbefristet'},
        {code:{field:'UNBEFRISTET_B',order:false}, text:'search.sort.befristet'},
        {code:{field:'PENSUM_BIS',order:true}, text:'search.sort.pensum_0'},
        {code:{field:'PENSUM_BIS',order:false}, text:'search.sort.pensum_100'},
        {code:{field:'BEZEICHNUNG',order:false}, text:'search.sort.jobtitel_az'},
        {code:{field:'BEZEICHNUNG',order:true}, text:'search.sort.jobtitel_za'}
      ];
      $scope.sort=null;
      $scope.sortResultList=function(sort){
        //console.log(sortList[sort].code);
        $scope.sort=sort;
        $rootScope.resultCollection = orderBy($rootScope.resultCollection, $scope.sortList[sort].code.field, $scope.sortList[sort].code.order);
      };

      $scope.visited=function(index){
        return (lodash.indexOf($rootScope.visitedJobs,index)!==-1);
      };

      $scope.resetParams=function(){
        $scope.params={};
        $scope.params.areaType=1;
        $scope.params.km=30;
        $scope.params.time=60;
        $scope.params.history=5;
        $scope.params.fulltime=true;
        $scope.params.isco2='';
        $scope.params.swissdoc2='';
        if ($scope.params.search===undefined) {
          $scope.params.search = 'jobs';
        }
        $scope.locations=[];
        $scope.stops=[];
        $rootScope.resultCollection=[];
        $rootScope.visitedJobs=[];
        $scope.stellen='';
        $scope.favorite=[];
        $scope.favoritePage=false;
        $scope.coords=$scope.homeCoords;
      };

      // SSI Tastatur
      $scope.ssiKeyStart=function(){
        $location.path('/startpage');
      };
      $scope.ssiKeyInfo=function(){
        $location.path('/frontpage');
      };
      function ssiKeyBack(location){
        $location.path('/'+location);
      }
      $scope.ssiKeySearch=function(){
        ssiKeyBack('search');
      };
      $scope.ssiKeyResults=function(){
        ssiKeyBack('results');
      };
      $scope.ssiKeyNext=function(){
        $scope.navigateToJob(true);
      };
      $scope.ssiKeyBack=function(){
        $scope.navigateToJob(false);
      };


       areaType:1,
       km:30,
       time:60,
       history:5,
       fulltime:true,
       isco:'',
       isco2:'',
       search:'jobs'


       */
    });


}());



