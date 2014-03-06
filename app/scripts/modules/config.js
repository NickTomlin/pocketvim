'use strict';

define(function (require, exports, module) {
  module.exports = {
    enabled_urls : [
    'http://jsbin.com/*',
    'http://jsfiddle.net/*',
    'http://codepen.io/pen/*',
    'https://gist.github.com/*',
    'http://gist.github.com/*',
    'http://cssdeck.com/labs/*',
    'http://dillinger.io/*',
    // needed for initialization
    ''
    ].join('\n'),
    initialized: false
  };
});
