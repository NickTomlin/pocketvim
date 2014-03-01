'use strict';

var getCurrentTab,
getCurrentUrl,
options,
isEnabled,
publicApi,
restoreDefaultOptions,
addListener,
defaults = {
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

define(function (require, exports, module) {
  // our event bus
  // inspired by Vimium
  module.exports.addOnMessageListener = function () {
    console.log('listeners');
    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
      if (publicApi[request.method]) {
        sendResponse(publicApi[request.method](request));
      }
      return false;
    });
  };

  module.exports.hello = function () {
    return 'hello';
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

  /**
  * Get and Set for localstorage based options
  * @return {[type]} [description]
  * @todo!2#security consider checking for OUR local storage keys to avoid hijacking.
  */
  options = module.exports.options = function () {
    var get = function (key) {
      return localStorage[key];
    };

    var set = function () {
      var key = arguments[0];
      var value = arguments[1];
      localStorage[key] = value;
    };

    var all = function () {
      var allSettings = [];
      for (var prop in localStorage) {
        var setting = {};
        setting[prop] = localStorage[prop];
        allSettings.push(setting);
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

  // inspired / stolen from Vimium
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
