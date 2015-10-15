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
          return moment().diff(moment(publicationDate, "YYYY-MM-DD"), 'days');
        };

        scope.showDetail=function(ev,jobObject){
          element.addClass('visited');
          scope.showDetailContent=!scope.showDetailContent;
        };

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
}());



