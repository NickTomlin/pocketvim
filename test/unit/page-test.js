define(['modules/page', 'test/unit/support/mockchrome'], function (page, mockChrome) {
  describe('page', function () {
    var fixture, popup, popupPageHTML;

    describe('#initialization', function () {
      it('sends chrome message on initialization with url of current page', function () {
        var url = window.location.href;
        spyOn(mockChrome.extension, 'sendMessage');

        page.initialize(mockChrome);

        var call = mockChrome.extension.sendMessage.mostRecentCall.args[0];

        expect(call).toEqual(jasmine.objectContaining({
          method: 'isEnabled',
          url: url
        }));
      });
    });
  });
});
