'use strict';

angular.module('job-desk')
  .config(function ($stateProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('blue-grey');

    $stateProvider
      .state('config', {
        parent: 'site',
        url: '/config',
        views: {
          'content@': {
            templateUrl: 'views/content/config/config.html',
            controller: 'ConfigCtrl'
          }
        },
        resolve: {
          mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
            $translatePartialLoader.addPart('config');
            return $translate.refresh();
          }]
        }
      });
  });
