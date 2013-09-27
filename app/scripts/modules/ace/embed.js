// since chrome.extension is not availalbe on window (and are embedding script, we load bindings from CDN)
ace.require("ace/lib/net").loadScript('//cdnjs.cloudflare.com/ajax/libs/ace/1.1.01/keybinding-vim.js',
function() {
    // github also adds a class of .ace-github to ace instance
    var instances = document.querySelectorAll(".ace_editor")
    Array.prototype.forEach.call(instances, function(instance) {
    instance
      .env
      .editor
      .setKeyboardHandler(ace.require("ace/keyboard/vim").handler);
    });
});
