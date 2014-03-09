requirejs.config(requirejsConfig);

require(['modules/page'], function (page) {
  page.initialize(Chrome);
});
