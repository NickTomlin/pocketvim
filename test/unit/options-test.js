define(['modules/options'], function (options) {
  describe('#options', function () {
    it('returns all options if no argument is given', function () {
      expect(options()).toBeTruthy();
    })
  });
});
