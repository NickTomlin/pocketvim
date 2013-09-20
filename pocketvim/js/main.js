console.log('main js');
/* Possibilities:
=================================*/
/*
 1. listen on tab change, and inject your content script based on url:
    http://stackoverflow.com/a/9880794/1048479
 2. Load a content script on all pages, have that communicate with background script.
 */

// our event bus
// inspired by Vimium
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('message from: %s', sender);

  if (publicApi[request.method]) {
    sendResponse(publicApi[request.method](request));
  }
  return false;
});



function getCurrentTab (callback) {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function (tabs) {
    var tab = tabs[0];
    callback(tab);
  });
};

function getCurrentUrl(callback) {
  getCurrentTab(function (tab) {
    return tab.url;
  });
};

/**
 * Get and Set for localstorage based options
 * @return {[type]} [description]
 * @todo!2#security consider checking for OUR local storage keys to avoid hijacking.
 */
var options = function () {
  var get = function (key) {
    if (localStorage[key])
      return localStorage[key];
  };

  var set = function () {
    var key = arguments[0];
    var value = arguments[1];
    // if (key === "enabled_urls") {
    //   var url = arguments[1];
    //   var value = localStorage["enabled_urls"] + url + "\n";
    // }
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

// inspired / stolen from Vimium
var isEnabled = function (request) {
  var url = request.url;
  enabledUrls = options("enabled_urls");
  var enabled = false;

  // handle wildcard in enabled urls
  // use array.some so we can escape http://stackoverflow.com/a/2641374/1048479
  // @todo#codingsmell is this too clever?
  return enabledUrls.split('\n').some(function (enabledUrl) {
    var urlRe = new RegExp('^' + enabledUrl.replace(/\*/g,'.*') + "$");
    return urlRe.test(url);
  });


};

var publicApi = {
  isEnabled: isEnabled,
}
