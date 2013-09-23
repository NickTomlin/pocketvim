// since chrome.extension is not availalbe on window (and are embedding script, we load bindings from CDN)
ace.require("ace/lib/net").loadScript('//cdnjs.cloudflare.com/ajax/libs/ace/1.1.01/keybinding-vim.js',
function() {
    e = document.querySelector(".ace_editor").env.editor; // github also adds a class of .ace-github to ace instance
    e.setKeyboardHandler(ace.require("ace/keyboard/vim").handler);
});
