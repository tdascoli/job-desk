;(function() {
  'use strict';


  /**
   * Common constants
   */
  angular.module('job-desk').constant('supportedLanguages', ['de', 'fr', 'it', 'en']);
  angular.module('job-desk').constant('baseUrl', 'http://localhost:4000/api');

  angular.module('job-desk').config(function(LanguageServiceProvider, supportedLanguages) {
    LanguageServiceProvider.setLanguages(supportedLanguages);

    /*
    var baseUrl='http://localhost:4000/api';
    baseUrl='http://ssiapi-alvchegov.rhcloud.com/api';
    */
  });

}());

