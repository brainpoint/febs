
// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
require('./common/promise-finally-polyfill');
// require('babel-polyfill');
// require('../third-party/bluebird.min.js');
// require('../third-party/bignumber.min.js');

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

febs.__debug = window.__debug;
febs.crypt  = require('./libs/crypt.md5');


if (!window['febs'])
  window['febs'] = febs;
else if (window['febs'].crypt) {
  for (var key in febs.crypt) {
    window['febs'].crypt[key] = febs.crypt[key];
  }
}
else {
  window['febs'].crypt = febs.crypt;
}

return febs;
}
);
