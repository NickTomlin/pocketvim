/*global describe, chai, it, chrome, injectScript */
'use strict';

var assert = chai.assert;
(function () {
  describe('Inject Script', function () {
    describe('Calls chrome api', function () {
      injectScript('/foo/bar', function () {
        console.log('test');
      });
      // need sinon here
      assert(chrome.calls.length > 0, 'did not call chrome api');
    });
  });
})();
