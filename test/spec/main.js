/*global describe, it */
'use strict';
var assert = chai.assert;
(function () {
    describe('Give it some context', function () {
        describe('maybe a bit more context here', function () {
            it('should run here few assertions', function () {
                assert(1 === 1, 'foo');
            });
        });
    });
})();
