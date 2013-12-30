/* global chai, document, describe, it, chrome */
'use strict';

var assert = chai.assert;
(function () {
    describe('Test Mutation', function () {
        it('should observe mutations', function (done) {
            var fixture = document.querySelector('#fixture');
            assert(typeof fixture !== 'undefined');
        });
    });
}());


