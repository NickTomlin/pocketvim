(function (global) {
  var editor;
  var domSpy = {};

  domSpy.cm = global.hasOwnProperty("CodeMirror") ? "CodeMirror" : undefined;
  domSpy.ace = global.hasOwnProperty("ace") ? "Ace" : undefined;

  editor = {
    name: domSpy.cm || domSpy.ace,
    options: {}
  };

  if (domSpy.ace) {
    editor.options.binding = ace.require("ace/keyboard/vim");
  } else if (domSpy.cm) {
    editor.options.version = global.CodeMirror && global.CodeMirror.version || false;
  }

  global.postMessage({
    type: "DOMSPY",
    editorName: editor.name,
    editorOptions: JSON.stringify(editor.options)
  }, "*");
}(this));
