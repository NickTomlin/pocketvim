'use strict';


define(function (require, exports, module) {
  var Editor, Ace, CodeMirror;
  var load = require('./load');
  /**
  * A small configurable class to normalize interaction with dom-based editor
  * @parameters {array} dependencies list of modules that editor depends on (usually keybinding and embedded code)
  */

  Editor = module.exports.Editor = function (options) {
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

  /* ==========================================================================
    Ace
    ========================================================================== */
  Ace = module.exports.Ace = function (){
      Editor.apply(this, arguments);
  };

  Ace.prototype = new Editor();

  Ace.prototype.getDependencies = function () {
    return ['scripts/keybindings/ace/keybinding-vim.js','scripts/modules/ace/embed.js'];
  };

  /* ==========================================================================
    CodeMirror
    ========================================================================== */

  CodeMirror = module.exports.CodeMirror= function (){
      Editor.apply(this, arguments);
  };

  CodeMirror.prototype = new Editor();

  CodeMirror.prototype.getDependencies = function () {
    // legacy code mirror instances use a different method of toggling between insert mode (https://groups.google.com/d/msg/codemirror/l58GjS3nqnY/_TtFnOcXtbAJ)
    // we need to check for a version to get the appropriate binding
    var binding = this.options.version && this.options.version < 3.15 ? 'scripts/keybindings/codemirror/legacyvim.js' : 'scripts/keybindings/codemirror/vim.js';
    return [binding,'scripts/modules/codemirror/embed.js'];
  };

});
