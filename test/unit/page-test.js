define(['chai', 'sinon', 'modules/page', 'test/unit/support/mockchrome'], function (chai, sinon, page, mockChrome) {
  var expect = chai.expect;

  describe('page', function () {
    var fixture, popup, popupPageHTML;

    describe('initialize', function () {
      it('sends chrome message on initialization with url of current page', function () {
        var url = window.location.href;
        sinon.spy(mockChrome.extension, 'sendMessage');

        page.initialize(mockChrome);

        var args = mockChrome.extension.sendMessage.lastCall.args;

        expect(args).to.contain({
          channel: 'isEnabled',
          url: url
        });

        mockChrome.extension.sendMessage.restore();
      });
    });

    describe('#_handleMessage', function () {
      beforeEach(function () {
        sinon.spy(page.pageHandlers, 'domspy');
      });

      afterEach(function () {
        page.pageHandlers.domspy.restore();
      });

      it('it responds to events that have a type that corresponds to the pocket vim channel', function () {
        var validEvent = {
          data: {
            namespace: 'POCKETVIM',
            channel: 'domspy'
          }
        };

        page._handleMessage(validEvent);

        expect(page.pageHandlers.domspy.lastCall.args).to.contain(validEvent);
      });

      it('does not respond to calls that do not include the pocketvim channel', function () {
        var invalidEvent = {
          data: {
            type: 'anotherExtension.domspy'
          }
        };

        page._handleMessage(invalidEvent);
        expect(page.pageHandlers.domspy.called).to.be.false;
      });

      it('does not blow up when there is not type on event object', function () {
        var invalidEvent = {data: {}};

        expect(function () {
          page._handleMessage(invalidEvent);
        }).not.to.throw();
      });
    });
  });
});
