(function (global) {
  var editors, editorName;
  var CHANNEL = 'POCKETVIM';
  var handlers = {};

  editors = {
    'Ace': {
      selector: '.ace_editor',
      activate: function (instance) {
        instance
          .env
          .editor
          .setKeyboardHandler(ace.require("ace/keyboard/vim").handler);
      }
    },
    'CodeMirror': {
      selector : '.CodeMirror',
      activate: function (instance) {
        if (instance && instance.hasOwnProperty('CodeMirror')) {
          instance.CodeMirror.setOption('keyMap','vim');
        }
      }
    }
  };

  handlers.activate = function (event) {
    if (editors[event.data.editorName]) {
      editorName = event.data.editorName;
      var instances = document.querySelectorAll(editors[editorName].selector);
      Array.prototype.forEach.call(instances, editors[editorName].activate);
    }
  };

  function handleMessage (event) {
    var namespace;

    if (event.source != global && event.data.type.match(CHANNEL)) { return; }

    namespace = event.data.type.split('.')[1];

    if (handlers[namespace]) {
      handlers[namespace](event);
    }
  }

  global.addEventListener('message', handleMessage, false);
}(this));
