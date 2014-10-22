'use strict';

define(function (require, exports, module) {
  var attachPageListener, attachExtensionListner, handleMessage, initialize, editorName;
  var CHANNEL = 'POCKETVIM';
  var injectScript = require('./inject-script');
  var load = require('./load');
  var editors = require('./editors');
  // handle messages from page
  var pageHandlers = module.exports.pageHandlers = {};
  // handle messages from extension
  var extensionHandlers = module.exports.extensionHandlers = {};

  function activate (editorName) {
    window.postMessage({
      type: "POCKETVIM.activate",
      editorName: editorName
    }, "/");
  }

  pageHandlers.domspy = function (event) {
    var options, editor, dependencies;

    if (!event.data.editorName) return;

    editorName = event.data.editorName;
    options = event.data.editorOptions;

    dependencies = editors[editorName](options);

    function embed () {
      dependencies = ['/scripts/modules/embed.js'].concat(dependencies);

      load(dependencies, function () {
        activate(editorName);
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
   * Handle messages from page
   */
  handleMessage = module.exports._handleMessage = function (event) {
      var namespace;
      // other things send postMessages, so make sure that we are
      // only getting messages of the type that we want
      // TODO: switch to rpcish
      var isValidEvent = (event.data && event.data.namespace === 'POCKETVIM');

      if (!isValidEvent) { return; }
      var channel = event.data.channel;

      if (pageHandlers[channel]) {
        pageHandlers[channel](event);
      }
  };

  /**
   * Add listeners to window to interact with injected script;
   */
  attachPageListener = module.exports._attachPageListener = function () {
    window.addEventListener("message", handleMessage);
  };

  /**
   * Add listeners for messages from extension
   * @todo make this rpcish
   */
  attachExtensionListner = module.exports._attachExtensionListener = function (api) {
    api.extension.onMessage.addListener(function(request) {
      if (request.method === 'activate') {
        activate();
      }
    });
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
        attachExtensionListner(api);

        injectScript('scripts/modules/domspy.js', function () {
          attachPageListener();
        });
    });
  };
});
