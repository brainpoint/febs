(function () {
  if (typeof Promise.prototype.finally === 'function') {
    return
  }
  Promise.prototype.finally = function (fn) {
    return this
      .then(function(value) {
        return this.constructor.resolve(fn()).then(function() { return value })
      })
      .catch(function(reason) {
        return this.constructor.resolve(fn()).then(function() { throw reason })
      })
  }
})()
