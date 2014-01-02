// our global namespace
var PocketVim = PocketVim || {};

(function (window) {
    var domSpy = PocketVim.domSpy = {};

    var editors = {
        "CodeMirror": {
            "selector": ".CodeMirror"
        },
        "Ace": {
            "selector": ".ace_editor"
        }
    };

    // @todo this can probably be expressed in a cleaner way
    domSpy.cm = window.CodeMirror ? "CodeMirror" : undefined;
    domSpy.ace = window.ace ? "Ace" : undefined;
    var name = domSpy.cm || domSpy.ace;

    var editor = PocketVim.editor = {
      name: name,
      selector: editors[name].selector,
      options: {
        version: window.CodeMirror && window.CodeMirror.version || false
      }
    };

    window.postMessage({type: "DOMSPY", editorName: editor.name, editorOptions: JSON.stringify(editor.options) }, "*");
}(window));
