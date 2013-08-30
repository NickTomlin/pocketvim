define(['util/makeclass', 'editor'], function (makeClass, Editor){
  var Domain = makeClass();

  Domain.prototype.init = function (editor, options) {
    this.options = options;
    this.editor = new Editor(this.options.editor);
  };

  Domain.prototype.attachEditor = function () {

  }
  return Domain;
})
