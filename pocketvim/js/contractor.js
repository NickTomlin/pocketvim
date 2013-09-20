"use strict";

/* ==========================================================================
   Editor
   ========================================================================== */
  /**
   * Provide an "orderly" load of dependencies
   * @param  {array} sources array of extension root relative js files
   * @param  {int} current current member of source arary (internal use only)
   */
  function load (sources, current) {
    current = typeof current === 'undefined' ? 0 : current;
    if (current >= sources.length) {
      return;
    }

    function next () {
      load(sources, current + 1);
    }

    if ( _.isString(sources[current]) ) {
      crxload(sources[current], function () {
        next();
      });
    } else {
      // keep crazy train rolling if sources[current] is undefined, null, or empty
      console.log('null!');
      next();
    }
  }

  /**
   * A small configurable class to normalize interaction with dom-based editor
   * @parameters {array} dependencies list of modules that editor depends on (usually keybinding and embedded code)
   */
  // Editor = makeClass();

  function Editor (options) {
    this.options = options || {};
  };

  /**
   * Grab necessary files and load to DOM
   * @return {[type]} [description]
   */
  Editor.prototype.loadDependencies = function () {
    load(this.getDependencies());
  };

  /**
   * Returns an array of dependencies. Order matters.
   * @return {array}
   */
  Editor.prototype.getDependencies = function () {
    return this.options.dependencies.concat(this.options.binding, this.options.embed);
  };

  Editor.prototype.set = function () {};

  Editor.prototype.get = function () {};

  // Editors holds all editor prototypes
  var Editors = {};

/* ==========================================================================
   Ace
   ========================================================================== */
Editors.Ace = function (){
    Editor.apply(this, arguments);
}

Editors.Ace.prototype = new Editor();
Editors.Ace.prototype.getDependencies = function () {
  return ['js/modules/ace/embed.js'];
}

/* ==========================================================================
   CodeMirror
   ========================================================================== */

Editors.CodeMirror = function (){
    Editor.apply(this, arguments);
}

Editors.CodeMirror.prototype = new Editor();

Editors.CodeMirror.prototype.getDependencies = function () {
  // legacy code mirror instances use a different method of toggling between insert mode (https://groups.google.com/d/msg/codemirror/l58GjS3nqnY/_TtFnOcXtbAJ)
  // we need to check for a version to get the appropriate binding
  var binding = this.options.version && this.options.version < 3.15 ? 'js/keybindings/codemirror/legacyvim.js' : 'js/keybindings/codemirror/vim.js';
  return [binding,'js/modules/codemirror/embed.js'];
}

/* ==========================================================================
   Helpers
   ========================================================================== */
/**
 * Load "in-dom" js resources to get around
 * Chrome's seperation of extension / page DOM.
 * @param  {string} url path to js file from extension root
 * @param  {function} callback  optional callback to be fired on script 'onload' event
 */
function injectScript (url, callback) {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(url);
    // @todo potentially remove parentNode here and then call callback?
    s.onload = callback;
    (document.head||document.documentElement).appendChild(s);
}

/* ==========================================================================
   Page Interaction
   ========================================================================== */
// see if our page is enabled

var currentDomain = window.location.origin + window.location.pathname;
console.log(currentDomain);
debugger;
chrome.extension.sendMessage({method: "isEnabled", url: currentDomain }, function(response) {
    // we don't want to do anything if the domain is not enabled
    debugger;
    if (!response) { console.log('not enabled'); return; }

    injectScript('/js/modules/util/domspy.js', function () {
      console.log('dom spy embedded');
      attachListener();
    });
});

// interact with our injected script
function attachListener () {
  window.addEventListener("message", function(event) {
      // We only accept messages from ourselves
      if (event.source != window)
        return;

      if (event.data.type && (event.data.type == "DOMSPY")) {
        var editor = new Editors[event.data.name];
        editor.loadDependencies();
      }
  }, false);
}

