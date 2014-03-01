// Karma configuration
// Generated on Sat Feb 22 2014 08:35:46 GMT-0600 (CST)

module.exports = function(config) {
  config.set({

    basePath: '',

    // frameworks to use
    frameworks: ['jasmine'],

    files: [
      // application
      'app/scripts/spec-test.js',
      // test related
      'test/unit/**/*-test.js',
      'test/unit/support/codemirror.html',
      'bower_components/codemirror/lib/*'
    ],

    preprocesors : {
      '**/*.html': 'html2js'
    },

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-html2js-preprocessor'
    ],

    // list of files to exclude
    exclude: [

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
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
