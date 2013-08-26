var
  fixture = document.getElementById('qunit-fixture'),
  textarea,
  mirror;

module("Can we create a CodeMirror instance and interact with it programatically", {
  setup: function () {
    textarea = document.createElement('textarea');
    fixture.appendChild(textarea);
     var myCodeMirror = CodeMirror.fromTextArea(textarea, {
       value: "function myScript(){return 100;}\n",
       mode:  "javascript",
       keyMap: "vim"
     });
    mirror = document.getElementsByClassName('CodeMirror')[0];
   },
   teardown: function () {
    mirror = null;
    textarea = null;
   }
}); // module

test( "CodeMirror enabled", function () {
  ok( mirror.CodeMirror.isClean(), 'CodeMirror is enabled');
})

test( "Write to CodeMirro", function () {
  mirror.CodeMirror.setValue('foo');
  equal(mirror.CodeMirror.getValue(), 'foo', 'We wrote content to editor');
});

test( "Can we save content of CodeMirror from textarea?", function () {
  mirror.CodeMirror.setValue('bar');
  mirror.CodeMirror.save();
  equal(textarea.value, 'bar', 'Textarea has same value as CodeMirror');
});
