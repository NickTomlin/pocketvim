define(['util/makeclass', 'util/crxload'], function (makeClass, crxload){
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

  Editor.prototype.init = function (dependencies, options) {
    // full path from chrome module root, NOT rjs path
    this.dependencies = dependencies;
    this.options = options || {};
  };


  /**
   * Grab necessary files and load to DOM
   * @return {[type]} [description]
   */
  Editor.prototype.loadDependencies = function (callback) {
    var self = this;
    console.log('loading dependencies');
    load(this.dependencies);
  };

  Editor.prototype.set = function () {};

  Editor.prototype.get = function () {};

  return Editor;
});
