define(function (require, exports, module) {
  module.exports = {
    extension: {
      sendMessage: function () {}
    },
    tabs: {
      query: function () {
        return window.location;
      }
    }
  };
});
