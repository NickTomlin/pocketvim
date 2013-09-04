// @todo iffe for andboxing and protection?
var domSpy = {};
domSpy.cm = window.CodeMirror ? "CodeMirror" : undefined, domSpy.ace = window.ace ? "ace" : undefined;

var editor = {
  name: domSpy.cm || domSpy.ace,
  version: window.CodeMirror && window.CodeMirror.version || false
};

window.postMessage({type: "DOMSPY", text: JSON.stringify(editor) }, "*");
