// require('es5-shim');
// require('es5-shim/es5-sham');
var Window = "undefined" != typeof window ? window : ("undefined" != typeof global ? global : ("undefined" != typeof self ? self : undefined));

if (!Window.__line) {
  Window.__line = undefined;
  Window.__column = undefined;
}

// require('console-polyfill');
require('./common/promise-finally-polyfill');
// require('babel-polyfill');
// require('../third-party/bluebird.min.js');
// require('../third-party/bignumber.min.js');

//
// promise.
Window.Promise = require('./third-party/bluebird.min.js')

//
// getPrototypeOf
if (typeof Object.getPrototypeOf !== 'function') {
  Object.getPrototypeOf =
    ''.__proto__ === String.prototype
      ? function(object) {
          return object.__proto__
        }
      : function(object) {
          // May break if the constructor has been tampered with
          return object.constructor.prototype
        }
}

//
// bind.
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      throw new TypeError(
        'Function.prototype.bind - what is trying to be bound is not callable'
      )
    }
    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function() {},
      fBound = function() {
        return fToBind.apply(
          this instanceof fNOP && oThis ? this : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments))
        )
      }
    fNOP.prototype = this.prototype
    fBound.prototype = new fNOP()
    return fBound
  }
}

//
// Number.isNaN
if (typeof Number.isNaN !== 'function') {
  Number.isNaN = function(num) {
    if (typeof num !== 'number') return false;
    if (isNaN(num)) return true;
    return false;
  }
}

//
// Number.isInteger
if (typeof Number.isInteger !== 'function') {
  Number.isInteger = function(num) {
    if (typeof num !== 'number') return false;
    if (Math.ceil(num) === num) return true;
    return false;
  }
}

//
// document.getElementsByClassName
if (Window && !Window.document.getElementsByClassName) {
  Window.document.getElementsByClassName = function (className, element) {
      var children = (element || Window.document).getElementsByTagName('*');
      var elements = new Array();
      for (var i = 0; i < children.length; i++) {
          var child = children[i];
          var classNames = child.className.split(' ');
          for (var j = 0; j < classNames.length; j++) {
              if (classNames[j] == className) {
                  elements.push(child);
                  break;
              }
          }
      }
      return elements;
  };
}


//
// define the animationFrame.
var animationFrame  = require('./libs/animationFrame');
var _date  = require('./libs/date');
var _utils  = require('./libs/utils');
var _string = require('./libs/string');
var _crypt  = require('./libs/crypt');
var _cryptMd5  = require('./libs/crypt.md5');
var _cryptSha1  = require('./libs/crypt.sha1');
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

febs.date  = _date;
febs.utils  = _utils;
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
  date,
  utils,
  string,
  crypt,
  net,
  $,
  dom,
  exception
};
