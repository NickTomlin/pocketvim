/* locals: requireJsConfig */

var requirejsConfig = requirejsConfig || {};
requirejs.config(requirejsConfig);

require(['main'], function (main) {
  main.addOnMessageListener();
});
