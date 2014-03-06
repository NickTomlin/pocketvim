/*global describe, expect, it, chrome */
'use strict';

define(['modules/main', 'test/unit/support/resetoptions'], function (main, resetOptions) {
    beforeEach(function () {
      resetOptions();
    });

    describe('#isEnabled', function () {
            var isEnabled = main.isEnabled;

            it('should not match non_enabled urls', function () {
                expect(isEnabled({url: 'http://foo.com/bar'})).toBeFalsy();
                expect(isEnabled({url: 'http://www.google.com/false'})).toBeFalsy();
            });

            it('should match enabled urls at root', function () {
                expect(isEnabled({url: 'http://jsbin.com/'})).toBeTruthy();
            });

            it('should match wildcard urls', function () {
                expect(isEnabled({url: 'http://jsbin.com/foo/bar/baz'})).toBeTruthy();
                expect(isEnabled({url: 'http://jsbin.com/var/1'})).toBeTruthy();
            });

            it('should not match before wildcard paths', function () {
                expect(isEnabled({url: 'http://cssdeck.com/'})).toBeFalsy();
            })
    });
})
