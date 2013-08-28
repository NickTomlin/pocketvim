requirejs.config(requirejsConfig);
requirejs(['lib/underscore', 'config', 'util/crxload'],
  function(_,  config, crxload) {
    var domain = window.location.host;

    var editor = typeof config.domains[domain] != 'undefined' ? config.domains[domain] : config.defaultEditor; // defaults to codemirror

    var editors = {
      "codemirror": function () {
        crxload('js/keybindings/codemirror/vim.js', function () {
          crxload('js/modules/codemirror/codemirror.js', function () {
            this.parentNode.removeChild(this);
          });
        });
      },
      "ace": function () {
        crxload('js/modules/ace/ace.js');
      }
    };
    editors[editor]();
});
