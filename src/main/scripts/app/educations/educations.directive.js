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
      link: function(scope, element){
        scope.showDetailContent=false;

        scope.getMultiLanguageText=function(text){
          return text[$translate.use()];
        };

        scope.showDetail=function(){
          element.addClass('visited');
          scope.showDetailContent=!scope.showDetailContent;
        };
      }
    };
  }]);

}());



