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
                        return $translate.refresh();
                    }]
                }
            });
    });
