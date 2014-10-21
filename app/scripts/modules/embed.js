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
    editorName = editorName || event.data.editorName;
    if (editorName) {
      var instances = document.querySelectorAll(editors[editorName].selector);
      Array.prototype.forEach.call(instances, editors[editorName].activate);
    }
  };

  function handleMessage (event) {
    var namespace;
    var isValidEvent = event.data.type && event.data.type.match(CHANNEL);

    if (!isValidEvent) { return; }

    namespace = event.data.type.split('.')[1];

    if (handlers[namespace]) {
      handlers[namespace](event);
    }
  }

  global.addEventListener('message', handleMessage, false);
}(this));
