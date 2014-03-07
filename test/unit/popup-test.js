define(['modules/popup', 'modules/options', 'test/unit/support/resetoptions'], function (Popup, options, resetOptions) {
  describe('popup', function () {
    var fixture, popup, popupPageHTML;

    // strip out non-necessary parts of view
    popupPageHTML = document.createElement('div');
    popupPageHTML.innerHTML = __html__['app/html/popup.html'];
    popupPageHTML.innerHTML = popupPageHTML.querySelector('#content').innerHTML;

    beforeEach(function () {
      fixture = document.createElement('div');
      fixture.id = 'fixture';
      fixture.innerHTML = popupPageHTML.innerHTML;

      resetOptions();

      Mock = {
        tabs: {
          query: function () {
            return window.location;
          }
        }
      };

      var mockChrome = Object.create(Mock);

      // not sure about this solution
      // depenency injection ftl?
      popup = new Popup(fixture, mockChrome);
    });
    describe('#_parseTabUrl', function () {
      it('it should convert a chrome formatted url into a globbed url', function () {
        var parsedUrl = popup._parseTabUrl('http://www.google.com');

        expect(parsedUrl).toEqual('http://www.google.com/*');
      });
    });

    describe('#saveOptions', function () {
      it('saves url via options', function () {
        popup.input.value = "http://www.google.com/*";
        popup.saveOption();

        var urls = localStorage.enabled_urls.split('\n');
        expect(urls).toContain("http://www.google.com/*");
      });
    });
  });
});
