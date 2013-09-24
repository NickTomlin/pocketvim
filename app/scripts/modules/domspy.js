// @todo iffe for andboxing and protection?
var domSpy = {};
domSpy.cm = window.CodeMirror ? "CodeMirror" : undefined, domSpy.ace = window.ace ? "Ace" : undefined;

var editor = {
  name: domSpy.cm || domSpy.ace,
  options: {
    version: window.CodeMirror && window.CodeMirror.version || false
  }
};

window.postMessage({type: "DOMSPY", editorName: editor.name, editorOptions: JSON.stringify(editor.options) }, "*");