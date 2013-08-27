requirejs.config(requirejsConfig);
requirejs(['lib/underscore', 'config'],
  function(_,  config) {
    var domain = window.location.origin;

    var editor = typeof config.domains[domain] != 'undefined' ? config.domains[domain] : config.domains.default; // defaults to codemirror

    var editors = {
      "codemirror": function () {
        var s = document.createElement('script');
        s.src = chrome.extension.getURL('js/codemirror.js');
        s.onload = function () {
          this.parentNode.removeChild(this);
        };

        var vimBinding = document.createElement('script');
        vimBinding.src = chrome.extension.getURL('js/keybindings/codemirror/vim.js');
        (document.head||document.documentElement).appendChild(vimBinding);

        vimBinding.onload = function () {
          (document.head||document.documentElement).appendChild(s);
        };
      },
      "ace": function () {
        console.log('go ace!');
      }
    };
    editors[editor]();
});
