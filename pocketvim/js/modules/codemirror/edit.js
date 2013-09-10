define(['lib/underscore', 'util/crxload', 'editor'], function (_, crxLoad, Editor) {
    console.log(typeof Editor);
    CodeMirror = function (){
        Editor.apply(this, arguments);
    }

    CodeMirror.prototype = new Editor();

    CodeMirror.prototype.getDependencies = function () {
      // legacy code mirror instances use a different method of toggling between insert mode (https://groups.google.com/d/msg/codemirror/l58GjS3nqnY/_TtFnOcXtbAJ)
      // we need to check for a version to get the appropriate binding
      var binding = this.options.version && this.options.version < 3.15 ? 'js/keybindings/codemirror/legacyvim.js' : 'js/keybindings/codemirror/vim.js';
      return [binding,'js/modules/codemirror/embed.js'];
    }
  return CodeMirror;
});
