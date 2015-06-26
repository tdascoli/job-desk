'use strict';

angular.module('job-desk')
    .config(function ($stateProvider) {
        $stateProvider
            .state('localInfo', {
                parent: 'site',
                url: '/localInfo',
                sequence: 0,
                label: 'global.menu.localInfo',
                hidden: true,
                views: {
                    'content@': {
                        templateUrl: 'views/content/localInfo/localInfo.html',
                        controller: 'LocalInfoController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('localInfo');
                        return $translate.refresh();
                    }]
                }
            });
    });
