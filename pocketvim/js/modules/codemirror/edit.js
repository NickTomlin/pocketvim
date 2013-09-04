define(['util/crxload', 'editor'], function (crxLoad, Editor) {
  var dependencies = ['js/keybindings/codemirror/vim.js', 'js/modules/codemirror/embed.js'];
  CM = new Editor(dependencies);
  return CM;
});
