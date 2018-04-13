'use strict';

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var PromiseLib   = Promise;
// var BigNumber = require('../third-party/bignumber.min.js');
var BigNumber = require('bignumber.js');

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
exports.browserIsMobile = function() {
  var agent = window.navigator.userAgent;
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
exports.browserIsIOS = function() {
  var agent = window.navigator.userAgent;
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
exports.browserIsPhone = function() {
  var agent = window.navigator.userAgent;
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
exports.browserIsWeixin = function() {
  var agent = window.navigator.userAgent;
  if(agent.match(/MicroMessenger/i)=="MicroMessenger") {
      return true;
  } else {
      return false;
  }
}

/**
* @desc: 判断是否是ie.
*/
exports.browserIsIE=
function() {
  if (!!window.ActiveXObject || "ActiveXObject" in window)
    return true;
  else
    return false;
}

/**
* @desc: 判断ie版本号.
* @return number. 非ie返回Number.MAX_SAFE_INTEGER.
*/
exports.browserIEVer=
function() {
  if (!exports.browserIsIE()) return Number.MAX_SAFE_INTEGER;
  
  var b_version = navigator.appVersion
  var version = b_version.split(";");
  var trim_Version = version[1].replace(/[ ]/g, "");
  if (!trim_Version || trim_Version.length < 5) {
    var userAgent = navigator.userAgent;
    userAgent = userAgent.toLowerCase();
    if (userAgent.indexOf('rv:11.') > 0) return 11;
    if (userAgent.indexOf('rv:12.') > 0) return 12;
    return Number.MAX_SAFE_INTEGER;
  }

  return parseInt(trim_Version[4]);
}

/**
 * @desc: the browser is support html5.
 */
exports.browserIsSupportHtml5=
function () {
  if (typeof(Worker) !== "undefined")
  {
      return true;
  }
  else
  {
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
function getTimeString(time, fmt, weekFmt)
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
exports.getTimeString = getTimeString;


/**
 * @desc: 获取指定时间距离现在的时间描述.
 *        例如, 昨天, 1小时前等.
 * @param time: ms. 小于当前时间, 大于当前时间将显示为 '刚刚';
 * @param strFmt: 需要显示的文字. 
 *                默认为 {
 *                        now:    '刚刚',           // 3秒钟以内将显示此信息.
 *                        second: '秒前',
 *                        minute: '分钟前',
 *                        hour:   '小时前',
 *                        day_yesterday: '昨天',
 *                        day:    '天前',
 *                        month:  '个月前',          // 6个月内将显示此信息.
 *                        time:   'yyyy-M-d h:m:s'  // 超过6个月将使用此格式格式化时间
 *                       }
 * @return: string.
 */
exports.getTimeStringFromNow = function(time, strFmt)
{
  strFmt = strFmt || {};
  strFmt.now      = strFmt.now      || '刚刚';
  strFmt.second   = strFmt.second   || '秒前';
  strFmt.minute   = strFmt.minute   || '分钟前';
  strFmt.hour     = strFmt.hour     || '小时前';
  strFmt.day_yesterday = strFmt.day_yesterday || '昨天';
  strFmt.day       = strFmt.day      || '天前';
  strFmt.month    = strFmt.month     || '个月前';
  strFmt.time     = strFmt.time      || 'yyyy-M-d h:m:s';

  var now = Math.ceil(Date.now()/1000);
  time = Math.ceil(time/1000);

  if (now > time)
  {
    var s = now - time;
    if (s < 3) {
      return strFmt.now;
    }

    if (s < 60) {
      return s.toString()+strFmt.second;
    }

    if (s < 60*60) {
      return Math.ceil(s/60).toString()+strFmt.minute;
    }

    if (s < 60*60*24) {
      return Math.ceil(s/60/60).toString()+strFmt.hour;
    }

    if (s < 60*60*24*30) {
      var dNow = new Date(now*1000);

      dNow.setHours(0, 0, 1);
      if (dNow.getTime()-time <= 60*60*24) {
        return strFmt.day_yesterday;
      }

      return Math.ceil(s/60/60/24).toString()+strFmt.day;
    }

    if (s < 60*60*24*30*6) {
      return Math.ceil(s/60/60/24/30).toString()+strFmt.month;
    }

    return getTimeString(time, strFmt.time);
  }

  return strFmt.now;
}

/**
 * @desc: getDate('2012-05-09')
 * @return: Date.
 */
exports.getDate = function(strDate) {
  var date = new Date(
    parseInt(strDate.substr(0, 4)), 
    parseInt(strDate.substr(5, 2), 10)-1,
    parseInt(strDate.substr(8, 2)));
  return date;
}


/**
 * @desc: getDate2('20120509')
 * @return: Date.
 */
exports.getDate2 = function(strDate) {
  var date = new Date(
    parseInt(strDate.substr(0, 4)), 
    parseInt(strDate.substr(4, 2), 10)-1,
    parseInt(strDate.substr(6, 2)));
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
