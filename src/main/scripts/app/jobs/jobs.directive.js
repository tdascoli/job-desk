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

  module.directive('jobDetail', ['$translate','$sce','$mdDialog', function($translate,$sce,$mdDialog){
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

        scope.showDetail=function(ev,jobObject){
          if (jobObject.external==='false') {
            scope.showInternalJob();
          }
          else {
            scope.showExternalJob(ev,jobObject);
          }
        };

        scope.showInternalJob=function(){
          element.addClass('visited');
          scope.showDetailContent=!scope.showDetailContent;
        };

        scope.showExternalJob = function(ev,jobObject) {
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/template/external-job-detail.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
              language: $translate.use(),
              jobDetail: jobObject
            }
          });
        };

        scope.printJob = function(jobId) {
          var innerContent = document.getElementById(jobId).innerHTML;
          var popup = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
          popup.document.write('<html><head></head><body onload="window.print();window.close()">' + innerContent + '</html>');
          popup.document.close();
        };

        function DialogController($scope, $mdDialog, $sce, language, jobDetail) {
          $scope.jobDetail = jobDetail;
          $scope.language = language;

          $scope.getExternalUrl = function (link) {
            return $sce.trustAsResourceUrl(link);
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };
        }
      }
    };
  }]);

  module.directive('jdExternalDetail', ['$window',function($window){
    return {
      priority: 5,
      restrict: 'C',
      link: function(scope, element){
        var viewportWidth = $($window).width()*0.8;
        var viewportHeight = $($window).height()*0.8;

        if (viewportWidth>768 && viewportWidth<=1024){
          viewportWidth=1024;
        }
        else if (viewportWidth>1024){
          viewportWidth=1200;
        }

        element.css('height',viewportHeight);
        element.css('width',viewportWidth);
      }
    };
  }]);

  module.directive('jobPrint', ['$translate',function($translate){
    return {
      priority: 10,
      restrict: 'E',
      scope: {
        job: '='
      },
      templateUrl: 'template/job-print.html',
      link: function(scope){
        scope.getMultiLanguageText=function(text){
          return text[$translate.use()];
        };
      }
    };
  }]);

}());



