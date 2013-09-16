// need to find a way of requesting url here
function isEnabled (url) {
  var enabled = false;
  // handle wildcard in enabled urls
  var urlRe = new RegExp('^' + url.replace(/\*/g,'.*') + "$");
  enabledUrls.split('\n').forEach(function (enabledUrl) {
    enabled = urlRe.test(url);
  });
  return enabled;
}
