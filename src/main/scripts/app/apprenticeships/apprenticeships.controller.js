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

      $scope.swissdocMajorGroup=[{text:'swissdoc.category1',code:'1'},{text:'swissdoc.category2',code:'2'},{text:'swissdoc.category3',code:'3'},{text:'swissdoc.category4',code:'4'},{text:'swissdoc.category5',code:'5'},{text:'swissdoc.category6',code:'6'},{text:'swissdoc.category7',code:'7'},{text:'swissdoc.category8',code:'8'}];

      $scope.swissdocGroupLevel2=[];
      $scope.swissdocGroupLevel2['1']=[
        {code:'11', text:'swissdoc.110'},
        {code:'12', text:'swissdoc.120'},
        {code:'13', text:'swissdoc.130'},
        {code:'14', text:'swissdoc.140'},
        {code:'15', text:'swissdoc.150'},
        {code:'16', text:'swissdoc.160'},
        {code:'17', text:'swissdoc.170'}
      ];
      $scope.swissdocGroupLevel2['2']=[
        {code:'21', text:'swissdoc.210'},
        {code:'22', text:'swissdoc.220'},
        {code:'23', text:'swissdoc.230'}
      ];
      $scope.swissdocGroupLevel2['3']=[
        {code:'31', text:'swissdoc.310'},
        {code:'32', text:'swissdoc.320'},
        {code:'33', text:'swissdoc.330'},
        {code:'34', text:'swissdoc.340'},
        {code:'35', text:'swissdoc.350'}
      ];
      $scope.swissdocGroupLevel2['4']=[
        {code:'41', text:'swissdoc.410'},
        {code:'42', text:'swissdoc.420'},
        {code:'43', text:'swissdoc.430'},
        {code:'44', text:'swissdoc.440'},
        {code:'45', text:'swissdoc.450'}
      ];
      $scope.swissdocGroupLevel2['5']=[
        {code:'51', text:'swissdoc.510'},
        {code:'52', text:'swissdoc.520'},
        {code:'53', text:'swissdoc.530'},
        {code:'54', text:'swissdoc.540'},
        {code:'55', text:'swissdoc.550'},
        {code:'56', text:'swissdoc.560'},
        {code:'57', text:'swissdoc.570'},
        {code:'58', text:'swissdoc.580'},
        {code:'59', text:'swissdoc.590'}
      ];
      $scope.swissdocGroupLevel2['6']=[
        {code:'61', text:'swissdoc.610'},
        {code:'62', text:'swissdoc.620'},
        {code:'63', text:'swissdoc.630'},
        {code:'64', text:'swissdoc.640'}
      ];
      $scope.swissdocGroupLevel2['7']=[
        {code:'71', text:'swissdoc.710'},
        {code:'72', text:'swissdoc.720'},
        {code:'73', text:'swissdoc.730'}
      ];
      $scope.swissdocGroupLevel2['8']=[
        {code:'81', text:'swissdoc.810'},
        {code:'82', text:'swissdoc.820'},
        {code:'83', text:'swissdoc.830'}
      ];


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
        {code:{field:'_source.titleM.'+$translate.use(),order:false}, text:'global.sort.jobtitel_az'},
        {code:{field:'_source.titleM.'+$translate.use(),order:true}, text:'global.sort.jobtitel_za'},
        {code:{field:'_source.company.address.zip',order:false}, text:'global.sort.location_1000'},
        {code:{field:'_source.company.address.zip',order:true}, text:'global.sort.location_9999'}
      ];
      $scope.sortResultList=function(){
        //var sort = lodash.findIndex($scope.sortList,$scope.sort);
        $rootScope.apprenticeships = orderBy($rootScope.apprenticeships, $scope.sortList[$scope.sort].code.field, $scope.sortList[$scope.sort].code.order);
      };

    });


}());



