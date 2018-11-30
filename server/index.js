
exports.BigNumber = require('bignumber.js');

exports.upload = require('./upload');
exports.exception = require('./exception');
exports.file   = require('./file');
exports.string = require('./string');
exports.crypt  = require('./crypt');
exports.utils  = require('./utils');
exports.date   = require('../browser/libs/date');
exports.net  = require('./net');
exports.dom  = require('../browser/libs/dom');

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
  Object.defineProperty(global, '__column', {
   get: function(){
     return __stack[1].getColumnNumber();
   }
  });
}

//
// define the __debug.
if (!global.hasOwnProperty('__debug')) {
  Object.defineProperty(global, '__debug', {
   get: function() {
     if (process.browser) {
       return !!global.___debug;
     }
     else {
      return ((process.env.NODE_ENV || 'development') == 'development');
     }
   },
   set: function(isDebug) {
    if (process.browser) {
      global.___debug = isDebug;
    }
    else {
      process.env.NODE_ENV = (isDebug ? 'development' : 'production');
    }
   }
  });
}

//
// debug.
//
// if (!console.debug) {
  console.debug = function() {
    if (__debug) {
      if (console.warn)
        console.warn(...arguments);
      else
        console.log(...arguments);
    }
  }
// }