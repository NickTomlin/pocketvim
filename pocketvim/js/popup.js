options = chrome.extension.getBackgroundPage().options;

function getCurrentUrl (callback) {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function (tabs) {
    var tab = tabs[0];
    callback(tab.url);
  });
};

document.addEventListener('DOMContentLoaded', function () {
  var input = document.querySelector('[name="current_url"]');
  getCurrentUrl(function (url) {
    input.value = url;
  });

  var submit = document.querySelector('button');
  submit.addEventListener('click', function () {
    // there is probably a more elegant way to do this...
    proposedUrl = input.value;
    currentUrls = options('enabled_urls');
    if (currentUrls.indexOf(proposedUrl) === -1) {
      options('enabled_urls', currentUrls + proposedUrl + '\n');
    }
  });

});
