var Window = "undefined" != typeof window ? window : ("undefined" != typeof global ? global : ("undefined" != typeof self ? self : undefined));

if (!Window.__line) {
  Window.__line = undefined;
  Window.__column = undefined;
}

// require('core-js/stable');
// require('regenerator-runtime/runtime');

// require('core-js/modules/es.global-this');

// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
require('./common/promise-finally-polyfill');
// require('babel-polyfill');
// require('../third-party/bluebird.min.js');
// require('../third-party/bignumber.min.js');

//
// define the animationFrame.
var animationFrame  = require('./libs/animationFrame');
var _BigNumber = require('./third-party/bignumber.js');
var _date  = require('./libs/date');
var _utils  = require('./libs/utils');
var _string = require('./libs/string');
var _crypt  = require('./libs/crypt');
var _cryptMd5  = require('./libs/crypt.md5');
var _cryptSha1  = require('./libs/crypt.sha1');
var _utilsBig  = require('./common/utils.bigint');
var _net  = require('./libs/net');
var _dom  = require('./libs/dom');
var _exception  = require('./common/exception');

//
// define the __debug.
if (!Window['__debug']) {
  Window.__debug = false;
}

//
// define the animationFrame.
if (!Window['requestAnimationFrame'])
  Window.requestAnimationFrame = animationFrame.requestAnimationFrame;
if (!Window['cancelAnimationFrame'])
  Window.cancelAnimationFrame = animationFrame.cancelAnimationFrame;


var febs = {};
febs.__debug = Window.__debug;

febs.BigNumber = _BigNumber;
febs.date  = _date;
febs.utils = _utils;
febs.utils  = febs.utils.mergeMap(_utils, _utilsBig);
febs.string = _string;
febs.crypt = febs.utils.mergeMap(_crypt, _cryptMd5, _cryptSha1);
febs.net  = _net
febs['$'] = _dom.CreateDom;
febs.dom = _dom.Dom;
febs.exception = _exception;

if (!Window['febs'])
  Window['febs'] = febs;
else {
  Window['febs'].string = Window['febs'].string? febs.utils.mergeMap(Window['febs'].string, febs.string) : febs.string;
  Window['febs'].crypt = Window['febs'].crypt? febs.utils.mergeMap(Window['febs'].crypt, febs.crypt) : febs.crypt;
  Window['febs'].utils = Window['febs'].utils? febs.utils.mergeMap(Window['febs'].utils, febs.utils) : febs.utils;
  Window['febs'].net = Window['febs'].net? febs.utils.mergeMap(Window['febs'].net, febs.net) : febs.net;
  Window['febs'].dom = Window['febs'].dom? febs.utils.mergeMap(Window['febs'].dom, febs.dom) : febs.dom;
  Window['febs'].exception = Window['febs'].exception? febs.utils.mergeMap(Window['febs'].exception, febs.exception) : febs.exception;
}

if (!Window['$'])
  Window['$'] = febs['$'];
if (!Window['jQuery'])
  Window['jQuery'] = febs['$'];

//
// debug.
//
// if (!console.debug) {
if (Window.console) {
  Window.console.debug = function() {
    if (Window.__debug) {
      var logfoo;
      if (Window.console.warn)
        logfoo = Window.console.warn;
      else
        logfoo = Window.console.log;
      
      for (var i = 0; i < arguments.length; i++) {
        logfoo(arguments[i]);
      }
    }
  }
}
// }


const __debug = febs.__debug;

const BigNumber = febs.BigNumber;
const date = febs.date;
const utils = febs.utils;
const string = febs.string;
const crypt = febs.crypt;
const net = febs.net;
const $ = febs['$'];
const dom = febs.dom;
const exception = febs.exception;

export {
  __debug,
  BigNumber,
  date,
  utils,
  string,
  crypt,
  net,
  $,
  dom,
  exception
};