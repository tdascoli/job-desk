;(function() {

  'use strict';

  angular.module('job-desk')
    .controller('ApprenticeshipsCtrl', function ($scope, $rootScope, ApprenticeshipsService) {

      $scope.searchParams = {};

      $scope.apprenticeships = $rootScope.apprenticeships;

      $scope.executeSearch = function() {
        ApprenticeshipsService.find($scope.searchParams).success(function(result) {
          $scope.apprenticeships = result;
        })
      }

    });


}());



