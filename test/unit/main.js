/*global describe, it, chrome, options */
'use strict';

var assert = chai.assert;

// mock "options"
var options = function (option) {
    var opts = {
        "foo": "bar",
        "enabled_urls": [
           'http://jsbin.com/*',
           'http://jsfiddle.net/*',
           'http://www.google.com',
           'http://www.google.com/true'
        ].join('\n')
    }
    return opts[option];
};

(function () {
    describe('Test isEnabled', function () {
        describe('test our mocks', function () {
            it('should use our copy of options', function (){
                assert(options("foo") === "bar", 'mock options is not in scope ')
            })
        })
        describe('check urls', function () {
            it('is a function', function () {
                assert(typeof isEnabled === 'function', 'isEnabled is not a function');
            });

            it('url regex', function () {
                assert(isEnabled({url: 'http://foo.com/bar'}) === false, 'failed to check non enabled url');
                // why isn't this working?
                assert(isEnabled({url: 'http://www.google.com/false'}) === false, 'false positive non wildcard');
                assert(isEnabled({url: 'http://www.google.com/true' }) === true, 'failed non wildcard path');
                assert(isEnabled({url: 'http://www.google.com'}) === true, 'failed exact path');
            });

            it('wildcards', function () {
                assert(isEnabled({url: 'http://jsbin.com/foo/bar'}) === true, 'failed to enable  jsbin');
                assert(isEnabled({url: 'http://jsfiddle.net/nV3nF/'}) === true, 'failed to enable jsfiddle');
                assert(isEnabled({url: 'http://foo.net/nV3nF/'}) === false, 'falsely enabled wildcard');
            });
        });
    });
})();
