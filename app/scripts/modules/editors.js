'use strict';

define(function (require, exports, module) {

  module.exports.Ace = function (options) {
    var dependencies = [];
    // ace 1.1.1 includes keybindings by default
    // we only include it manually if there is no binding on the page
    if (!options.binding) {
      dependencies.push('/scripts/keybindings/ace/keybinding-vim.js');
    }

    return dependencies;
  };

  /* ==========================================================================
    CodeMirror
    ========================================================================== */

  module.exports.CodeMirror = function (options) {
    var dependencies = [];
    // legacy code mirror instances use a different method of toggling between insert mode (https://groups.google.com/d/msg/codemirror/l58GjS3nqnY/_TtFnOcXtbAJ)
    // we need to check for a version to get the appropriate binding
    var binding = options.version && options.version < 3.15 ? '/scripts/keybindings/codemirror/legacyvim.js' : '/scripts/keybindings/codemirror/vim.js';
    dependencies.push(binding);

    return dependencies;
  };
});
