'use strict';

describe('Ace', function () {
  beforeEach(function () {
    enableLocalHost();
    browser.get('http://localhost:9999/support/ace.html');
  });

  it('activates vim bindings', function () {

    browser.driver.actions()
    .click($('.ace_editor'))
    .sendKeys(`SVim is cool`)
    .perform();

    expect($('.ace_content').getText()).toEqual('Vim is cool');
  });
});
