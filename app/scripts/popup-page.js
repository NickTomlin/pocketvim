requirejs.config(requirejsConfig);

require(['modules/popup'], function (Popup) {
  var root = document.querySelector('#content');

  popup = new Popup(root, chrome);
});

