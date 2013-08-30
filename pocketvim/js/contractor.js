requirejs.config(requirejsConfig);
requirejs(['lib/underscore', 'config', 'util/crxload'],
  function(_,  config, crxload) {
    var currentDomain = window.location.host;

    // perhaps we could embed a simple script to check for 'ace' or 'codemirror' on window?
    var editor = typeof config.domains[currentDomain] != 'undefined' ? config.domains[currentDomain] : config.defaultEditor; // defaults to codemirror
    require(['codemirror/edit'], function (editor){
      editor.loadDependencies(function(){
        console.log('deps loaded');
      });
    });
});
