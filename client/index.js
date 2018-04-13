
// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
// require('babel-polyfill');
require('../third-party/bluebird.min.js');
// require('../third-party/bignumber.min.js');

//
// define the __debug.
if (!global.hasOwnProperty('__debug')) {
  global.__debug = false;
}


( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "febs requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

var febs = {};

febs.string = require('./string');
febs.crypt  = require('./crypt');
febs.utils  = require('./utils');
febs.net  = require('./net');

window['febs'] = febs;


//
// debug.
//
// if (!console.debug) {
  window.console.debug = function() {
    if (global.__debug) {
      var logfoo;
      if (window.console.warn)
        logfoo = window.console.warn;
      else
        logfoo = window.console.log;
      
      for (var i = 0; i < arguments.length; i++) {
        logfoo(arguments[i]);
      }
    }
  }
// }

return febs;
}
);


var animationFrame  = require('./animationFrame');
if (!global.requestAnimationFrame)
  global.requestAnimationFrame = animationFrame.requestAnimationFrame;
if (!global.cancelAnimationFrame)
  global.cancelAnimationFrame = animationFrame.cancelAnimationFrame;
