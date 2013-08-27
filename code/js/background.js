requirejs.config(requirejsConfig);

requirejs(['underscore', 'config', 'util/messaging', 'type_b/myModule'],
function(        _,            config,   messaging,        myModule) {

  console.log('Background script (background.js):');

  console.log('+ myModule content:');
  _.each(myModule, function(value, key) {
    console.log('    -', key, ':', value);
  });

  console.log('+ Configuration content:');
  _.each(config, function(value, key) {
    console.log('    -', key, ':', value);
  });

  messaging.backgroundInitialize();
});
