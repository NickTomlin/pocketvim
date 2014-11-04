/*global describe, expect, it, chrome */

'use strict';

define(['chai', 'modules/background', 'test/unit/support/resetoptions'], function (chai, background, resetOptions) {
  var expect = chai.expect;

  beforeEach(function () {
    resetOptions();
  });

  describe('#isEnabled', function () {
    var isEnabled = background.isEnabled;

    it('should not match non_enabled urls', function () {
      expect(isEnabled({url: 'http://foo.com/bar'})).to.be.false;
      expect(isEnabled({url: 'http://www.google.com/false'})).to.be.false;
    });

    it('should match enabled urls at root', function () {
      expect(isEnabled({url: 'http://jsbin.com/'})).to.be.ok;
    });

    it('should match wildcard urls', function () {
      expect(isEnabled({url: 'http://jsbin.com/foo/bar/baz'})).to.be.ok;
      expect(isEnabled({url: 'http://jsbin.com/var/1'})).to.be.ok;
    });

    it('should not match before wildcard paths', function () {
      expect(isEnabled({url: 'http://cssdeck.com/'})).to.be.false;
    });
  });
});
