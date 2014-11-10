var path = require('path');
var assert = require('assert');
var chromeDriverPath = require('chromedriver').path;
// try setting path like so? http://stackoverflow.com/a/22494427/1048479
// webdriver looks in a directory, so we need to point to the directory
// that the executable lives in, not the executable itself
process.env.PATH += ':' + path.dirname(chromeDriverPath);
var webdriver = require("selenium-webdriver");



// ASIDE:
// check node_modules/selenium_webdriver chrome tests for examples of passing extensions to chrome

// this old skool way works.
var builder = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  // this does not work for some reason
  .setLoggingPrefs({'client': 'DEBUG'});

console.log(builder.getCapabilities());

var driver =  builder.build();

driver.get('http://localhost:1337');

driver.getTitle().then(function(title) {
  assert.equal(title, 'Haxfred');
});

// the browser still does not quit sometimes :(
driver.quit();

// this new sckool mocha way does not work :(

// describe.skip('description', function () {
//   var driver;
//
//   beforeEach(function () {
//       driver = new webdriver.Builder().
//       withCapabilities(webdriver.Capabilities.chrome()).
//       build();
//   });
//
//   afterEach(function () {
//     driver.quit();
//   });
//
//   it('description', function (done) {
//     driver.get('http://localhost:1337');
//
//     driver.getTitle().then(function (title) {
//       assert.equal(title, 'Haxfred');
//       done();
//     });
//   });
// });
