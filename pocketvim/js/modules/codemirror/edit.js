define(['lib/underscore', 'util/crxload', 'editor'], function (_, crxLoad, Editor) {
  var CodeMirror = _.extend(Editor, {
    getDependencies : function () {
      // this is performing loose compare since version is typically a string. Not sure if that is super taboo
      var binding = this.options.version && this.options.version < 3.15 ? 'js/keybindings/codemirror/legacyvim.js' : 'js/keybindings/codemirror/vim.js';
      return this.options.dependencies.concat(binding, this.options.embed);
    }
  });

  return CodeMirror;
});
