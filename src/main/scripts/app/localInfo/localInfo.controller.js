'use strict';

angular.module('job-desk')
  .controller('LocalInfoCtrl', function ($rootScope,$scope,$sce) {

    $scope.getSrc = function() {
      return $sce.trustAsResourceUrl($rootScope.appConfig.localInfo);
    };

  });
