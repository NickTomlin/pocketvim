requirejs.config(requirejsConfig);

require(['modules/options-page'], function (optionsPage) {
  var root = document.querySelector('.pocketvim-options');
  optionsPage.init(root);
});

