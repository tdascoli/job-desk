'use strict';

angular.module('job-desk')
    .config(function ($stateProvider, $mdThemingProvider) {

        $mdThemingProvider.theme('default').primaryPalette('orange').accentPalette('blue-grey');

        $stateProvider
            .state('apprenticeships', {
                parent: 'site',
                url: '/apprenticeships',
                label: 'global.menu.apprenticeships',
                views: {
                    'content@': {
                        templateUrl: 'views/content/apprenticeships/apprenticeships.html',
                        controller: 'ApprenticeshipsCtrl'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('apprenticeships');
                        return $translate.refresh();
                    }]
                }
            })
            .state('apprenticeship-search', {
              parent: 'site',
              url: '/apprenticeship-search',
              views: {
                'content@': {
                  templateUrl: 'views/content/apprenticeships/search.html',
                  controller: 'ApprenticeshipsCtrl'
                }
              },
              resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                  $translatePartialLoader.addPart('apprenticeships');
                  return $translate.refresh();
                }]
              }
            })
            .state('apprenticeship-result', {
              parent: 'site',
              url: '/apprenticeship-result',
              views: {
                'content@': {
                  templateUrl: 'views/content/apprenticeships/result.html',
                  controller: 'ApprenticeshipsCtrl'
                }
              },
              resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                  $translatePartialLoader.addPart('apprenticeships');
                  return $translate.refresh();
                }]
              }
            });
    });
