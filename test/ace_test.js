module('basic ace functionality', {
  setup: function () {
    console.log("i'm tired");
  }
})
test('is ace loaded?', function (){
  ok( typeof ace !== 'undefined', 'go to bed');
})
