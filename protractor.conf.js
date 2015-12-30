'use strict';

let path = require('path');
var extensionPath = path.join(__dirname, 'app');

module.exports.config = {
  specs: ['test/integration/*-test.js'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['load-extension=' + extensionPath]
    }
  },
  onPrepare: function () {
    browser.ignoreSynchronization = true;
    global.EXTENSION_URL = 'chrome-extension://pjnhffdkdckcagdmfmidafhppbomjdjg';
    global.enableLocalHost = function () {
      let enabledUrls = $('textarea[name="enabled_urls"]');
      browser.get(EXTENSION_URL + '/html/options.html');
      $('#defaults').click();
      enabledUrls.sendKeys('http://localhost:9999/*');
      enabledUrls.sendKeys(protractor.Key.ENTER);
      $('#save').click();
    }
  }
}
