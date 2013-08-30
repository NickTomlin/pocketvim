define(['util/crxload'], function (crxload){
/**
 * Attach and load scripts to browse DOM
 * @param  {[type]}   dependencies [description]
 * @param  {Function} callback     [description]
 * @param  {[type]}   timeout      [description]
 * @return {[type]}                [description]
 */
  return function (dependencies, callback, timeout) {
    // how to handle timeout?
    var loaded = [], timeout = timeout || 5000, elapsed = 0;
    console.log(dependencies);

    function load (dep) {
      if (loaded.length === dependencies.length) {
        return callback();
      }
      crxload(dep, function () {
        loaded.push(dep);
      });
    } // load

    dependencies.forEach(function(dep){
      load(dep);
    });
  }
})
