module.exports = function(grunt) {
  grunt.initConfig({
    // set up some variables to use in various tasks since these will probably change later in the process
    app : {
      'src': 'pocketvim',
      'dest': 'public'
    },
    watch: {
      scripts: {
        files: ['<%= app.src %>/js/**/*'],
        // @todo, jshint, test, etc?
        tasks: ['chrome-reload']
      }
      // livereload: {
      //     files: ['<%= app.dest %>/css/*'],
      //     options: {
      //       livereload: true
      //     }
      // }
    },
    // //@borked this task is slow. so it's better to do it during a build step
    // requirejs: {
    //   compile: {
    //     options: {
    //       optimize: 'none',
    //       mainConfigFile: "<%= app.src %>/js/require-config.js", // this config is shared by the optimizer and our main.js module
    //       baseUrl: "<%= app.src %>/js", // where r.js should start looking for modules
    //       name: "main", // kickoff file
    //       include: ["memer", "lodash"], // @todo, have r.js grok this from app/js file instead of redclaring
    //       out: "<%= app.dest %>/js/main.js"
    //     }
    //   }
    // },
    // @todo, how does this build step work with our project?
    // copy: {
    //   js: {
    //     files: [
    //     // application files + backbone files + libs — we don't use globstar (**) because vendor :(
    //     {expand: true, cwd: '<%= app.src %>/js', src: ['*.js','*/*.*', '!vendor/*.js'], dest:"<%= app.dest %>/js" },
    //     // vendor. Is there a way to clean this up? Probably. Although the way that bower pulls EVERYTHING in a project down sucks
    //     {
    //        expand:true,
    //        flatten: true,
    //        cwd: '<%= app.src %>/js/vendor',
    //        src: [
    //          'jquery/jquery.js',
    //          'underscore-amd/underscore.js',
    //          'backbone-amd/backbone.js',
    //          'requirejs/require.js',
    //          'requirejs-text/text.js'
    //        ],
    //        dest:"<%= app.dest %>/js/vendor" },
    //     ]
    //   },
    //   img: {
    //     files: [
    //       { expand: true, flatten: true,  src: '<%= app.src %>/images/*', dest:"<%= app.dest %>/images" },
    //     ]
    //   }
    // }
  });

  grunt.registerTask('chrome-reload', function () {
    require("child_process").exec("osascript -e 'tell application \"Google Chrome\"' -e 'tell window 1' -e 'set newTab to make new tab with properties {URL: \"http://reload.extensions\"}' -e 'end tell' -e 'end tell'");
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-connect');
  // allows us to run dancer and watch at the same time
  // @todo might be better to switch to grunt paralell https://github.com/iammerrick/grunt-parallel
  grunt.loadNpmTasks('grunt-shell-spawn');


  // @todo, figure out build step
  // grunt.registerTask('build', ['requirejs', 'copy']); // add a copy + min task here
  // grunt.registerTask('default', ['shell:dance','stylus:compile','copy', 'watch']);
  grunt.registerTask('default', ['watch']);

};
