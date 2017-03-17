;(function () {

  'use strict';

  angular.module('job-desk')
    .controller('JobsCtrl', function ($scope, $rootScope, $state, $filter, $translate, lodash, JobsService, LocationsService, ArrleeService, TravelTimeService, $mdDialog, $mdBottomSheet) {
      $rootScope.searchType = 'jobs';
      $scope.searchValues = JobsService.search;
      $scope.searchParams = JobsService.params;
      $scope.searchParams.from = 0;

      $scope.sliderOptions = {
        distance: {min: 10, max: 150, step: 10, value: 30},
        transport: {min: 10, max: 120, step: 5, value: 30},
        drive: {min: 10, max: 60, step: 5, value: 30},
        bike: {min: 10, max: 60, step: 5, value: 30}
      };

      $scope.onTabSelected=function(tab){
        console.log(tab);
      };

      $scope.iscoMajorGroup = [
        {text: 'isco.majorGroups.9', code: '9', img: 'jobs/isco9.png'},
        {text: 'isco.majorGroups.8', code: '8', img: 'jobs/isco8.png'},
        {text: 'isco.majorGroups.7', code: '7', img: 'jobs/isco7.png'},
        {text: 'isco.majorGroups.6', code: '6', img: 'jobs/isco6.png'},
        {text: 'isco.majorGroups.5', code: '5', img: 'jobs/isco5.png'},
        {text: 'isco.majorGroups.4', code: '4', img: 'jobs/isco4.png'},
        {text: 'isco.majorGroups.3', code: '3', img: 'jobs/isco3.png'},
        {text: 'isco.majorGroups.2', code: '2', img: 'jobs/isco2.png'},
        {text: 'isco.majorGroups.1', code: '1', img: 'jobs/isco1.png'}];
      $scope.iscoMinorGroups = {
        '1': ['111', '112', '121', '122', '130', '131', '132', '133', '134', '141', '142', '143'],
        '2': ['211', '212', '213', '214', '215', '216', '221', '222', '223', '224', '225', '226', '231', '232', '233', '234', '235', '241', '242', '243', '251', '252', '261', '262', '263', '264', '265'],
        '3': ['311', '312', '313', '314', '315', '321', '322', '323', '324', '325', '331', '332', '333', '334', '335', '341', '342', '343', '351', '352'],
        '4': ['411', '412', '413', '420', '421', '422', '431', '432', '441'],
        '5': ['511', '512', '513', '514', '515', '516', '521', '522', '523', '524', '531', '532', '541'],
        '6': ['611', '612', '613', '621', '622', '631', '632', '633', '634'],
        '7': ['711', '712', '713', '721', '722', '723', '731', '732', '741', '742', '751', '752', '753', '754'],
        '8': ['811', '812', '813', '814', '815', '816', '817', '818', '821', '831', '832', '833', '834', '835'],
        '9': ['911', '912', '921', '931', '932', '933', '941', '951', '952', '961', '962']
      };

      $scope.currentZip = $scope.searchParams.currentZip;
      $scope.nearestZip = $scope.searchValues.nearestZip;
      $scope.idle = false;
      $scope.lastOpenedJob = {'scope': null};

      $scope.setIscoGroup = function (isco) {
        $scope.searchParams.iscoMajorGroup = isco;
        $scope.searchParams.iscoGroupLevel3 = '';
        $scope.countJobs();
        $state.go('job-search');
      };
      $scope.setIscoMinorGroup = function (majorGroup, minorGroup) {
        $scope.searchParams.iscoMajorGroup = majorGroup;
        $scope.searchParams.iscoGroupLevel3 = minorGroup;
        $scope.countJobs();
        $state.go('job-search');
      };
      $scope.showIscoUnitGroup = function (ev, level, iscoMinorGroups) {
        $mdDialog.show({
            controller: iscoDialogController,
            templateUrl: 'views/template/job-list.html',
            locals: {
              level: level,
              iscoMinorGroups: iscoMinorGroups
            },
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function (answer) {
            if (answer > 0) {
              $scope.setIscoMinorGroup(level, answer);
            }
          });
      };

      function iscoDialogController($scope, $mdDialog, level, iscoMinorGroups) {
        $scope.level = level;
        $scope.iscoMinorGroups = iscoMinorGroups;

        $scope.hide = function () {
          $mdDialog.hide();
        };

        $scope.answer = function (answer) {
          $mdDialog.hide(answer);
        };
      }

      $scope.countJobs = function () {
        $scope.idle = true;
        $scope.searchParams.from = 0;

        if ($scope.searchParams.distanceType === 'transport') {
          //** countJobs with travelTime parameter
          findByTravelTime();
        }
        else if ($scope.searchParams.distanceType === 'drive' || $scope.searchParams.distanceType === 'bike') {
          //** countJobs with travelTime parameter
          findByDriveTime();
        }
        else {
          //** countJobs with distance parameter
          find(false);
        }
      };

      $scope.loadMoreResults = function () {
        if ($scope.searchParams.from < $scope.searchValues.count) {
          $scope.idle = true;

          var from = $scope.searchParams.from;
          from += $scope.searchParams.size;
          if (from > $scope.searchValues.count) {
            from = $scope.searchValues.count;
          }
          $scope.searchParams.from = from;
          find(true);
        }
      };

      function findByTravelTime() {
        ArrleeService.getHeatmap($scope.searchParams.currentZip, $scope.searchParams.transport).success(function (result) {
            $scope.searchValues.heatmap = result.heatmap;
            ArrleeService.getZips($scope.searchParams.transport).success(function (result) {
                // todo trackjs!! error
                $scope.searchParams.zips = lodash.map(result.POI, 'name');
                //** find Jobs with searchParams
                find(false);
              })
              .error(function (error) {
                console.error(error);
              });
          })
          .error(function (error) {
            console.error(error);
          });
      }

      function findByDriveTime() {
        var travelTime = $scope.searchParams.drive;
        if ($scope.searchParams.distanceType==='bike'){
          travelTime = $scope.searchParams.bike;
        }
        TravelTimeService.getTravelTimePolygon($scope.searchParams.currentCoords,travelTime,$scope.searchParams.distanceType).success(function (result) {
          $scope.searchValues.heatmap = result;
          $scope.searchParams.shape=result.response.geometry.coordinates;
          find(false);
        })
        .error(function (error) {
          console.error(error);
        });
      }

      function find(scroll) {
        JobsService.find().success(function (result) {
            if (scroll && angular.isArray($rootScope.jobs)) {
              $rootScope.jobs = $rootScope.jobs.concat(result.hits.hits);
            }
            else {
              $rootScope.jobs = result.hits.hits;
            }
            //$scope.count = result.hits.total;
            $scope.searchValues.count = result.hits.total;
            $scope.idle = false;
          })
          .error(function (error) {
            $scope.idle = false;
            console.error(error);
          });
      }

      $scope.showTimeInH = function (time) {
        var hour = Math.floor(time / 60);
        var minute = time - (hour * 60);
        if (minute < 10) {
          minute = '0' + minute;
        }
        return hour + ':' + minute;
      };

      function setNewCoords(coords) {
        if (coords!==undefined) {
          $scope.idle = true;
          LocationsService.getLocation(coords).success(function (nearestZip) {
            if (nearestZip.hits.total > 0) {
              $scope.searchParams.currentCoords = coords;

              $scope.searchParams.currentZip = parseInt(nearestZip.hits.hits[0]._source.zip, 10);
              $scope.currentZip = $scope.searchParams.currentZip;

              $scope.searchValues.nearestZip = nearestZip.hits.hits[0]._source.zip + ' ' + nearestZip.hits.hits[0]._source.name;
              $scope.nearestZip = $scope.searchValues.nearestZip;

              $scope.countJobs();
            }
            else {
              $scope.idle = false;
              $scope.locationError('errors.msg.noValidCoords');
            }
          })
          .error(function (error) {
            console.error(error);
          });
        }
      }

      $scope.setMyLocation = function () {
        setNewCoords($rootScope.myCoords);
      };

      $scope.setCurrentCoords = function (coords) {
        if (coords!==undefined && coords!==null) {
          setNewCoords(coords);
        }
      };

      $scope.$watchCollection('myCoords', function () {
        if ($rootScope.myCoords !== undefined && $scope.searchParams.currentCoords === undefined) {
          setNewCoords($rootScope.myCoords);
        }
      });

      $scope.setCurrentZip = function (zip) {
        if (!zip) {
          zip = $scope.currentZip;
        }
        LocationsService.getLocationFromZip(zip).success(function (nearestZip) {
            if (nearestZip.hits.total > 0) {
              setNewCoords(nearestZip.hits.hits[0]._source.geoLocation);
            }
            else {
              $scope.setCurrentZip($scope.searchParams.currentZip);
              $scope.locationError('errors.msg.noValidZip');
            }
          })
          .error(function (error) {
            console.error(error);
          });
      };

      $scope.locationError = function (errorKey) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .textContent($translate.instant(errorKey))
            .ariaLabel($translate.instant(errorKey))
            .ok('OK')
        );
      };

      $scope.sort = 0;
      $scope.sortList = [
        {sort: {field: 'publicationDate', order: 'desc'}, text: 'global.sort.newest'},
        {sort: {field: 'quotaTo', order: 'desc'}, text: 'global.sort.workload_0'},
        {sort: {field: 'quotaTo', order: 'asc'}, text: 'global.sort.workload_100'}
        //{sort: {field: 'distance', order: 'asc'}, text: 'global.sort.distanceNearest'},
        //{sort: {field: 'distance', order: 'desc'}, text: 'global.sort.distanceFarthest'}
      ];
      $scope.sortResultList = function () {
        $scope.searchParams.sort = $scope.sortList[$scope.sort].sort;
        $scope.countJobs();
      };

      // instant translation
      $scope.translateKey=function(key){
        return $translate.instant(key);
      };

      // user isn't active anymore : reset search params
      var resetListener = $rootScope.$on('resetSearchParams', function () {
        JobsService.resetSearchParams();
        JobsService.resetVisitedJobs();
        $scope.setMyLocation();
      });

      // unregister the state listener
      $scope.$on('$destroy', resetListener);

      // tour
      $scope.currentStep = -1;
      $scope.tourTranslate = function (key) {
        return $translate.instant(key);
      };
      $scope.tourEnded = function () {
        $scope.currentStep = -1;
      };
      $scope.startTour = function () {
        $scope.currentStep = 0;
      };

      // mobile filter
      $scope.isMobile=$rootScope.mobile;
      $scope.showListBottomSheet = function() {
        $mdBottomSheet.show({
          templateUrl: 'views/template/job-mobile-filter.html',
          scope: $scope,
          preserveScope: true,
          parent: 'body'
        });
      };
    });
}());



