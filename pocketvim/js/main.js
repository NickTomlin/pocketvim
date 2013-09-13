// this should provide a central event dispatcher of some sort
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
});
