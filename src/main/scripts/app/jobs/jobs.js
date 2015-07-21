'use strict';

angular.module('job-desk')
    .config(function ($stateProvider) {
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
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('jobs');
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
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                  $translatePartialLoader.addPart('jobs');
                  return $translate.refresh();
                }]
              }
            })
            .state('job-result', {
              parent: 'site',
              url: '/job-result',
              views: {
                'content@': {
                  templateUrl: 'views/content/jobs/result.html',
                  controller: 'JobsCtrl'
                }
              },
              resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                  $translatePartialLoader.addPart('jobs');
                  return $translate.refresh();
                }],
                jobsLoader: ['JobsService', function (JobsService) {
                  JobsService.find();
                }]
              }
            })
            .state('job-detail', {
              parent: 'site',
              url: '/job-detail/:jobId',
              views: {
                'content@': {
                  templateUrl: 'views/content/jobs/detail.html',
                  controller: 'JobsCtrl'
                }
              },
              resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                  $translatePartialLoader.addPart('jobs');
                  return $translate.refresh();
                }],
                jobDetailLoader: ['$stateParams','JobsService', function ($stateParams, JobsService) {
                  JobsService.getJob($stateParams.jobId);
                }]
              }
            })
    });
