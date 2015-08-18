'use strict';

angular.module('job-desk')
    .config(function ($stateProvider) {
        $stateProvider
            .state('educations', {
                parent: 'site',
                url: '/educations',
                label: 'global.menu.educations',
                views: {
                    'content@': {
                        templateUrl: 'views/content/educations/educations.html',
                        controller: 'EducationsCtrl'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('educations');
                      $translatePartialLoader.addPart('swissdoc');
                        return $translate.refresh();
                    }]
                }
            })
          .state('education-search', {
            parent: 'site',
            url: '/education-search',
            views: {
              'content@': {
                templateUrl: 'views/content/educations/search.html',
                controller: 'EducationsCtrl'
              }
            },
            resolve: {
              mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                $translatePartialLoader.addPart('educations');
                $translatePartialLoader.addPart('swissdoc');
                return $translate.refresh();
              }]
            }
          })
          .state('education-results', {
            parent: 'site',
            url: '/education-results',
            views: {
              'content@': {
                templateUrl: 'views/content/educations/result.html',
                controller: 'EducationsCtrl'
              }
            },
            resolve: {
              mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                $translatePartialLoader.addPart('educations');
                $translatePartialLoader.addPart('swissdoc');
                return $translate.refresh();
              }]
            }
          });
    });
