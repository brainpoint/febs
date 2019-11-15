
// require('es5-shim');
// require('es5-shim/es5-sham');
require('console-polyfill');
require('promise-prototype-finally');
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

febs.utils  = require('./common/utils.bigint');

febs.BigNumber = require('bignumber.js');

if (!window['febs'])
  window['febs'] = febs;
else if (window['febs'].utils) {
  for (var key in febs.utils) {
    window['febs'].utils[key] = febs.utils[key];
  }
}
else {
  window['febs'].utils = febs.utils;
}

return febs;
}
);
