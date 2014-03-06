define(['modules/options', 'test/unit/support/resetoptions'], function (options, resetOptions) {
  beforeEach(function () {
    resetOptions();
  });

  describe('#options', function () {
    it('returns all options if no argument is given', function () {
      var all = options();

      expect(all.initialized).toBeDefined();
      expect(all.enabled_urls).toBeDefined();
    })

    it('returns an option value if only a key is specified', function () {
      expect(options('initialized')).toBeDefined();
    });

    it('Sets a value if a comma delimeted key pair is specified', function () {
      expect(options('initialized', false)).toBeFalsy();
    });
  });
});
