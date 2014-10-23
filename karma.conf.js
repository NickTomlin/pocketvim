// Karma configuration
// Generated on Sat Feb 22 2014 08:35:46 GMT-0600 (CST)

module.exports = function(config) {
  config.set({

    basePath: '',

    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],

    files: [
      // application
      {pattern: 'app/scripts/modules/*.js', included: false},
      {pattern: 'app/scripts/*.js', included: false},
      'app/html/*.html',
      // testing
      {pattern: 'test/unit/*-test.js', included: false},
      'test/unit/support/*.html',
      {pattern: 'test/unit/support/*.js', included: false},
      'bower_components/codemirror/lib/*',
      // requirejs bootstrap for testing
      'test/unit/test-helper.js'
    ],

    // list of files to exclude
    exclude: [
      'app/scripts/requireConfig.js',
      'app/scripts/requireContent.js'
    ],

    preprocesors : {
      '**/*.html': 'html2js'
    },

    plugins: [
      'karma-jasmine',
      'karma-requirejs',
      'karma-chrome-launcher',
      'karma-html2js-preprocessor'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 7357,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
