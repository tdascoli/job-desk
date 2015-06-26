;(function() {

  'use strict';

  angular.module('job-desk')
    .controller('JobsCtrl', function ($scope, $rootScope, JobsService) {

      $scope.searchParams = {};

      $scope.jobs = $rootScope.jobs;

      $scope.executeSearch = function() {
        JobsService.find($scope.searchParams).success(function(result) {
          $scope.jobs = result;
        })
      }

    });


}());



