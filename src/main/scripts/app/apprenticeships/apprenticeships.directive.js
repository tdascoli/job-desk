;(function () {

  'use strict';

  var module = angular.module('job-desk');

  module.directive('apprenticeshipDetail', ['$translate', '$mdDialog', '$timeout', function ($translate, $mdDialog, $timeout) {
    return {
      priority: 10,
      restrict: 'A',
      scope: {
        apprenticeshipDetail: '='
      },
      templateUrl: 'template/apprenticeship-detail.html',
      link: function (scope) {

        scope.getMultiLanguageText = function (text) {
          return text[$translate.use()];
        };

        scope.showPrintDialog = function () {
          $mdDialog.show({
            parent: angular.element(document.body),
            templateUrl: 'views/template/apprenticeship-print.html',
            locals: {
              apprenticeshipDetail: scope.apprenticeshipDetail,
              getMultiLanguageText: scope.getMultiLanguageText
            },
            escapeToClose: false,
            onComplete: function () {
              window.print();
              $timeout(function () {
                $mdDialog.hide();
              }, 3000);
            },
            controller: function PrintDialogController($scope, apprenticeshipDetail, getMultiLanguageText) {
              $scope.apprenticeshipDetail = apprenticeshipDetail;
              $scope.getMultiLanguageText = getMultiLanguageText;
              $scope.cancel = function () {
                $mdDialog.cancel();
              };
              $scope.formatText = function (text) {
                text = text.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ' ');
                return text;
              };
            }
          });
        };
      }
    };
  }]);

}());



