define(['lib/underscore','util/crxload', 'editor'], function (_, crxLoad, Editor) {
  console.log('ace editor instance!');



  var Ace = Editor.extend({
    binding: undefined,
    getDependencies: function () {
      return this.options.concat(this.options.embed);
    }
  });

  return Ace;
});
