'use strict';


define(function (require, exports, module) {
  var attachListener, initialize;
  var injectScript = require('./inject-script');
  var Editor = require('./editor');

  /**
   * Add listeners to window to interact with injected script;
   *
   */
  attachListener = module.exports._attachListener = function () {
    window.addEventListener("message", function(event) {
        // We only accept messages from ourselves
        if (event.source != window)
          return;

        if (event.data.type && (event.data.type == "DOMSPY")) {
          if (! event.data.editorName) return;

          var options = JSON.parse(event.data.editorOptions);
          var editor = new Editor[event.data.editorName](options);
          // run if page has loaded
          if (document.readyState == 'complete') {
              editor.loadDependencies();
          } else {
            // Otherwise, wait until page has loaded.
            // unfortunately 'DOMContentLoaded' appears to have iffy support in background
            // and injected scripts. We use 'load' instead.
            window.addEventListener('load', function () {
              editor.loadDependencies.call(editor);
            }, false);
          }
        }
    }, false);
  };

  initialize = module.exports.initialize = function (api) {
    api = api || chrome;
    var currentDomain = window.location.origin + window.location.pathname;

    api.extension.sendMessage({method: "isEnabled", url: currentDomain }, function(response) {
        // we don't want to do anything if the domain is not enabled
        if (!response) { return; }

        injectScript('/scripts/modules/domspy.js', function () {
          attachListener();
        });
    });
  };
});
