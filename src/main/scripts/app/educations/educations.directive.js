;(function () {

  'use strict';

  var module = angular.module('job-desk');

  module.directive('educationDetail', ['$translate', '$mdDialog', '$timeout', function ($translate, $mdDialog, $timeout) {
    return {
      priority: 10,
      restrict: 'A',
      scope: {
        educationDetail: '='
      },
      templateUrl: 'template/education-detail.html',
      link: function (scope, element) {
        scope.showDetailContent = false;

        scope.getMultiLanguageText = function (text) {
          return text[$translate.use()];
        };

        scope.showDetail = function () {
          element.addClass('visited');
          scope.showDetailContent = !scope.showDetailContent;
        };

        scope.checkLanguage = function (lang) {
          if (lang !== 'ger' && lang !== 'de' && lang !== 'eng' && lang !== 'en' && lang !== 'fre' && lang !== 'fr' && lang !== 'ita' && lang !== 'it') {
            return 'other';
          }
          return lang;
        };

        scope.showPrintDialog = function () {
          $mdDialog.show({
            parent: angular.element(document.body),
            templateUrl: 'views/template/education-print.html',
            locals: {
              educationDetail: scope.educationDetail,
              getMultiLanguageText: scope.getMultiLanguageText,
              checkLanguage: scope.checkLanguage
            },
            escapeToClose: false,
            onComplete: function () {
              window.print();
              $timeout(function () {
                $mdDialog.hide();
              }, 3000);
            },
            controller: function PrintDialogController($scope, educationDetail, getMultiLanguageText, checkLanguage) {
              $scope.educationDetail = educationDetail;
              $scope.getMultiLanguageText = getMultiLanguageText;
              $scope.checkLanguage = checkLanguage;
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



