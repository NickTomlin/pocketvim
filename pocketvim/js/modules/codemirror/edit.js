define(['lib/underscore', 'util/crxload', 'editor'], function (_, crxLoad, Editor) {
    console.log(typeof Editor);
    CodeMirror = function (){
        Editor.apply(this, arguments);
    }

    CodeMirror.prototype = new Editor();

    CodeMirror.prototype.getDependencies = function () {
      // this is performing loose compare since version is typically a string. Not sure if that is super taboo
      var binding = this.options.version && this.options.version < 3.15 ? 'js/keybindings/codemirror/legacyvim.js' : 'js/keybindings/codemirror/vim.js';
      return [binding,'js/modules/codemirror/embed.js']
    }
  return CodeMirror;
});
