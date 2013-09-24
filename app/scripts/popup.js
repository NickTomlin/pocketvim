options = chrome.extension.getBackgroundPage().options;
console.log('options:')
console.log(options);

function getCurrentUrl (callback) {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function (tabs) {
    var tab = tabs[0];
    console.dir(tab);
    callback(tab.url);
  });
};

document.addEventListener('DOMContentLoaded', function () {
  var input = document.querySelector('[name="current_url"]');
  getCurrentUrl(function (url) {
    // tab.url is equiavlent to window.location.href
    var urlHost = url.split('/').slice(0,3).join('/') + '/*';
    input.value = urlHost;
  });

  var submit = document.querySelector('button');
  submit.addEventListener('click', function () {
    // there is probably a more elegant way to do this...
    proposedUrl = input.value;
    currentUrls = options('enabled_urls') || '';
    console.log(currentUrls);
    if (currentUrls.indexOf(proposedUrl) === -1) {
      options('enabled_urls', currentUrls + proposedUrl + '\n' );
    }
  });

});
