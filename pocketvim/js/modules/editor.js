define(['util/makeclass', 'util/crxload', 'underscore'], function (makeClass, crxload, _){
  /**
   * Provide an "orderly" load of dependencies
   * @param  {array} sources array of extension root relative js files
   * @param  {int} current current member of source arary (internal use only)
   */
  function load (sources, current) {
    current = typeof current === 'undefined' ? 0 : current;
    if (current === sources.length) {
      return;
    }
    crxload(sources[current], function () {
      load(sources, current + 1);
    });
  }

  /**
   * A small configurable class to normalize interaction with dom-based editor
   * @parameters {array} dependencies list of modules that editor depends on (usually keybinding and embedded code)
   */
  Editor = makeClass();

  Editor.prototype.init = function (options) {
    this.defaults = {
      dependencies: [],
      editor: 'modules/codemirror/embed.js',
      binding: 'js/keybindings/codemirror/vim.js'
    };
    this.options = _.extend({}, this.defaults, options);
  };


  /**
   * Grab necessary files and load to DOM
   * @return {[type]} [description]
   */
  Editor.prototype.loadDependencies = function () {
    var combinedDependencies = options.dependencies.concat(options.binding, options.editor);
    load(combinedDependencies);
  };

  Editor.prototype.set = function () {};

  Editor.prototype.get = function () {};

  return Editor;
});
