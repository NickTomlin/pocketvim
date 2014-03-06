define(function (require, exports, module){
  var root;
  var submit;

  options = require('./options');

  function Popup (root) {
    this.root = root;

    this.initialize();
  }

  Popup.prototype.initialize = function (callback) {
    this.input = this.root.querySelector('[name="current_url"]');
    this.submit = this.root.querySelector('#save');

    this.submit.addEventListener('click', this.saveOption);
  };

  Popup.prototype._parseTabUrl = function (url) {
      // tab url is equivalent to window.location
      return url + '/*';
  };

  Popup.prototype.setUrl = function (url) {
    this.input.value = _parseTabUrl(url);
  };

  Popup.prototype.getUrl = function () {
    var self = this;

    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, function (tabs) {
      var tab = tabs[0];
      self.setUrl(tab.url);
    });
  };

  Popup.prototype.saveOption = function () {
    proposedUrl = this.input.value.trim(); // chrome supports string.trim ^^

    currentUrls = options('enabled_urls') || '';

    if (currentUrls.indexOf(proposedUrl) === -1) {
      var newUrls = currentUrls + proposedUrl + '\n';
      options('enabled_urls', newUrls);
      this.input.disabled = true;
    }
  };

  module.exports = Popup;
});

