requirejs.config(requirejsConfig);
requirejs(['lib/underscore', 'config', 'util/crxload', 'editor'],
  function(_,  config, crxload, Editor) {
    var currentDomain = window.location.host;

    // this should be a mapping to "domains"
    // var editor = typeof config.domains[currentDomain] != 'undefined' ? config.domains[currentDomain] : config.defaultEditor; // defaults to codemirror

    // this should construct an editor using "editors"
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
