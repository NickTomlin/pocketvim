'use strict';

var getCurrentTab,
getCurrentUrl,
isEnabled,
publicApi,
addListener;

define(function (require, exports, module) {
  var options = require('modules/options');
  // our event bus
  // inspired by Vimium
  module.exports.addOnMessageListener = function () {
    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
      if (publicApi[request.method]) {
        sendResponse(publicApi[request.method](request));
      }
      return false;
    });
  };

  getCurrentTab = module.exports.getCurrentTab = function (callback) {
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, function (tabs) {
      var tab = tabs[0];
      callback(tab);
    });
  };

  getCurrentUrl = module.exports.getCurrentUrl = function (callback) {
    getCurrentTab(function (tab) {
      return tab.url;
    });
  };


  // inspired / stolen from Vimium
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
    // @todo#codingsmell is this too clever?
    return enabledUrls.split('\n').some(function (enabledUrl) {
      var urlRe = new RegExp('^' + enabledUrl.replace(/\*/g,'.*') + "$");
      return urlRe.test(url);
    });
  };

  publicApi = {
    isEnabled: isEnabled,
  };

  // set defaults (hopefully only once ;)
  if (! localStorage.initialized) {
    options.restoreDefaultOptions();
    localStorage.initialized = true;
  }
});
