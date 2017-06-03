var PocketVim = PocketVim || {};

PocketVim.embedAce = function () {
    var acequire = ace.acequire ? ace.acequire : ace.require
    // github also adds a class of .ace-github to ace instance
    var instances = document.querySelectorAll(".ace_editor");
    Array.prototype.forEach.call(instances, function(instance) {
    instance
      .env
      .editor
      .setKeyboardHandler(acequire("ace/keyboard/vim").handler);
    });
};

PocketVim.embedAce();
