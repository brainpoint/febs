
exports.string = require('./string');
exports.crypt  = require('./crypt');
exports.utils  = require('./utils');
exports.net  = require('./net');
exports.controls  = require('./controls');

var animationFrame  = require('./animationFrame');
exports.requestAnimationFrame = animationFrame.requestAnimationFrame;
exports.cancelAnimationFrame = animationFrame.cancelAnimationFrame;

//
// define the __line. __filename.
//
if (!global.__line) {
  Object.defineProperty(global, '__stack', {
   get: function(){
     var orig = Error.prepareStackTrace;
     Error.prepareStackTrace = function(_, stack){ return stack; };
     var err = new Error;
     Error.captureStackTrace(err, arguments.callee);
     var stack = err.stack;
     Error.prepareStackTrace = orig;
     return stack;
   }
  });
  Object.defineProperty(global, '__line', {
   get: function(){
     return __stack[1].getLineNumber();
   }
  });
}

//
// define the __debug.
if (!global.hasOwnProperty('__debug')) {
  global.__debug = false;
}

//
// debug.
//
// if (!console.debug) {
  console.debug = function() {
    if (global.__debug) {
      var logfoo;
      if (console.warn)
        logfoo = console.warn;
      else
        logfoo = console.log;
      
      for (var i = 0; i < arguments.length; i++) {
        logfoo(arguments[i]);
      }
    }
  }
// }