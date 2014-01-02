var PocketVim = PocketVim || {};

PocketVim.activate = function () {
    // github also adds a class of .ace-github to ace instance
    var instances = document.querySelectorAll(PocketVim.editor.selector);
    Array.prototype.forEach.call(instances, function(instance) {
    instance
      .env
      .editor
      .setKeyboardHandler(ace.require("ace/keyboard/vim").handler);
    });
};

PocketVim.activate();
