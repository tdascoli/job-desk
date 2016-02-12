;(function () {
  'use strict';

  var module = angular.module('job-desk.i18n', ['pascalprecht.translate', 'LocalStorageModule', 'tmh.dynamicLocale']);

  module.config(function ($translateProvider, tmhDynamicLocaleProvider, supportedLanguages) {
    // Initialize angular-translate
    $translateProvider.registerAvailableLanguageKeys(supportedLanguages, {
      'en_US': 'en',
      'en_UK': 'en',
      'de_DE': 'de',
      'de_CH': 'de',
      'fr_CH': 'fr',
      'it_CH': 'it',
      'fr_FR': 'fr',
      'it_IT': 'it'
    });
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: 'i18n/{lang}/{part}.json'
    });
    $translateProvider.useCookieStorage();
    $translateProvider.determinePreferredLanguage();
    $translateProvider.useSanitizeValueStrategy('sanitize');
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
    tmhDynamicLocaleProvider.useCookieStorage('NG_TRANSLATE_LANG_KEY');
  });

  module.run(function ($rootScope, $translate, LanguageService, $translatePartialLoader) {
    $rootScope.currentLanguage = false;

    $rootScope.changeLanguage = function (languageKey) {
      $translate.use(languageKey);
    };

    LanguageService.getAll().then(function (languages) {
      $rootScope.languages = languages;
    });


    $rootScope.$on('$stateChangeStart', function () {
      // Update the language
      LanguageService.getCurrent().then(function (language) {
        $rootScope.currentLanguage = language;
        $translate.use(language);
      });
    });

    (function addParts() {
      for (var i = 0; i < LanguageService.getDefaultParts().length; i++) {
        var part = LanguageService.getDefaultParts()[i];
        $translatePartialLoader.addPart(part);
      }
      $translate.refresh();
    })();

  });


  module.controller('LanguageCtrl', function ($scope, LanguageService) {
    $scope.getCurrent = LanguageService.getCurrent;
    $scope.getAll = LanguageService.getAll;
  });

  module.provider('LanguageService', function () {

    var _q, _http, _translate;

    var _languages = [
      'de', 'fr', 'it', 'en'
    ];

    var _defaultParts = ['global', 'languages', 'errors'];

    this.setLanguages = function (languages) {
      _languages = languages;
    };

    this.setDefaultParts = function (defaultParts) {
      _defaultParts = defaultParts;
    };

    function getCurrent() {
      {
        var deferred = _q.defer();
        var language = _translate.storage().get('NG_TRANSLATE_LANG_KEY');

        if (angular.isUndefined(language)) {
          language = 'en';
        }

        deferred.resolve(language);
        return deferred.promise;
      }
    }

    function getAll() {
      var deferred = _q.defer();
      deferred.resolve(_languages);
      return deferred.promise;
    }

    function getDefaultParts() {
      return _defaultParts;
    }

    this.$get = function ($q, $http, $translate) {
      _q = $q;
      _http = $http;
      _translate = $translate;
      return {
        getAll: getAll,
        getCurrent: getCurrent,
        getDefaultParts: getDefaultParts
      };
    };
  });

}());
