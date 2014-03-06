define(function (require, exports, module) {
  var config = require('modules/config');

  config.initialized = true;

  module.exports = function resetTestDefaults(options) {
    if (typeof options === 'undefined') {
      options = config;
    }

    for (var prop in config) {
      localStorage[prop] = options[prop];
    }

    // set initialized to true
    localStorage.initialized = true;
  };
});
