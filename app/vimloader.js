// @todo, create a "loader"
var s = document.createElement('script');
s.src = chrome.extension.getURL('vim.js');
s.onload = function () {
  this.parentNode.removeChild(this);
};

var vimBinding = document.createElement('script');
vimBinding.src = chrome.extension.getURL('lib/CodeMirror/keymap/vim.js');
(document.head||document.documentElement).appendChild(vimBinding);

vimBinding.onload = function () {
  (document.head||document.documentElement).appendChild(s);
};


