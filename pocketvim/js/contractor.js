requirejs.config(requirejsConfig);
requirejs(['lib/underscore', 'config', 'util/crxload'],
  function(_,  config, crxload) {
  var currentDomain = window.location.host;

  // check for existence of editor (and ideally editor version)
  // https://developer.chrome.com/extensions/content_scripts.html#host-page-communication
  window.addEventListener("message", function(event) {
      // We only accept messages from ourselves
      if (event.source != window)
        return;

      if (event.data.type && (event.data.type == "DOMSPY")) {
        var pageData = JSON.parse(event.data.text);

        if (pageData.name) {
          var name = pageData.name.toLowerCase();
          require([ name + '/' + 'edit' ], function (Editor){
            editor = new Editor(pageData);
            console.dir(editor);
            editor.loadDependencies();
          });
        }
      }
  }, false);

  // kick things off
  crxload('js/modules/util/domspy.js');
});

