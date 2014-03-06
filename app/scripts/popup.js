define(['modules/popup'], function (popup) {
  var root = document.querySelector('body');
  document.addEventListener('DOMContentLoaded', function () {
    popup.init(root);
  });
})

