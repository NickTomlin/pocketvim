define(['modules/page', 'test/unit/support/mockchrome'], function (page, mockChrome) {
  describe('page', function () {
    var fixture, popup, popupPageHTML;

    describe('#initialization', function () {
      it('listens on window, and respons to page events', function () {
        var url = window.location.href;
        spyOn(mockChrome.extension, 'sendMessage');

        page.initialize(mockChrome);

        expect(mockChrome.extension.sendMessage).toHaveBeenCalledWith({method: 'isEnabled', url: url}, function (){});
      });
    });
  });
});
