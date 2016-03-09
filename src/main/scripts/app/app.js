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

    $mdThemingProvider.theme('jobs').primaryPalette('light-blue').accentPalette('blue-grey');

    $mdThemingProvider.theme('educations').primaryPalette('indigo').accentPalette('blue-grey');

    $mdThemingProvider.theme('apprenticeships').primaryPalette('teal').accentPalette('blue-grey');

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
      .state('frontpage', {
        parent: 'site',
        url: '/frontpage',
        views: {
          'content@': {
            templateUrl: 'views/content/localInfo/localInfo.html'
          }
        }
      });
  });

  app.run(function ($http, geolocation, $rootScope, $state, $cookies, LocationsService, ConfigService, UpdateService, PresenceService, ENV) {

    $rootScope.mobile = $.browser.mobile;

    $rootScope.current = function () {
      if ($state.$current.url.source === '/' || $state.$current.url.source === '/jobs' || $state.$current.url.source === '/apprenticeships' || $state.$current.url.source === '/educations') {
        return 'info_outline';
      }
      return 'home';
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

    $rootScope.myCoords = LocationsService.getDefaultLocation();

    var config = $cookies.getObject('config');
    if (!angular.isObject(config)) {
      geolocation.getLocation().then(function (data) {
        // geolocatigon received from browser
        if ($rootScope.myCoords === undefined) {
          LocationsService.checkLocation({lat: data.coords.latitude, lon: data.coords.longitude}, function (coords) {
            $rootScope.myCoords = coords;
          });
        }
      }, function () {
        // user blocked geolocation or browser doesn't support it
      });
    }
    else {
      $rootScope.myCoords = config.coords;
    }

    $rootScope.back = function () {
      $state.go($rootScope.searchType);
    };

    // detection of user inactivity
    $rootScope.userActive = PresenceService.userActive;

    if (ENV !== 'dev') {
      UpdateService.init();
    }

  });

}());
