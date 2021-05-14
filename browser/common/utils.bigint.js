'use strict';

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var BigNumber = require('../third-party/bignumber.js');

exports.BigNumber = BigNumber;

/**
 * @desc: 进行bigint转换.
 */
exports.bigint = 
function(v) {
  if (exports.bigint_check(v)) {
    if (typeof v === 'string') {
      if (v.length >= 15) // 对千亿以上的数值使用bignumber.
        return new BigNumber(v);
      return Number(v);
    } else {
      return v;
    }
  }
  else {
    return Number.NaN;
  }
}

/**
 * @desc: 判断是否是bigint.
 */
exports.bigint_check = 
function(v) {
  if (Number.isInteger(v))
    return true;
  if (!v)
    return false;

  var typev = typeof v;
  if (typev === 'string')
  {
    if (v.length > 100 || v.length < 1)
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
  else if (typev === 'object') {
    return !!v.isBigNumber;
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
function(a, b) {if (!(a instanceof BigNumber)) a = new BigNumber(a); return a.plus(b);}

exports.bigint_minus = 
function(a, b) {if (!(a instanceof BigNumber)) a = new BigNumber(a); return a.minus(b);}

exports.bigint_dividedBy = 
function(a, b) {if (!(a instanceof BigNumber)) a = new BigNumber(a); return a.dividedBy(b);}

exports.bigint_mul = 
function(a, b) {if (!(a instanceof BigNumber)) a = new BigNumber(a); return a.times(b);}

/**
* @desc: compare with bigint.
* @return: boolean.
*/
exports.bigint_equal = 
function(a, b) {if (!(a instanceof BigNumber)) a = new BigNumber(a); return a.equals(b);}

exports.bigint_more_than = 
function(a, b) {if (!(a instanceof BigNumber)) a = new BigNumber(a); return a.greaterThan(b);}

exports.bigint_more_than_e = 
function(a, b) {if (!(a instanceof BigNumber)) a = new BigNumber(a); return a.greaterThanOrEqualTo(b);}

exports.bigint_less_than = 
function(a, b) {if (!(a instanceof BigNumber)) a = new BigNumber(a); return a.lessThan(b);}

exports.bigint_less_than_e = 
function(a, b) {if (!(a instanceof BigNumber)) a = new BigNumber(a); return a.lessThanOrEqualTo(b);}


exports.bigint_mod = 
function(a, b) { 
  if (Number.isInteger(a)) {
    if (Number.isInteger(b)) 
      return a%b; 
    else {
      return (new BigNumber(a)).mod(b);
    }
  }
  
  if (!(a instanceof BigNumber)) a = new BigNumber(a);
  return a.mod(b);
}

/**
* @desc: 转换bigint->string.
* @param fixed: 小数位个数, 默认为0.
* @return: string.
*/
exports.bigint_toFixed = 
function(a, fixed) { fixed = (fixed||0); if (!(a instanceof BigNumber)) a = new BigNumber(a); return a.toFixed(fixed);}


