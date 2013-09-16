"use strict";
var currentDomain = window.location.host;

chrome.extension.sendMessage({method: "isEnabled", url: currentDomain }, function(response) {
  console.log(response);
});
