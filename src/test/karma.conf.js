// Karma configuration
// Generated on Tue Aug 04 2015 11:16:45 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-jquery','jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../../dist/scripts/*.vendor.js',
      '../main/bower_components/angular-mocks/angular-mocks.js',
      '../main/scripts/app/app.js',
      '../main/scripts/app/app.constants.js',
      '../main/scripts/app/localInfo/localInfo.js',
      '../main/scripts/app/localInfo/localInfo.controller.js',
      '../main/scripts/app/apprenticeships/apprenticeships.js',
      '../main/scripts/app/apprenticeships/apprenticeships.service.js',
      '../main/scripts/app/apprenticeships/apprenticeships.controller.js',
      '../main/scripts/app/educations/educations.js',
      '../main/scripts/app/educations/educations.service.js',
      '../main/scripts/app/educations/educations.controller.js',
      '../main/scripts/app/jobs/jobs.js',
      '../main/scripts/app/jobs/jobs.service.js',
      '../main/scripts/app/jobs/jobs.controller.js',
      '../main/scripts/app/jobs/jobs.directive.js',
      '../main/scripts/aspects/directive.js',
      '../main/scripts/components/locations/locations.service.js',
      '../main/views/navbar/navbar.html',
      'helpers/*.js',
      'unit/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      '../main/scripts/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
