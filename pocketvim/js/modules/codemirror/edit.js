define(['util/crxload', 'editor'], function (crxLoad, Editor) {
  dependencies = ['js/keybindings/codemirror/vim.js', 'js/modules/codemirror/embed.js'];
  ace = new Editor(dependencies);
  return ace;
});
