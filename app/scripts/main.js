/* locals: requireJsConfig */

requirejs.config(requirejsConfig);

require(['modules/main'], function (main) {
  main.addOnMessageListener();
});
