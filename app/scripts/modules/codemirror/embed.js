var PocketVim = PocketVim || {};

PocketVim.activate = function () {
  // @todo: we need a way of passing this selector based on domain
  var mirrors = document.querySelectorAll(PocketVim.editor.selector);
  Array.prototype.forEach.call(mirrors, function (instance){
   instance.CodeMirror.setOption('keyMap','vim');
  });
};

PocketVim.activate();
