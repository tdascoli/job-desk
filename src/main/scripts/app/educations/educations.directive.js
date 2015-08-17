;(function() {

  'use strict';

  var module = angular.module('job-desk');

  module.directive('educationDetail', ['$translate', function($translate){
    return {
      priority: 10,
      restrict: 'A',
      scope: {
        educationDetail: '='
      },
      templateUrl: 'template/education-detail.html',
      link: function(scope){

        scope.getMultiLanguageText=function(text){
          return text[$translate.use()];
        };
      }
    };
  }]);

}());



