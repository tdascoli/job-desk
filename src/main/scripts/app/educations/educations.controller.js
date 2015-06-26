;(function() {

  'use strict';

  angular.module('job-desk')
    .controller('EducationsCtrl', function ($scope, $rootScope, EducationsService) {

      $scope.searchParams = {};

      $scope.educations = $rootScope.educations;

      $scope.executeSearch = function() {
        EducationsService.find($scope.searchParams).success(function(result) {
          $scope.educations = result;
        })
      }

    });


}());



