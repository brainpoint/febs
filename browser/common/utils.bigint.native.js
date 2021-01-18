'use strict';

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */


var Window = "undefined" != typeof window ? window : ("undefined" != typeof global ? global : ("undefined" != typeof self ? self : undefined));

function checkoutSupportBigint() {
  if (!Window.hasOwnProperty('BigInt')) {
    throw new Error('Unsupport BigInt');
  }
}

var BigInt = Window.BigInt;

/**
 * @desc: 进行bigint转换.
 */
exports.bigint = 
function (v) {
  if (exports.bigint_check(v)) {
    return BigInt(v);
  }
  else {
    return Number.NaN;
  }
}

/**
 * @desc: 判断是否是bigint.
 */
exports.bigint_check = 
function (v) {
  checkoutSupportBigint();
  if (Number.isInteger(v))
    return true;
  if (!v)
    return false;

  var typev = typeof v;
  if (typev === 'string')
  {
    if (v.length > 22 || v.length < 1)
      return false;

    for (var j = 1; j < v.length; j++) {
      if (v[j] < '0' || v[j] > '9')
        return false;
    }
    
    if (v.length == 1) {
      if (v[0] < '0' || v[0] > '9')
        return false;
      else
        return true;
    }
    
    if (v[0] == '-') {
      if (v.length < 2 || v[1] < '1' || v[1] > '9')
        return false;
    } else {
      if (v[0] < '1' || v[0] > '9')
        return false;
    }

    return true;
  }
  else if (typev === 'bigint') {
    return true;
  }
  else {
    return false;
  }
}

/**
* @desc: calc bigint
* @return: bigint.
*/
exports.bigint_add = 
function (a, b) { checkoutSupportBigint(); return BigInt(a) + BigInt(b); }

exports.bigint_minus = 
function (a, b) { checkoutSupportBigint(); return BigInt(a) - BigInt(b);}

exports.bigint_dividedBy = 
function (a, b) { checkoutSupportBigint(); return BigInt(a) / BigInt(b);}

exports.bigint_mul = 
function (a, b) { checkoutSupportBigint(); return BigInt(a) * BigInt(b);}

/**
* @desc: compare with bigint.
* @return: boolean.
*/
exports.bigint_equal = 
function (a, b) { checkoutSupportBigint(); return BigInt(a) === BigInt(b); }

exports.bigint_more_than = 
function(a, b) { checkoutSupportBigint(); return BigInt(a) > BigInt(b); }

exports.bigint_more_than_e = 
function(a, b) { checkoutSupportBigint(); return BigInt(a) >= BigInt(b); }

exports.bigint_less_than = 
function(a, b) { checkoutSupportBigint(); return BigInt(a) < BigInt(b); }

exports.bigint_less_than_e = 
function(a, b) { checkoutSupportBigint(); return BigInt(a) <= BigInt(b); }


exports.bigint_mod = 
function(a, b) { 
  checkoutSupportBigint(); return BigInt(a) % BigInt(b);
}

/**
* @desc: 转换bigint->string.
* @param fixed: 小数位个数, 默认为0.
* @return: string.
*/
exports.bigint_toFixed =
  function (a, fixed) {
    checkoutSupportBigint();
    a = BigInt(a).toString();
    if (fixed > 0) {
      a += '.0';
    }
    return a;
  }


