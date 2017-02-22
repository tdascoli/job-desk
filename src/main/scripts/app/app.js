;(function () {
  'use strict';

  var app = angular.module('job-desk', [
    'LocalStorageModule',
    'tmh.dynamicLocale',
    'ui.router',
    'ui.router.stateHelper',
    'ngResource',
    'ngSanitize',
    'ngCookies',
    'ngAnimate',
    'ngMaterial',
    'ngLodash',
    'pascalprecht.translate',
    'ngCacheBuster',
    'geolocation',
    'alv-ch-ng.security',
    'alv-ch-ng.text-truncate',
    'job-desk.i18n',
    'job-desk.directive',
    'presence',
    'angular-tour'
  ]);

  app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('authInterceptor');
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['If-Modified-Since'] = '01 Jan 1970 00:00:00 GMT';
  }]);

  app.config(function ($stateProvider, $urlRouterProvider, httpRequestInterceptorCacheBusterProvider, SecurityConfigProvider, $mdThemingProvider, $provide) {

    SecurityConfigProvider.setClientId('job-desk');
    SecurityConfigProvider.setClientSecret('job-deskSecret');


    //Cache everything except rest api requests
    httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*rest.*/, /.*protected.*/], true);

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('site', {
      'abstract': true
    });

    $mdThemingProvider.theme('toast-success');
    $mdThemingProvider.theme('toast-error');

    $mdThemingProvider.theme('jobs').primaryPalette('blue', {'default':'700'}).accentPalette('blue-grey');

    $mdThemingProvider.theme('educations').primaryPalette('light-green', {'default':'700'}).accentPalette('blue-grey');

    $mdThemingProvider.theme('apprenticeships').primaryPalette('cyan', {'default':'700'}).accentPalette('blue-grey');

    $mdThemingProvider.setDefaultTheme('jobs');

    // catch all exceptions and send them to trackJS
    $provide.decorator('$exceptionHandler', ['$delegate', '$window', function ($delegate, $window) {
      return function (exception, cause) {
        if ($window.trackJs) {
          $window.trackJs.track(exception);
        }
        // (Optional) Pass the error through to the delegate formats it for the console
        $delegate(exception, cause);
      };
    }]);
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
          mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
            $translatePartialLoader.addPart('errors');
            return $translate.refresh();
          }]
        },
        hidden: true
      })
      .state('information', {
        parent: 'site',
        url: '/information',
        views: {
          'content@': {
            templateUrl: 'views/content/localInfo/localInfo.html',
            controller: 'LocalInfoCtrl'
          }
        }
      });
  });

  app.run(function ($http, geolocation, $rootScope, $state, $cookies, LocationsService, ConfigService, UpdateService, PresenceService) {

    $rootScope.mobile = $.browser.mobile;
    $rootScope.searchType = 'jobs';

    $rootScope.searchState = function () {
      if ($state.$current.url.source === '/' || $state.$current.url.source === '/jobs' || $state.$current.url.source === '/apprenticeships' || $state.$current.url.source === '/educations') {
        return true;
      }
      return false;
    };

    var menuEv;
    $rootScope.openMenu = function ($mdOpenMenu, ev) {
      menuEv = ev;
      $mdOpenMenu(ev);
    };
    $rootScope.closeMenu = function (target) {
      menuEv = null;
      $state.go(target);
    };

    $rootScope.appConfig = ConfigService.init();
    $rootScope.geoIdle = true;

    var config = $cookies.getObject('config');
    if (!angular.isObject(config)) {
      geolocation.getLocation().then(function (data) {
        // geolocation received from browser
        LocationsService.checkLocation({lat: data.coords.latitude, lon: data.coords.longitude}, function (coords) {
          $rootScope.myCoords = coords;
          $rootScope.geoIdle = false;
        });
      }, function () {
        // user blocked geolocation or browser doesn't support it
        $rootScope.myCoords = LocationsService.getDefaultLocation();
        $rootScope.geoIdle = false;
      });
    }
    else {
      $rootScope.myCoords = config.coords;
      $rootScope.geoIdle = false;
    }

    $rootScope.back = function () {
      $state.go($rootScope.searchType);
    };

    // detection of user inactivity
    $rootScope.userActive = PresenceService.userActive;

    UpdateService.init();
  });

}());
