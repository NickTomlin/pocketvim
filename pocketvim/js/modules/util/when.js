define(['util/crxload'], function (crxload){
/**
 * Attach and load scripts to browse DOM
 * @param  {[type]}   dependencies [description]
 * @param  {Function} callback     [description]
 * @param  {[type]}   timeout      [description]
 * @return {[type]}                [description]
 */
  return function (dependencies, callback, timeout) {
    var loaded = [], timeout = timeout || 5000, elapsed = 0;
    return function load () {
      if (loaded.length === dependencies.length) {
        callback();
      }
      // this is not going to work
      dependencies.forEach(function(dep){
        crxload(dep, function () {
          loaded.push(dep);
          load();
        })
      })
    }
  };
})
