;(function () {
  'use strict';

  var app = angular.module('job-desk', [
    'LocalStorageModule',
    'tmh.dynamicLocale',
    'ui.router',
    'ui.bootstrap-slider',
    'ngResource',
    'ngCookies',
    'ngFlowtype',
    'ngKeypad',
    'pascalprecht.translate',
    'ngCacheBuster',
    'geolocation',
    'alv-ch-ng.core',
    'alv-ch-ng.security',
    'alv-ch-ng.scroll',
    'alv-ch-ng.forms',
    'alv-ch-ng.selectpicker',
    'alv-ch-ng.text-truncate',
    'job-desk.i18n',
    'job-desk.directive'
  ]);

  app.config(["$httpProvider", function($httpProvider) {
    $httpProvider.defaults.headers.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('authInterceptor');
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['If-Modified-Since'] = '01 Jan 1970 00:00:00 GMT';
  }]);

  app.config(function ($stateProvider, $urlRouterProvider, httpRequestInterceptorCacheBusterProvider, SecurityConfigProvider) {

    SecurityConfigProvider.setClientId('job-desk');
    SecurityConfigProvider.setClientSecret('job-deskSecret');


    //Cache everything except rest api requests
    httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*rest.*/, /.*protected.*/], true);

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('site', {
      'abstract': true,
      views: {
        'navbar@': {
          templateUrl: 'views/navbar/navbar.html',
          controller: 'NavbarCtrl'
        },
        'footer@': {
          templateUrl: 'views/footer/footer.html'
        }
      }
    });

  });

  app.config(function ($stateProvider) {
    $stateProvider
      .state('error', {
        parent: 'site',
        url: '/error',
        data: {
          roles: [],
          hidden: true
        },
        views: {
          'content@': {
            templateUrl: 'views/content/error/error.html'
          }
        },
        resolve: {
          mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
            $translatePartialLoader.addPart('errors');
            return $translate.refresh();
          }]
        },
        hidden: true
      })
      .state('frontpage', {
        parent: 'site',
        url: '/frontpage',
        views: {
          'content@': {
            templateUrl: 'views/content/localInfo/localInfo.html'
          }
        }
      })
  });

  app.run(function(geolocation,$rootScope){
    geolocation.getLocation().then(function(data){
      $rootScope.myCoords = {lat:data.coords.latitude, lng:data.coords.longitude};
    });
  });

}());
