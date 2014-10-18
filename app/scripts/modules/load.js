'use strict';

define(function (require, exports, module) {
  var injectScript = require('./inject-script');
  /**
  * Provide an "orderly" load of dependencies
  * @param  {array} sources array of extension root relative js files
  * @param  {function} callback to be invoked after all sources are loaded
  * @param  {int} current current member of source arary (internal use only)
  */

  module.exports = function load (sources, callback, current) {
    current = current || 0;

    if (current >= sources.length) {
      return callback();
    }

    var next = function () {
      load(sources, callback, current + 1);
    };

    if (!sources[current]) {
      next();
    } else {
      injectScript(sources[current], function () {
        next();
      });
    }
  };
});
