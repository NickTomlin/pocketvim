'use strict';

define(['chai', 'modules/options-page', 'test/unit/support/resetoptions', 'text!app/html/options.html'], function (chai, optionsPage, resetOptions, optionsHtml) {
  var fixture, select, saveButton, resetButton;
  var expect = chai.expect;
  var optionsPageDiv = document.createElement('div');
  optionsPageDiv.innerHTML = optionsHtml;
  optionsPageDiv.innerHTML = optionsPageDiv.querySelector('#content').innerHTML;


  beforeEach(function () {
    fixture = document.createElement('div');
    fixture.id = 'fixture';
    fixture.innerHTML = optionsPageDiv.innerHTML;

    select = fixture.querySelector('#enabled_urls');
    saveButton = fixture.querySelector('#save');
    resetButton = fixture.querySelector('#defaults');

    resetOptions();

    optionsPage.initialize(fixture);
  });

  afterEach(function () {
    fixture = null;
  });

  describe('options page', function () {
    it('restores options', function () {
      select.value = select.value + "\nhttp://www.foobar.com/*";
      resetButton.click();

      var urls = select.value.split('\n');

      expect(urls.length).to.equal(8);
    });

    it('saves options', function () {
      var newUrl = "\nhttp://www.foobar.com/*";

      select.value = select.value + newUrl;
      saveButton.click();

      expect(localStorage.enabled_urls).to.contain(newUrl);
    });

    it('initializes select area with option content', function () {
      var urls = select.value.split('\n');

      expect(urls.length).to.equal(8);
    });

    it('initializes select area with option content', function () {
      var urls = select.value.split('\n');

      expect(urls.length).to.equal(8);
    });
  });
});
