
exports.controls = require('./controls');
exports.exception = require('./exception');
exports.file   = require('./file');
exports.string = require('./string');
exports.crypt  = require('./crypt');
exports.utils  = require('./utils');


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
  Object.defineProperty(global, '__debug', {
   get: function() {
     if (global.hasOwnProperty('__debugValue'))
       return global.__debugValue;
     else
       return ((process.env.NODE_ENV || 'development') == 'development');
   },
   set: function(isDebug) {
     global.__debugValue = isDebug;
   }
  });
}

//
// debug.
//
if (!console.debug) {
  if (global.__debug) {
    console.debug = console.warn;
  } else {
    console.debug = ()=>{}
  }
}