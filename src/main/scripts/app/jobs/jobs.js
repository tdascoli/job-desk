'use strict';

angular.module('job-desk')
  .config(function ($stateProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('blue-grey');

    $stateProvider
      .state('jobs', {
        parent: 'site',
        url: '/',
        label: 'global.menu.jobs',
        views: {
          'content@': {
            templateUrl: 'views/content/jobs/jobs.html',
            controller: 'JobsCtrl'
          }
        },
        resolve: {
          mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
            $translatePartialLoader.addPart('jobs');
            $translatePartialLoader.addPart('isco');
            return $translate.refresh();
          }]
        }
      })
      .state('job-search', {
        parent: 'site',
        url: '/job-search',
        views: {
          'content@': {
            templateUrl: 'views/content/jobs/search.html',
            controller: 'JobsCtrl'
          }
        },
        resolve: {
          mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
            $translatePartialLoader.addPart('jobs');
            $translatePartialLoader.addPart('isco');
            return $translate.refresh();
          }]
        }
      })
      .state('job-results', {
        parent: 'site',
        url: '/job-results',
        views: {
          'content@': {
            templateUrl: 'views/content/jobs/result.html',
            controller: 'JobsCtrl'
          }
        },
        resolve: {
          mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
            $translatePartialLoader.addPart('jobs');
            $translatePartialLoader.addPart('isco');
            return $translate.refresh();
          }]
        }
      });
  });
