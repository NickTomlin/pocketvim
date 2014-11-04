// Karma configuration
// Generated on Sat Feb 22 2014 08:35:46 GMT-0600 (CST)

module.exports = function(config) {
  config.set({

    basePath: '',

    // frameworks to use
    frameworks: ['requirejs', 'mocha'],

    files: [
      // application
      {pattern: 'app/scripts/modules/*.js', included: false},
      {pattern: 'app/scripts/*.js', included: false},
      {pattern: 'app/html/*.html', included: false},

      // test files
      {pattern: 'test/unit/*-test.js', included: false},
      {pattern: 'test/unit/support/*.js', included: false},
      'bower_components/codemirror/lib/*',

      // test utilities
      {pattern: 'node_modules/sinon/lib/**/*.js', included: false},
      {pattern: 'node_modules/chai/chai.js', included: false},
      {pattern: 'node_modules/text/text.js', included: false},

      // requirejs bootstrap for testing
      'test/unit/test-helper.js',
    ],

    // list of files to exclude
    exclude: [
      'app/scripts/requireConfig.js',
      'app/scripts/requireContent.js'
    ],

    plugins: [
      'karma-mocha',
      'karma-requirejs',
      'karma-chrome-launcher'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots'],


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
