// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill')
require('./common/promise-finally-polyfill');
// require('babel-polyfill');
// require('./third-party/bluebird.min.js');
// require('../third-party/bignumber.min.js');

;(function(global, factory) {
  'use strict'

  if (typeof module === 'object' && typeof module.exports === 'object') {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    module.exports = global.document
      ? factory(global, true)
      : function(w) {
          if (!w.document) {
            throw new Error('febs requires a window with a document')
          }
          return factory(w)
        }
  } else {
    factory(global)
  }

  // Pass this if window is not defined yet
})(typeof window !== 'undefined' ? window : this, function(window, noGlobal) {
  //
  // define the __debug.
  if (!window['__debug']) {
    window.__debug = false
  }

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
  if (!window.document.getElementsByClassName) {
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
  var animationFrame = require('./libs/animationFrame')
  if (!window['requestAnimationFrame'])
    window.requestAnimationFrame = animationFrame.requestAnimationFrame
  if (!window['cancelAnimationFrame'])
    window.cancelAnimationFrame = animationFrame.cancelAnimationFrame

  var febs = {}

  febs.__debug = window.__debug;

  febs.BigNumber = require('bignumber.js')

  febs.date = require('./libs/date')
  febs.utils = require('./libs/utils')
  febs.string = require('./libs/string')
  febs.crypt = require('./libs/crypt')
  var cryptMd5 = require('./libs/crypt.md5')
  febs.crypt = febs.utils.mergeMap(febs.crypt, cryptMd5)
  var cryptSha1 = require('./libs/crypt.sha1')
  febs.crypt = febs.utils.mergeMap(febs.crypt, cryptSha1)

  var utilsBig = require('./common/utils.bigint')
  febs.utils = febs.utils.mergeMap(febs.utils, utilsBig)
  febs.net = require('./libs/net')
  febs.dom = require('./libs/dom')
  febs['$'] = febs.dom.CreateDom
  febs.dom = febs.dom.Dom

  if (!window['febs']) window['febs'] = febs
  else {
    window['febs'].string = window['febs'].string
      ? febs.utils.mergeMap(window['febs'].string, febs.string)
      : febs.string
    window['febs'].crypt = window['febs'].crypt
      ? febs.utils.mergeMap(window['febs'].crypt, febs.crypt)
      : febs.crypt
    window['febs'].utils = window['febs'].utils
      ? febs.utils.mergeMap(window['febs'].utils, febs.utils)
      : febs.utils
    window['febs'].net = window['febs'].net
      ? febs.utils.mergeMap(window['febs'].net, febs.net)
      : febs.net
    window['febs'].dom = window['febs'].dom
      ? febs.utils.mergeMap(window['febs'].dom, febs.dom)
      : febs.dom
  }

  if (!window['$']) window['$'] = febs['$']
  if (!window['jQuery']) window['jQuery'] = febs['$']

  //
  // debug.
  //
  // if (!console.debug) {
  window.console.debug = function() {
    if (window.__debug) {
      var logfoo
      if (window.console.warn) logfoo = window.console.warn
      else logfoo = window.console.log

      for (var i = 0; i < arguments.length; i++) {
        logfoo(arguments[i])
      }
    }
  }
  // }

  return febs
})
