define(['chai', 'modules/options', 'test/unit/support/resetoptions'], function (chai, options, resetOptions) {
  var expect = chai.expect;

  beforeEach(function () {
    resetOptions();
  });

  describe('#options', function () {
    it('returns all options if no argument is given', function () {
      var all = options();

      expect(all.initialized).to.be.defined;
      expect(all.enabled_urls).to.be.defined;
    });

    it('returns an option value if only a key is specified', function () {
      expect(options('initialized')).to.be.defined;
    });

    it('Sets a value if a comma delimeted key pair is specified', function () {
      options('initialized', true);
      expect(options('initialized')).be.equal('true');
    });
  });
});
