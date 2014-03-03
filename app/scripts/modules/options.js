'use strict';

define(function (exports, require, module) {
  var defaults = {
    enabled_urls : [
    'http://jsbin.com/*',
    'http://jsfiddle.net/*',
    'http://codepen.io/pen/*',
    'https://gist.github.com/*',
    'http://gist.github.com/*',
    'http://cssdeck.com/labs/*',
    'http://dillinger.io/*'
    ].join('\n'),
  };

  /**
    * Get and Set for localstorage based options
    * @return {[type]} [description]
    * @todo!2#security consider checking for OUR local storage keys to avoid hijacking.
    */
  var options = module.exports = function () {
    var get = function (key) {
      return localStorage[key];
    };

    var set = function () {
      var key = arguments[0];
      var value = arguments[1];
      localStorage[key] = value;
    };

    var all = function () {
      var allSettings = {};
      for (var prop in localStorage) {
        var setting = {};
        allSettings[prop] =localStorage[prop];
      }
      return allSettings;
    };

    // if no arguments are passed, return all settings
    if (arguments.length < 1) {
      return all();
    }
    // otherwise return get or set depending on wheter a key arguement was passed
    return arguments.length === 1 ? get.apply(null, arguments) : set.apply(null, arguments);
  };

  options.restoreDefaultOptions = function () {
    for (var prop in defaults) {
      if (defaults.hasOwnProperty(prop))
        options(prop, defaults[prop]);
    }
  };
})
