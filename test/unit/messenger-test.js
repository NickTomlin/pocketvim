define(['sinon', 'chai', 'modules/messenger'], function (sinon, chai, Messenger) {
  var expect = chai.expect;

  describe('messenger', function () {
    var channel, namespace, data, messenger;

    beforeEach(function () {
      namespace = 'POCKETVIM';
      channel = 'foo';

      data = {
        namespace: 'POCKETVIM',
        channel: channel,
        foo: 'bar'
      };
    });

    afterEach(function () {
      messenger = null;
    });

    it('allows consumers to register handlers', function () {
      messenger = new Messenger(namespace, {type: 'message'});

      messenger.register(channel, function (messageData) {
        returnedData = messageData;
      });

      expect(messenger.handlers[channel]).to.be.ok;
    });

    it('dispatches event registered to namespace', function (done) {
      messenger = new Messenger(namespace, {type: 'message'});

      messenger.register(channel, function (messageData) {
        expect(messageData).to.eql(data);
        done();
      });

      window.postMessage(data, '*');
    });

    it('does not dispatch events that are not on namespace', function (done) {
      var callback = sinon.spy();

      var messenger = new Messenger('OTHER_NAMESPACE', {type: 'message'});
      messenger.register(channel, callback);

      window.postMessage(data, '*');

      setTimeout(function () {
        expect(callback.called).to.be.false
        done();
      }, 10);
    });

    it('throws an exception when invoked without a namespace', function () {
      expect(function () {
        var broken = new Messenger();
      }).to.throw();
    });
  });
});
