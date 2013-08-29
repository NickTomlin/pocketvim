module.exports = function(grunt) {
  grunt.initConfig({
    // set up some variables to use in various tasks since these will probably change later in the process
    app : {
      'src': 'pocketvim',
      // 'dest': 'public'
    },
    watch: {
      scripts: {
        files: ['<%= app.src %>/js/**/*'],
        // @todo, jshint, test, etc?
        tasks: ['chrome-reload']
      }
    }
  });

  // or use https://github.com/jsoverson/grunt-open
  grunt.registerTask('chrome-reload', function () {
    require("child_process").exec("osascript -e 'tell application \"Google Chrome\"'" +
      " -e 'tell window 1'" +
      " -e 'set newTab to make new tab with properties {URL: \"http://reload.extensions\"}'" +
      " -e 'end tell'" +
      " -e 'end tell'");
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['watch']);

};
