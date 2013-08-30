define(['util/makeclass', 'util/when'], function (makeClass, when){
  /**
   * A small configurable class to normalize interaction with dom-based editor
   * @type {[type]}
   */
  Editor = makeClass();

  Editor.prototype.init = function (dependencies, options) {
    this.dependencies = dependencies;
    this.options = callback || null;
  };


  /**
   * Grab necessary files and load to DOM
   * @return {[type]} [description]
   */
  Editor.prototype.loadDependencies = function (callback) {
    var self = this;
    when(this.dependencies, function () {
      console.log('deps loaded');
      callback();
    });
  };

  Editor.prototype.set = function () {};

  Editor.prototype.get = function () {};

});
