requirejs.config(requirejsConfig);

require(['modules/background'], function (background) {
  background.initialize();
});
