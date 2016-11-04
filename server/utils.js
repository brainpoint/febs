'use strict';

/**
 * Copyright (c) 2015 Copyright citongs All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var promise = require('promise');
var assert  = require('assert');


/**
 * @desc: the browser is mobile.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsMobile = function(userAgent) {

  var agent = userAgent;
  var platforms = [
    'Android', 'webOS', 'iPhone', 'iPad',
    'iPod', 'Blackberry', 'Windows Phone'
  ];
  var expression = new RegExp(platforms.join('|'), 'i');

  return agent.match(expression) != null;
}

/**
 * @desc: the browser is ios.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsIOS = function(userAgent) {

  var agent = userAgent;
  var platforms = [
    'iPhone', 'iPad',
    'iPod'
  ];
  var expression = new RegExp(platforms.join('|'), 'i');

  return agent.match(expression) != null;
}


/**
 * @desc: the browser is phone.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsPhone = function(userAgent) {

  var agent = userAgent;
  var platforms = [
    'Android', 'iPhone',
    'iPod', 'Blackberry', 'Windows Phone'
  ];
  var expression = new RegExp(platforms.join('|'), 'i');

  return agent.match(expression) != null;
}

/**
* @desc 无符big整型.
*/
exports.isBigint_u = isBigint_u;
function isBigint_u(v) {
  if (Number.isInteger(v))
    return true;
  if (!v)
    return false;

  if (typeof v === 'string')
  {
    if (v.length > 22)
      return false;
    for (var j = 0; j < v.length; j++) {
      if (v[j] < '0' || v[j] > '9')
        return false;
    }
    if (v.length > 1 && v[0] == '0')
      return false;
    else {
      return true;
    }
  }
  else {
    return false;
  }
};

/**
* @desc 比较两个unsign-big整型的大小(假设两个都是合法的unsign-big整型).
* @return a>b(>0); a==b(=0); a<b(<0).
*/
exports.bigint_u_cmp = function(a,b) {
  assert(isBigint_u(a) && isBigint_u(b));

  if (Number.isInteger(a))
  {
    if (Number.isInteger(b))  return a-b;
    else  return -1;
  }
  else {
    if (Number.isInteger(b))  return 1;
    else {
      if (a.length != b.length) return a.length - b.length;
      for (var i = 0; i < a.length; i++) {
        if (a[i] > b[i])
          return 1;
        else if (a[i] < b[i])
          return -1;
      }
      return 0;
    }
  }
};


/**
 * @desc: 获取时间的string.
 * @param time: ms.
 * @return: string.
 */
exports.getTimeString = function(time)
{
  if (typeof time !== "number")
    return "";

  var t = new Date(time);
  var ts = t.getFullYear() + '-' + ((t.getMonth()+1) < 10 ? '0'+(t.getMonth()+1) : (t.getMonth()+1))
                           + '-' + (t.getDate() < 10 ? '0'+t.getDate() : t.getDate())
                           + ' / ' + (t.getHours() < 10 ? '0'+t.getHours() : t.getHours())
                           + ':' + (t.getMinutes() < 10 ? '0'+t.getMinutes() : t.getMinutes())
                           + ':' + (t.getSeconds() < 10 ? '0'+t.getSeconds() : t.getSeconds());
  return ts;
};

/**
 * @desc: getDate('2012-05-09')
 * @return: Date.
 */
exports.getDate = function(strDate) {
  var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
  function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
  return date;
}

/**
 * @desc: 获取日期的string.
 * @param time: ms.
 * @return: string.
 */
exports.getDateString = function(time)
{
  if (typeof time !== "number")
    return "";

  var t = new Date(time);
  var ts = t.getFullYear() + '-' + ((t.getMonth()+1) < 10 ? '0'+(t.getMonth()+1) : (t.getMonth()+1))
                           + '-' + (t.getDate() < 10 ? '0'+t.getDate() : t.getDate());
  return ts;
};

/**
 * @desc: 合并多个map.
 * @return: {}
 */
exports.mergeMap = function()
{
  var map0 = {};
  var map2;
  for (var i=0;i<arguments.length;i++){
    map2=arguments[i];
    if (map2)
    {
      for (var k in map2){
        map0[k]=map2[k]
      }
    }
  }

  return map0;
};

/**
 * @desc: make a uuid string.
 * @return: string
 */
exports.uuid = function() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
};

/**
* @desc: 创建promise，但函数中的this可以为指定值.
*         例如: yield denodeify(fs.exists)(path);
* @param self: 指定的对象.s
* @return: promise.
*/
exports.denodeify = function (fn, self, argumentCount) {
  argumentCount = argumentCount || Infinity;
  return function () {
    var args = Array.prototype.slice.call(arguments, 0,
        argumentCount > 0 ? argumentCount : 0);
    return new Promise(function (resolve, reject) {
      args.push(function (err, res) {
        if (err) reject(err);
        else resolve(res);
      })
      var res = fn.apply(self, args);
      if (res &&
        (
          typeof res === 'object' ||
          typeof res === 'function'
        ) &&
        typeof res.then === 'function'
      ) {
        resolve(res);
      }
    })
  }
}


/**
* @desc: 判断参数是否是null,undefined,NaN
* @return: boolean
*/
exports.isEmpty = function(e) {
  return e === null || e === undefined || Number.isNaN(e);
}