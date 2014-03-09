'use strict';

define(function (require, exports, module) {
  /**
  * Load "in-dom" js resources to get around
  * Chrome's seperation of extension / page DOM.
  * @param  {string} url path to js file from extension root
  * @param  {function} callback  optional callback to be fired on script 'onload' event
  * @todo requirejs should be a sufficient replacement for this.
  */
  module.exports = function (url, callback) {
      var s = document.createElement('script');
      s.src = chrome.extension.getURL(url);
      // @todo potentially remove parentNode here and then call callback?
      s.onload = callback;
      (document.head||document.documentElement).appendChild(s);
  };
});
