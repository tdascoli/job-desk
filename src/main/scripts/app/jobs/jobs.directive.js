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
          return moment().diff(moment(publicationDate, 'YYYY-MM-DD'), 'days');
        };

        scope.showDetail=function(){
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
              $scope.formatTextToPrint = function(text) {
                // replace <br> tags by whitespace
                text = String(text).replace(/(<|&lt;)br\s*\/*(>|&gt;)/g,' ');
                // remove all html tags
                text = String(text).replace(/<[^>]+>/gm, ' ');
                return text;
              };
            }
          });
        };

        scope.containsQuota = function(jobTitle) {
          return (jobTitle.search('%') > -1);
        };

        scope.formatTextToShow = function(text) {
          // remove all html tags except <ul>, <li>, <br>
          return text ? String(text).replace(/((?!<((\/)?li|ul|br))<[^>]*>)/gi, ' ') : ' ';
        };
      }
    };
  }]);
}());



