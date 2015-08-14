;(function() {

  'use strict';

  var module = angular.module('job-desk');

  module.directive('apprenticeshipDetail', ['$translate', function($translate){
    return {
      priority: 10,
      restrict: 'A',
      scope: {
        apprenticeshipDetail: '='
      },
      templateUrl: 'template/apprenticeship-detail.html',
      link: function(scope){

        scope.getMultiLanguageText=function(text){
          return text[$translate.use()];
        };
      }
    };
  }]);

}());



