/* locals: requireJsConfig */

requirejs.config(requirejsConfig);

// this works but requireContent and require's evals are
// being stopped by CSP (going to need to do some googling methinks)
//
// require(['main'], function (main) {
//   console.log(main);
// });

// getting error, mismatchd anonyous define  module:
// define(function (require) {
//   console.log('foo');
//   // var main = require('./modules/main');
//   // main.addOnMessageListener();
//   // console.log(main.hello());
// });
