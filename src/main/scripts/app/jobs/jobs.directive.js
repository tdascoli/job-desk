;(function() {

  'use strict';

  var module = angular.module('job-desk');

  module.directive('help', function(){
    return {
      priority: 10,
      restrict: 'E',
      replace: true,
      templateUrl: 'template/help.html',
      link: function(scope, element){
        element.addClass('example');

      }
    };
  });

  module.directive('jobDetail', ['$translate','$sce', function($translate,$sce){
    return {
      priority: 10,
      restrict: 'A',
      scope: {
        jobDetail: '='
      },
      templateUrl: 'template/job-detail.html',
      link: function(scope, element){
        scope.showDetailContent=false;

        scope.getMultiLanguageText=function(text){
          return text[$translate.use()];
        };

        scope.getExternalUrl=function(link){
          return $sce.trustAsResourceUrl(link);
        };

        scope.showDetail=function(){
          element.addClass('visited');
          scope.showDetailContent=!scope.showDetailContent;
        };
      }
    };
  }]);

  module.directive('formAlert', ['$compile',function($compile){
    return {
      priority: 5,
      restrict: 'A',
      link: function(scope, element, attrs){
        var trigger = attrs.formAlertTrigger || true;
        var severity = attrs.alertSeverity || 'info';
        var dismissable = attrs.alertDismissable || false;
        var dismissableText = attrs.alertDismissableText || false;
        var alert=angular.element('<alert ng-show="'+trigger+'" alert-severity="'+severity+'" alert-dismissable="'+dismissable+'"><strong translate="'+attrs.formAlert+'"></strong></alert>');
        if (dismissableText){
          alert.attr('alert-dismissable-text',dismissableText);
        }
        alert.addClass('form-alert');
        $compile(alert)(scope);
        element.after(alert);
      }
    };
  }]);

}());



