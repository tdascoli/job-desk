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
            });
    });
