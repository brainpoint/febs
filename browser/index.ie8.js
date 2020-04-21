// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
require('./common/promise-finally-polyfill');
// require('babel-polyfill');
// require('../third-party/bluebird.min.js');
// require('../third-party/bignumber.min.js');

//
// promise.
window.Promise = require('./third-party/bluebird.min.js')

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
if (window && !window.document.getElementsByClassName) {
  window.document.getElementsByClassName = function (className, element) {
      var children = (element || window.document).getElementsByTagName('*');
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
var _BigNumber = require('bignumber.js');
var _date  = require('./libs/date');
var _utils  = require('./libs/utils');
var _string = require('./libs/string');
var _crypt  = require('./libs/crypt');
var _cryptMd5  = require('./libs/crypt.md5');
var _cryptSha1  = require('./libs/crypt.sha1');
var _utilsBig  = require('./common/utils.bigint');
var _net  = require('./libs/net');
var _dom  = require('./libs/dom');

//
// define the __debug.
if (!window['__debug']) {
  window.__debug = false;
}

//
// define the animationFrame.
if (!window['requestAnimationFrame'])
  window.requestAnimationFrame = animationFrame.requestAnimationFrame;
if (!window['cancelAnimationFrame'])
  window.cancelAnimationFrame = animationFrame.cancelAnimationFrame;


var febs = {};
febs.__debug = window.__debug;

febs.BigNumber = _BigNumber;
febs.date  = _date;
febs.utils  = febs.utils.mergeMap(_utils, _utilsBig);
febs.string = _string;
febs.crypt = febs.utils.mergeMap(_crypt, _cryptMd5, _cryptSha1);
febs.net  = _net
febs['$'] = _dom.CreateDom;
febs.dom = _dom.Dom;

if (!window['febs'])
  window['febs'] = febs;
else {
  window['febs'].string = window['febs'].string? febs.utils.mergeMap(window['febs'].string, febs.string) : febs.string;
  window['febs'].crypt = window['febs'].crypt? febs.utils.mergeMap(window['febs'].crypt, febs.crypt) : febs.crypt;
  window['febs'].utils = window['febs'].utils? febs.utils.mergeMap(window['febs'].utils, febs.utils) : febs.utils;
  window['febs'].net = window['febs'].net? febs.utils.mergeMap(window['febs'].net, febs.net) : febs.net;
  window['febs'].dom = window['febs'].dom? febs.utils.mergeMap(window['febs'].dom, febs.dom) : febs.dom;
}

if (!window['$'])
  window['$'] = febs['$'];
if (!window['jQuery'])
  window['jQuery'] = febs['$'];

//
// debug.
//
// if (!console.debug) {
if (window.console) {
  window.console.debug = function() {
    if (window.__debug) {
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

export {
  __debug,
  BigNumber,
  date,
  utils,
  string,
  crypt,
  net,
  $,
  dom
};
