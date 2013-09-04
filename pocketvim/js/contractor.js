requirejs.config(requirejsConfig);
requirejs(['lib/underscore', 'config', 'util/crxload'],
  function(_,  config, crxload) {
  var currentDomain = window.location.host;

  function loadEditor (editorName) {
    require(['codemirror/edit'], function (editor){
      editor.loadDependencies(function(){
        console.log('deps loaded');
      });
    });
  }

  // perhaps we could embed a simple script to check for 'ace' or 'codemirror' on window?
  // var editor = typeof config.domains[currentDomain] != 'undefined' ? config.domains[currentDomain] : config.defaultEditor; // defaults to codemirror

  // check for existence of editor (and ideally editor version)
  // https://developer.chrome.com/extensions/content_scripts.html#host-page-communication
  window.addEventListener("message", function(event) {
      // We only accept messages from ourselves
      if (event.source != window)
        return;

      if (event.data.type && (event.data.type == "DOMSPY")) {
        var editor = JSON.parse(event.data.text);

        if (editor.name) {
          // this needs to be a constructed path
          require(['editor'], function (Editor){
            var dependencies = ['js/keybindings/codemirror/vim.js', 'js/modules/codemirror/embed.js'];
            cm = new Editor({editor: 'js/modules/codemirror/embed.js', version: editor.version });
            cm.loadDependencies();
          });
        }
      }

  }, false);

  // kick things off
  crxload('js/modules/util/domspy.js');
});

