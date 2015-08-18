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

        scope.checkLanguage=function(lang){
          if (lang!=='ger' && lang!=='de' && lang!=='eng' && lang!=='en' && lang!=='fre' && lang!=='fr' && lang!=='ita' && lang!=='it'){
            return 'other';
          }
          return lang;
        };
      }
    };
  }]);

}());



