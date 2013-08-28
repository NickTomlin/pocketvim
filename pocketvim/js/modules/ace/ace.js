// assumes window.ace exists
// right now, this request is only going to work on github
ace.require("ace/lib/net").loadScript("https://rawgithub.com/ajaxorg/ace-builds/master/src-min-noconflict/keybinding-vim.js",
function() {
    e = document.querySelector(".ace_editor").env.editor; // github also adds a class of .ace-github to ace instance
    e.setKeyboardHandler(ace.require("ace/keyboard/vim").handler);
});
