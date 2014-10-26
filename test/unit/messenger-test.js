define(['modules/messenger'], function (Messenger) {
  describe('messenger', function () {
    var channel, data;

    beforeEach(function () {
      channel = 'foo';
      data = {
        namespace: 'POCKETVIM',
        channel: channel,
        foo: 'bar'
      };
    });

    it('allows consumers to register handlers', function () {
      var messenger = new Messenger(data.channel, {type: 'message'});

      messenger.register(channel, function (messageData) {
        returnedData = messageData;
      });

      expect(messenger.handlers[channel]).toBeDefined();
    });

    it('dispatches event registered to namespace', function (done) {
      var messenger = new Messenger(data.channel, {type: 'message'});

      messenger.register(channel, function (messageData) {
        expect(messageData).toEqual(data);
        done();
      });

      window.postMessage(data, '*');
    });

    it('does not dispatch events that are not on namespace', function (done) {
      var callback = jasmine.createSpy();
      data.namespace = 'OTHER';

      var messenger = new Messenger(data.channel, {type: 'message'});
      messenger.register(channel, callback);

      window.postMessage(data, '*');

      setTimeout(function () {
        expect(callback).not.toHaveBeenCalled();
        done();
      }, 10);
    });

    it('throws an exception when invoked without a namespace', function () {
      expect(function () {
        var broken = new Messenger();
      }).toThrow();
    });
  });
});
