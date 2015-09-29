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
    'cfp.hotkeys',
    'alv-ch-ng.security',
    'alv-ch-ng.text-truncate',
    'job-desk.i18n',
    'job-desk.directive',
    'pdf'
  ]);

  app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('authInterceptor');
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['If-Modified-Since'] = '01 Jan 1970 00:00:00 GMT';
  }]);

  app.config(function ($stateProvider, $urlRouterProvider, httpRequestInterceptorCacheBusterProvider, SecurityConfigProvider, $mdThemingProvider) {

    SecurityConfigProvider.setClientId('job-desk');
    SecurityConfigProvider.setClientSecret('job-deskSecret');


    //Cache everything except rest api requests
    httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*rest.*/, /.*protected.*/], true);

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('site', {
      'abstract': true
    });

    $mdThemingProvider.theme('jobs').primaryPalette('blue').accentPalette('blue-grey');

    $mdThemingProvider.theme('educations').primaryPalette('indigo').accentPalette('blue-grey');

    $mdThemingProvider.theme('apprenticeships').primaryPalette('teal').accentPalette('blue-grey');

    $mdThemingProvider.setDefaultTheme('jobs');
  });

  app.config(function ($stateProvider, hotkeysProvider) {
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
      });

    //hotkeys configuration
    hotkeysProvider.includeCheatSheet = false;
  });

  app.run(function($http, geolocation, $rootScope, $state, $cookies){

    $rootScope.mobile=$.browser.mobile;
    $rootScope.appConfig={
      educations:true,
      apprenticeships:true
    };

    $rootScope.current=function(){
      if ($state.$current.url.source==='/' || $state.$current.url.source==='/jobs' || $state.$current.url.source==='/apprenticeships' || $state.$current.url.source==='/educations'){
        return 'info_outline';
      }
      return 'keyboard_arrow_left';
    };

    var menuEv;
    $rootScope.openMenu=function($mdOpenMenu, ev){
      menuEv = ev;
      $mdOpenMenu(ev);
    };
    $rootScope.closeMenu=function(target){
      menuEv=null;
      $state.go(target);
    };

    var config = $cookies.getObject('config');
    if (!angular.isObject(config)) {
      geolocation.getLocation().then(function (data) {
        if ($rootScope.myCoords === undefined) {
          $rootScope.myCoords = {lat: data.coords.latitude, lon: data.coords.longitude};
        }
      });
    }
    else {
      $rootScope.appConfig=config;
      $rootScope.myCoords=config.coords;
    }

    $rootScope.back=function(){
      if ($state.$current.url.source==='/' || $state.$current.url.source==='/jobs' || $state.$current.url.source==='/apprenticeships' || $state.$current.url.source==='/educations'){
        $state.go('localInfo');
      }
      // Jobs
      else if ($state.$current.url.source==='/job-search' || $state.$current.url.source==='/config'){
        $state.go('jobs');
      }
      else if ($state.$current.url.source==='/job-results'){
        $state.go('job-search');
      }
      // Apprenticeship
      else if ($state.$current.url.source==='/apprenticeship-search'){
        $state.go('apprenticeships');
      }
      else if ($state.$current.url.source==='/apprenticeship-results'){
        $state.go('apprenticeship-search');
      }
      // Education
      else if ($state.$current.url.source==='/education-search'){
        $state.go('educations');
      }
      else if ($state.$current.url.source==='/education-results'){
        $state.go('education-search');
      }
      // Infopage
      else if ($state.$current.url.source==='/localInfo'){
        $state.go($rootScope.searchType);
      }
    };

    // SSI Tastatur
    $rootScope.ssiKeyStart=function(){
      $state.go('jobs');
    };
    $rootScope.ssiKeyInfo=function(){
      $state.go('localInfo');
    };

  });

}());
