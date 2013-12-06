/*global describe, it */
'use strict';
var assert = chai.assert;
(function () {
    describe('Test isEnabled', function () {
        describe('sanity', function () {
            it('is function defined', function () {
                assert(typeof isEnabled === 'function', 'is enabled is not defined');
            });
        });
    });
})();
