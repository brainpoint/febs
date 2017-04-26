'use strict';

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var promise = require('promise');
var assert  = require('assert');
var BigNumber = require('bignumber.js');

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
 * @desc: the browser is weixin.
 */
exports.browserIsWeixin = function(userAgent) {
  var agent = userAgent;
  if(agent.match(/MicroMessenger/i)=="MicroMessenger") {
      return true;
  } else {
      return false;
  }
}

/**
 * @desc: 获取时间的string.
 * @param time: ms.
 * @param fmt: 格式化, 默认为 'HH:mm:ss'
 *             年(y)、月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 *              'yyyy-MM-dd hh:mm:ss.S' ==> 2006-07-02 08:09:04.423
 *              'yyyy-MM-dd E HH:mm:ss' ==> 2009-03-10 星期二 20:09:04
 *              'yyyy-M-d h:m:s.S'      ==> 2006-7-2 8:9:4.18
 * @param weekFmt: 星期的文字格式, 默认为 {'0':'星期天', '1': '星期一', ..., '6':'星期六'}
 * @return: string.
 */
exports.getTimeString = function(time, fmt, weekFmt)
{
  if (typeof time !== "number")
    return "";

  fmt = fmt || 'HH:mm:ss';

  var t = new Date(time);
    var o = {         
    "M+" : t.getMonth()+1, //月份         
    "d+" : t.getDate(), //日         
    "h+" : t.getHours()%12 == 0 ? 12 : t.getHours()%12, //小时         
    "H+" : t.getHours(), //小时         
    "m+" : t.getMinutes(), //分         
    "s+" : t.getSeconds(), //秒         
    "q+" : Math.floor((t.getMonth()+3)/3), //季度         
    "S" : t.getMilliseconds() //毫秒         
    };         
    var week = weekFmt || {         
    "0" : "星期天",
    "1" : "星期一",
    "2" : "星期二",
    "3" : "星期三", 
    "4" : "星期四",
    "5" : "星期五",
    "6" : "星期六",
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (t.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, week[t.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;
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
exports.isNull = function(e) {
  return e === null || e === undefined || Number.isNaN(e);
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

  if (typeof v === 'string')
  {
    if (v.length > 22 || v.length < 1)
      return false;

    for (var j = 1; j < v.length; j++) {
      if (v[j] < '0' || v[j] > '9')
        return false;
    }
    
    if (v[0] == '-') {
      if (v.length < 2 || v[1] < '1' || v[1] > '9')
        return false;
    } else {
      if (v[j] < '1' || v[j] > '9')
        return false;
    }

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


/**
* @desc: 转换bigint->string.
* @param fixed: 小数位个数, 默认为0.
* @return: string.
*/
exports.bigint_toFixed = 
function(a, fixed) { fixed = (fixed||0); if (!(a instanceof BigNumber)) a = new BigNumber(a); return a.toFixed(fixed);}
