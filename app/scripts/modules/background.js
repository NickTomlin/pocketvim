'use strict';

var isEnabled,
handlers,
addListener;

define(function (require, exports, module) {
  var options = require('modules/options');
  /**
   * Attach chrome onMessage listner. Inspired by vimium event bus.
   */
  module.exports.addOnMessageListener = function () {
    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
      if (handlers[request.method]) {
        sendResponse(handlers[request.method](request));
      }
      return false;
    });
  };

  /**
   * Check to see if given object has a url that is in our enabled urls list
   * @param request {object} object with a url property
   * @todo remove the depedency on request.url and have param be a string.
   */
  isEnabled = module.exports.isEnabled = function (request) {
    var url = request.url;
    var enabledUrls = options("enabled_urls");
    var enabled = false;
    // handle wildcard in enabled urls
    // use array.some so we can escape http://stackoverflow.com/a/2641374/1048479
    return enabledUrls.split('\n').some(function (enabledUrl) {
      var urlRe = new RegExp('^' + enabledUrl.replace(/\*/g,'.*') + "$");
      return urlRe.test(url);
    });
  };

  // register handlers
  handlers = {
    isEnabled: isEnabled,
  };

  // set defaults (hopefully only once ;)
  if (! localStorage.initialized) {
    options.restoreDefaultOptions();
    localStorage.initialized = true;
  }
});
