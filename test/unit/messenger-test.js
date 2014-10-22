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

    it('dispatches event registered to namespace', function () {
      var returnedData;
      var channel = 'foo';
      var data = {
        namespace: 'POCKETVIM',
        channel: channel,
        foo: 'bar'
      };

      var messenger = new Messenger('POCKETVIM', {type: 'message'});

      messenger.register(channel, function (messageData) {
        returnedData = messageData;
      });

      window.postMessage(data, '*');

      // todo: upgrade jasmine to 2.x
      // this async handling... T_T
      waitsFor(function () {
        return returnedData;
      }, 'postMessage received', 50);

      runs(function () {
        expect(returnedData).toEqual(data);
      });
    });

    it('does not dispatch events that are not on namespace', function () {
      var channel = 'foo';
      var returned;
      var data = {
        namespace: 'OTHER',
        channel: channel,
        foo: 'bar'
      };

      var messenger = new Messenger('POCKETVIM', {type: 'message'});

      messenger.register(channel, function (messageData) {
        returned = true;
      });

      window.postMessage(data, '*');

      // todo: upgrade jasmine to 2.x
      // this async handling... T_T
      waits(300);

      runs(function () {
        expect(returned).toBeFalsy();
      });
    });

    it('throws an exception when invoked without a namespace', function () {
      expect(function () {
        var broken = new Messenger();
      }).toThrow();
    });
  });
});
