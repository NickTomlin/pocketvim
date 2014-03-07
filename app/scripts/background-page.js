requirejs.config(requirejsConfig);

require(['modules/background'], function (main) {
  main.addOnMessageListener();
});
