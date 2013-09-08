define(['lib/underscore','util/crxload', 'editor'], function (_, crxLoad, Editor) {
  console.log('ace editor instance!');

  var Ace = function () {};
  Ace.prototype = new Editor();
  Ace.prototype.getDependencies = function () {
    return ['js/modules/ace/embed.js'];
  }
  return Ace;
});
