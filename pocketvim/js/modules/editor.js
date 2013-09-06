define(['util/crxload', 'lib/underscore'], function (crxload, _){
  /**
   * Provide an "orderly" load of dependencies
   * @param  {array} sources array of extension root relative js files
   * @param  {int} current current member of source arary (internal use only)
   */
  function load (sources, current) {
    current = typeof current === 'undefined' ? 0 : current;
    if (current >= sources.length) {
      return;
    }

    function next () {
      load(sources, current + 1);
    }

    if ( _.isString(sources[current]) ) {
      crxload(sources[current], function () {
        next();
      });
    } else {
      // keep crazy train rolling if sources[current] is undefined, null, or empty
      console.log('null!');
      next();
    }
  }

  /**
   * A small configurable class to normalize interaction with dom-based editor
   * @parameters {array} dependencies list of modules that editor depends on (usually keybinding and embedded code)
   */
  // Editor = makeClass();

  function Editor (options) {
    this.defaults = {
      dependencies: [],
      embed: 'js/modules/codemirror/embed.js',
      binding: 'js/keybindings/codemirror/legacyvim.js'
    };
    // can use _.defaults() here as well...
    this.options = _.defaults(options, this.defaults);
  };


  /**
   * Grab necessary files and load to DOM
   * @return {[type]} [description]
   */
  Editor.prototype.loadDependencies = function () {
    load(this.getDependencies());
  };

  /**
   * Returns an array of dependencies. Order matters.
   * @return {array}
   */
  Editor.prototype.getDependencies = function () {
    return this.options.dependencies.concat(this.options.binding, this.options.embed);
  };

  Editor.prototype.set = function () {};

  Editor.prototype.get = function () {};

  return Editor;
});
