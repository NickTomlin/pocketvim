'use strict';

define(function (require, exports, module){
  var root, submitButton;
  var options = require('./options');

  function Popup (root, global) {
    this.root = root;
    this.global = global;

    this.initialize();
  }

  Popup.prototype.initialize = function (callback) {
    this.input = this.root.querySelector('[name="current_url"]');
    this.submitButton = this.root.querySelector('#save');
    this.enableButton = this.root.querySelector('#enable');

    this.submitButton.addEventListener('click',  this.saveOption.bind(this));
    this.enableButton.addEventListener('click', this.enable.bind(this));

    this.getUrl();
  };

  Popup.prototype.enable = function () {
    chrome.extension.sendMessage({channel: 'enable'});
  };

  Popup.prototype._parseTabUrl = function (url) {
    return url.split('/').slice(0,3).join('/') + '/*';
  };

  Popup.prototype.getUrl = function () {
    var self = this;

    this.global.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, function (tabs) {
      var tab = tabs[0];
      self.setUrl(tab.url);
    });
  };

  Popup.prototype.setUrl = function (url) {
    this.input.value = this._parseTabUrl(url);
  };

  Popup.prototype.saveOption = function () {
    var proposedUrl = this.input.value.trim();
    var currentUrls = options('enabled_urls') || '';

    if (currentUrls.indexOf(proposedUrl) === -1) {
      var newUrls = currentUrls + proposedUrl + '\n';
      options('enabled_urls', newUrls);
      this.input.disabled = true;
    }
  };

  module.exports = Popup;
});

