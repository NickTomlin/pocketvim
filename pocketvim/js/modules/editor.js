define(['util/makeclass', 'util/when'], function (makeClass, when){
  /**
   * A small configurable class to normalize interaction with dom-based editor
   * @type {[type]}
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
    when(this.dependencies, callback);
  };

  Editor.prototype.set = function () {};

  Editor.prototype.get = function () {};

  return Editor;
});
