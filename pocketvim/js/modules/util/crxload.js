define(function () {
  /**
   * Load "in-dom" js resources to get around
   * Chrome's seperation of extension / page DOM.
   * @param  {string} url path to js file from extension root
   * @param  {function} callback  callback to be fired on script 'onload' event
   */
  return function (url, callback) {
      var s = document.createElement('script');
      s.src = chrome.extension.getURL(url);
      s.onload = callback;
      (document.head||document.documentElement).appendChild(s);
  }
});
