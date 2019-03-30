function getGlobalObject(){
  if (typeof self !== 'undefined') { return self; } // eg. Web Worker
  if (typeof window !== 'undefined') { return window; } // eg. browser, Deno
  if (typeof global !== 'undefined') { return global; } // eg. Node
  throw Error('Cannot find any global object');
}
getGlobalObject().parcelRequire = (function (init) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof getGlobalObject().parcelRequire === 'function' && getGlobalObject().parcelRequire;
  var nodeRequire = typeof require === 'function' && require;
  var modules = {};

  function localRequire(name, jumped) {
    if (name in modules) {
      return modules[name];
    }

    // if we cannot find the module within our internal map or
    // cache jump to the current global require ie. the last bundle
    // that was added to the page.
    var currentRequire = typeof getGlobalObject().parcelRequire === 'function' && getGlobalObject().parcelRequire;
    if (!jumped && currentRequire) {
      return currentRequire(name, true);
    }

    // If there are other bundles on this page the require from the
    // previous one is saved to 'previousRequire'. Repeat this as
    // many times as there are bundles until the module is found or
    // we exhaust the require chain.
    if (previousRequire) {
      return previousRequire(name, true);
    }

    // Try the node require function if it exists.
    if (nodeRequire && typeof name === 'string') {
      return nodeRequire(name);
    }

    var err = new Error('Cannot find module \'' + name + '\'');
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  }

  localRequire.register = function register(id, exports) {
    modules[id] = exports;
  };

  modules = init(localRequire);
  localRequire.modules = modules;
  return localRequire;
})
