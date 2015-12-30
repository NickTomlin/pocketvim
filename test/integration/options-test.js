'use strict';

describe('options', function () {
  it('Displays enabled urls', function () {
    browser.get(EXTENSION_URL + '/html/options.html');
    expect($('textarea[name="enabled_urls"]').isPresent()).toBeTruthy();
  });

  it('allows users to add enabled urls', function () {
    browser.get(EXTENSION_URL + '/html/options.html');
    let enabledUrls = $('textarea[name="enabled_urls"]');

    enabledUrls.sendKeys('http://localhost:9999/*');
    enabledUrls.sendKeys(protractor.Key.ENTER);
    $('#save').click();

    browser.refresh();

    expect(enabledUrls.getAttribute('value')).toContain('http://localhost:9999/*');
  });

  it('resets defaults', function () {
    browser.get(EXTENSION_URL + '/html/options.html');
    let enabledUrls = $('textarea[name="enabled_urls"]');

    enabledUrls.sendKeys('http://donotwant.com/*');
    enabledUrls.sendKeys(protractor.Key.ENTER);
    $('#save').click();

    browser.refresh();

    expect(enabledUrls.getAttribute('value')).toContain('http://donotwant.com/*');

    $('button#defaults').click();

    expect(enabledUrls.getAttribute('value')).not.toContain('http://donotwant.com/*');
  });
});

