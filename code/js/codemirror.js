var mirrors = document.querySelectorAll('.CodeMirror');
Array.prototype.forEach.call(mirrors, function (instance){
 instance.CodeMirror.setOption('keyMap','vim');
});
