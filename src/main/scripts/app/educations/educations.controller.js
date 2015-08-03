;(function() {

  'use strict';

  angular.module('job-desk')
    .controller('EducationsCtrl', function ($scope, $rootScope, EducationsService) {

      $rootScope.searchType='educations';
      $scope.searchParams = EducationsService.params;

      $scope.educations = $rootScope.educations;

      $scope.executeSearch = function() {
        EducationsService.find($scope.searchParams).success(function(result) {
          $scope.educations = result;
        });
      };

    });


}());



