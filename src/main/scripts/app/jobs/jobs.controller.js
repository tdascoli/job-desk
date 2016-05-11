;(function () {

  'use strict';

  //** todo Location stuff in external controller, how to implement?! three functions in three controllers for the same ex. setNewCoords

  angular.module('job-desk')
    .controller('JobsCtrl', function ($scope, $rootScope, $state, $filter, $translate, lodash, JobsService, LocationsService, ArrleeService, TravelTimeService, $mdDialog) {
      $rootScope.searchType = 'jobs';
      $scope.searchParams = JobsService.params;
      $scope.searchParams.from = 0;

      $scope.distanceOptions = {min: 10, max: 150, step: 10, value: 30};
      $scope.transportOptions = {min: 10, max: 120, step: 5, value: 30};
      $scope.driveOptions = {min: 10, max: 60, step: 5, value: 30};

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

      $scope.count = 0;
      $scope.nearestZip = '';
      $scope.currentZip = $scope.searchParams.currentZip;
      $scope.heatmap = undefined;
      $scope.idle = false;
      $scope.lastOpenedJob = {'scope': null};

      $scope.setIscoGroup = function (isco) {
        $scope.searchParams.iscoMajorGroup = isco;
        $scope.searchParams.iscoGroupLevel3 = '';
        $state.go('job-search');
      };
      $scope.setIscoMinorGroup = function (majorGroup, minorGroup) {
        $scope.searchParams.iscoMajorGroup = majorGroup;
        $scope.searchParams.iscoGroupLevel3 = minorGroup;
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
        console.log('countJobs',$scope.count);
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
        if ($scope.searchParams.from < $scope.count) {
          $scope.idle = true;

          var from = $scope.searchParams.from;
          from += $scope.searchParams.size;
          if (from > $scope.count) {
            from = $scope.count;
          }
          $scope.searchParams.from = from;
          find(true);
        }
      };

      function findByTravelTime() {
        ArrleeService.getHeatmap($scope.searchParams.currentZip, $scope.searchParams.travelTime).success(function (result) {
            $scope.heatmap = result.heatmap;
            ArrleeService.getZips($scope.searchParams.travelTime).success(function (result) {
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
        TravelTimeService.getTravelTimePolygon($scope.searchParams.currentCoords,$scope.searchParams.travelTime,$scope.searchParams.distanceType).success(function (result) {
          // todo find?!
          $scope.traveltime=result;
          $scope.searchParams.shape=result.response.geometry.coordinates;
          find(false);
        })
        .error(function (error) {
          console.error(error);
        });
      }

      function find(scroll) {
        console.log('find',$scope.count);
        JobsService.find().success(function (result) {
            if (scroll && angular.isArray($rootScope.jobs)) {
              $rootScope.jobs = $rootScope.jobs.concat(result.hits.hits);
            }
            else {
              $rootScope.jobs = result.hits.hits;
            }
            $scope.count = result.hits.total;
            $scope.idle = false;

            console.log('find ende',$scope.count,$rootScope.jobs.length);
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
        console.log('setNewCoords',coords,$scope.searchParams.currentCoords);
        $scope.idle = true;
        LocationsService.getLocation(coords).success(function (nearestZip) {
            if (nearestZip.hits.total > 0) {
              $scope.searchParams.currentCoords = coords;
              $scope.searchParams.currentZip = parseInt(nearestZip.hits.hits[0]._source.zip, 10);
              $scope.currentZip = $scope.searchParams.currentZip;
              $scope.nearestZip = nearestZip.hits.hits[0]._source.zip + ' (' + nearestZip.hits.hits[0]._source.name + ')';

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

      $scope.setMyLocation = function () {
        setNewCoords($rootScope.myCoords);
      };

      $scope.setCurrentCoords = function (coords) {
        setNewCoords(coords);
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

      // todo location autocompleter
      /*
      $scope.locationSearch = function (value) {
        LocationsService.getLocationAutocompleter(value,$scope.searchParams.currentCoords).success(function (locations) {
            return locations;
          })
          .error(function (error) {
            console.error(error);
          });
      };
      */

      $scope.sort = 0;
      $scope.sortList = [
        {sort: {field: 'publicationDate', order: 'desc'}, text: 'global.sort.newest'},
        {sort: {field: 'quotaTo', order: 'desc'}, text: 'global.sort.workload_0'},
        {sort: {field: 'quotaTo', order: 'asc'}, text: 'global.sort.workload_100'},
        {sort: {field: 'distance', order: 'asc'}, text: 'global.sort.distanceNearest'},
        {sort: {field: 'distance', order: 'desc'}, text: 'global.sort.distanceFarthest'}
      ];
      $scope.sortResultList = function () {
        $scope.searchParams.sort = $scope.sortList[$scope.sort].sort;
        $scope.countJobs();
      };


      if ($scope.searchParams.currentCoords !== undefined) {
        console.log('IF');
        //setNewCoords($scope.searchParams.currentCoords);
      }

      // user isn't active anymore : reset search params
      var resetListener = $rootScope.$on('resetSearchParams', function () {
        JobsService.resetSearchParams();
        JobsService.resetVisitedJobs();
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

      // instant translation
      $scope.translateKey=function(key){
        return $translate.instant(key);
      };

    });
}());



