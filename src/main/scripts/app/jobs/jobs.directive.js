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

  module.directive('jobDetail', ['$translate','$sce','$mdDialog', '$timeout', function($translate,$sce,$mdDialog, $timeout){
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

        scope.onlineSinceDate=function(publicationDate){
          return moment().diff(publicationDate, 'days');
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

        scope.showPrintDialog = function() {
          $mdDialog.show({
            parent: angular.element(document.body),
            templateUrl: 'views/template/job-print.html',
            locals: {
              jobDetail: scope.jobDetail,
              getMultiLanguageText: scope.getMultiLanguageText,
              onlineSinceDate: scope.onlineSinceDate
            },
            escapeToClose: false,
            onComplete: function() {
              window.print();
              $timeout(function () {
                $mdDialog.hide();
              }, 3000);
            },
            controller: function PrintDialogController($scope, jobDetail, getMultiLanguageText, onlineSinceDate) {
              $scope.jobDetail = jobDetail;
              $scope.getMultiLanguageText = getMultiLanguageText;
              $scope.onlineSinceDate = onlineSinceDate;
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
              $scope.printJob = function() {
                window.print();
                $mdDialog.hide();
              };
              $scope.formatText = function(text) {
                text = text.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g,' ');
                return text;
              };
            }
          });
        };
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

}());



