// this should provide a central event dispatcher of some sort
console.log('hello from main.js');

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  // code from vimium that we are copying:
  // if (sendRequestHandlers[request.handler])
  //   sendResponse(sendRequestHandlers[request.handler](request, sender))
  return false;
});

// need to find a way of requesting url here
function isEnabled (url) {
  enabledUrls = localStorage.get("enabledUrls");

  var enabled = false;
  // handle wildcard in enabled urls
  var urlRe = new RegExp('^' + url.replace(/\*/g,'.*') + "$");
  enabledUrls.split('\n').forEach(function (enabledUrl) {
    enabled = urlRe.test(url);
  });
  return enabled;
}
