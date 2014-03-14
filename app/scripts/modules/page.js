'use strict';

define(function (require, exports, module) {
  var attachPageListener, initialize, editorName;
  var CHANNEL = 'POCKETVIM';
  var injectScript = require('./inject-script');
  var load = require('./load');
  var editors = require('./editors');
  // handle messages from page
  var pageHandlers = module.exports.pageHandlers = {};
  // handle messages from extension
  var extensionHandlers = module.exports.extensionHandlers = {};

  pageHandlers.domspy = function (event) {
    var options, editor, dependencies;

    if (! event.data.editorName) return;

    editorName = event.data.editorName;
    options = event.data.editorOptions;

    dependencies = editors[editorName](options);

    function embed () {
      dependencies = ['/scripts/modules/embed.js'].concat(dependencies);

      load(dependencies, function () {
          window.postMessage({
            type: "POCKETVIM.activate",
            editorName: editorName
          }, "/");
      });
    }

    // run if page has loaded
    if (document.readyState == 'complete') {
      embed();
    } else {
      // Otherwise, wait until page has loaded.
      // unfortunately 'DOMContentLoaded' appears to have iffy support in background
      // and injected scripts. We use 'load' instead.
      window.addEventListener('load', function () {
        embed();
      }, false);
    }
  };

  /**
   * Add listeners to window to interact with injected script;
   */
  attachPageListener = module.exports._attachPageListener = function () {
    window.addEventListener("message", function(event) {
      var namespace;

      // We only accept messages from ourselves
      // each message type should be namespaced. E.g. POCKETVIM.domspy
      if (event.source != window && event.data.type.match(CHANNEL)) { return; }

      namespace = event.data.type.split('.')[1];

      if (pageHandlers[namespace]) {
        pageHandlers[namespace](event);
      }
    }, false);
  };

  /**
   * Checks to see if pocketVim is enabled on current page. If so, activates domspy.
   * @param api {obj} object to call api functions on defaults to chrome. Used for mocking in tests.
   */
  initialize = module.exports.initialize = function (api) {
    api = api || chrome;
    var currentDomain = window.location.origin + window.location.pathname;

    api.extension.sendMessage({method: "isEnabled", url: currentDomain }, function(response) {
        // we don't want to do anything if the domain is not enabled
        if (!response) { return; }

        injectScript('scripts/modules/domspy.js', function () {
          attachPageListener();
        });
    });
  };
});
