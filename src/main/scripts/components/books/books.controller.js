;(function() {

  'use strict';

  angular.module('job-desk')
    .controller('BooksCtrl', function ($scope, $rootScope, BooksService) {

      $scope.searchParams = {};

      $scope.books = $rootScope.books;

      $scope.executeSearch = function() {
        BooksService.find($scope.searchParams).success(function(result) {
          $scope.books = result;
        })
      }

    });


}());



