define(['modules/page', 'test/unit/support/mockchrome'], function (page, mockChrome) {
  describe('page', function () {
    var fixture, popup, popupPageHTML;

    describe('initialize', function () {
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

    describe('#_handleMessage', function () {
      it('it responds to events that have a type that corresponds to the pocket vim channel', function () {
        var validEvent = {
          data: {
            type: 'POCKETVIM.domspy'
          }
        };

        spyOn(page.pageHandlers, 'domspy');

        page._handleMessage(validEvent);

        expect(page.pageHandlers.domspy).toHaveBeenCalledWith(validEvent);
      });

      it('does not respond to calls that do not include the pocketvim channel', function () {
        var invalidEvent = {
          data: {
            type: 'anotherExtension.domspy'
          }
        };

        spyOn(page.pageHandlers, 'domspy');

        page._handleMessage(invalidEvent);

        expect(page.pageHandlers.domspy).not.toHaveBeenCalled();
      });

      it('does not blow up when there is not type on event object', function () {
        var invalidEvent = {data: {}};

        expect(function () {
          page._handleMessage(invalidEvent);
        }).not.toThrow();
      });
    });
  });
});
