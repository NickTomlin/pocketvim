define(['util/crxload', 'editor'], function (crxLoad, Editor) {
  // you're doing it wrong :(
  Editor.prototype.getDependencies = function () {
    // this is performing loose compare since version is typically a string. Not sure if that is super taboo
    var binding = this.options.version && this.options.version < 3.15 ? 'js/keybindings/codemirror/legacyvim.js' : 'js/keybindings/codemirror/vim.js';
    return this.options.dependencies.concat(binding, this.options.editor);
  }
  return Editor;
});
