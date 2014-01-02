var PocketVim = PocketVim || {};

PocketVim.embedCM = function () {
  // @todo: we need a way of passing this selector based on domain
  var mirrors = document.querySelectorAll('.CodeMirror');
  Array.prototype.forEach.call(mirrors, function (instance){
   instance.CodeMirror.setOption('keyMap','vim');
  });
};

PocketVim.embedCM();
