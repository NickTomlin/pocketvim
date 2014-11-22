var path = require('path');
var assert = require('assert');
var chromeDriverPath = require('chromedriver').path;
// try setting path like so? http://stackoverflow.com/a/22494427/1048479
// webdriver looks in a directory, so we need to point to the directory
// that the executable lives in, not the executable itself
// process.env.PATH += ':' + path.dirname(chromeDriverPath);
// BUT... the serviceBuilder looks through path for the
// executable name, and then normalizes the directory
// so we need to do the full path. Ezz complicated
process.env.PATH += ':' + chromeDriverPath;
var webDriver = require('selenium-webdriver');
// required wrapper for mocha's control flow
// consider replacint this at a global level?
var webdriverTesting = require('selenium-webdriver/testing');
var extensionPath = path.join(__dirname, '../../app');
var chrome = require('selenium-webdriver/chrome');

var EXTENSION_URL = 'chrome-extension://pjnhffdkdckcagdmfmidafhppbomjdjg';

var chromeOptions = new chrome.Options()
                          .addArguments('load-extension=' + extensionPath);
var service = new chrome.ServiceBuilder().build();
driver = chrome.createDriver(chromeOptions, service)

function setOptions (driver, done) {
  // set localhost as an enabled domain before we run our specs
  // this also serves as a test of the options page ^^
  driver.get(EXTENSION_URL + '/html/options.html');
  var action = new wd.ActionSequence(driver)
    .click(driver.findElement({id: 'enabled_urls'}))
    .sendKeys(wd.Key.RETURN, 'http://localhost:9999/*')
    .click(driver.findElement({id: 'save'}))
    .perform();

  action.then(done);
}

// global exports, available to tests
global.t = webdriverTesting;
global.wd = webDriver;
global.driver = driver;
global.setOptions = setOptions;
global.EXTENSION_URL = EXTENSION_URL;
global.assert = assert;
