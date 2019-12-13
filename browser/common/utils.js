'use strict';

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var PromiseLib   = Promise;
var utilsDate    = require('./date');


/**
 * @desc: 模拟sleep.
 * @return: Promise.
 *     在ms时间后执行.
 * @e.g.
 *     febs.utils.sleep(1000).then(()=>{
          //1000ms之后resolve.
       });
 */
exports.sleep = function(ms) {
  return new PromiseLib(function (resolve, reject) {
    try {
      setTimeout(function(){
        resolve();
      }, ms);
    } catch(err) {
      reject(err);
    }
  });
}

/**
 * @desc: the browser is mobile.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsMobile = function(userAgent) {

  if (!userAgent) {
    if (typeof window !== undefined) {
      userAgent = window.navigator.userAgent
    }
  }

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
  if (!userAgent) {
    if (typeof window !== undefined) {
      userAgent = window.navigator.userAgent
    }
  }

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
  if (!userAgent) {
    if (typeof window !== undefined) {
      userAgent = window.navigator.userAgent
    }
  }
  
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
  if (!userAgent) {
    if (typeof window !== undefined) {
      userAgent = window.navigator.userAgent
    }
  }
  
  var agent = userAgent;
  if(agent.match(/MicroMessenger/i)=="MicroMessenger") {
      return true;
  } else {
      return false;
  }
}

/**
 * @desc: 合并多个map (浅拷贝).
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
* @desc: 判断参数是否是null,undefined,NaN
* @return: boolean
*/
exports.isNull = function(e) {
  return e === null || e === undefined || Number.isNaN(e);
}

/**
 * date.
 */
exports.getTimeString = utilsDate.getTimeString;
exports.getTimeStringFromNow = utilsDate.getTimeStringFromNow;
exports.getDate = utilsDate.getDate;
exports.getDate2 = utilsDate.getDate2;

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
    return new PromiseLib(function (resolve, reject) {
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