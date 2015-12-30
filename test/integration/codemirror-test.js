'use strict';

describe('CodeMirror', function () {
  beforeEach(function () {
    enableLocalHost();
    browser.get('http://localhost:9999/support/codemirror.html');
  });

  it('activates vim bindings', function () {

    browser.driver.actions()
    .click($('.CodeMirror'))
    .sendKeys(`SVim is cool`)
    .perform();

    expect($('.CodeMirror').getText()).toEqual(' Vim is cool');
  });
});

