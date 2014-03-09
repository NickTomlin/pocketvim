'use strict';

define(function (require, exports, module) {
  var injectScript = require('./inject-script');
  /**
  * Provide an "orderly" load of dependencies
  * @param  {array} sources array of extension root relative js files
  * @param  {int} current current member of source arary (internal use only)
  */
  module.exports = function load (sources, current) {
    current = typeof current === 'undefined' ? 0 : current;

    if (current >= sources.length) {
      return;
    }

    var next = function () {
      load(sources, current + 1);
    };

    if ( typeof sources[current] === 'undefined' || sources[current] === '' ) {
      next();
    } else {
      injectScript(sources[current], function () {
        next();
      });
    }
  };
});
