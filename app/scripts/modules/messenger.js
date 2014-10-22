'use strict';

define(function (require, exports, module) {
  var defaults = {
    type: 'message'
  };

  function Messenger (namespace, options) {
    if (!namespace) throw new Error('Messenger::Must supply namespace');

    this.options = options || defaults;

    this.namespace = namespace;
    this.chrome = this.options.chrome || chrome;
    this.handlers = {};

    this.initialize();

    return this;
  }

  Messenger.prototype.initialize = function () {
    switch(this.options.type) {
      case 'message':
        window.addEventListener('message', this.handlePostMessage.bind(this), false);
      break;

      case 'chrome':
        this.chrome.extension.onMessage.addListener(this.handleExtensionMessage.bind(this));
      break;
    }
  };

  Messenger.prototype.handlePostMessage = function (message) {
    if (message.data && message.data.namespace === this.namespace) {
      this.publish(message.data);
    }
  };

  Messenger.prototype.handleExtensionMessage = function (request, sender, sendResponse) {
    this.publish(request, sender, sendResponse);
  };

  Messenger.prototype.publish = function (data) {
    // store args for later reusue in handler
    // postMessage does not care about these
    // but chrome listeners do
    var handleArgs = arguments;
    var channel = data.channel;

    if (channel in this.handlers) {
      this.handlers[channel].forEach(function (handler) {
        handler.apply(null, handleArgs);
      });
    }
  };

  Messenger.prototype.register = function (channel, callback) {
    this.handlers[channel] = this.handlers[channel] || [];
    this.handlers[channel].push(callback);
  };

  module.exports = Messenger;
});
