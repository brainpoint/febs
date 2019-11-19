/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var utils = __webpack_require__(14);

/**
 * @desc: 模拟sleep.
 * @return: Promise.
 *     在ms时间后执行.
 * @e.g.
 *     febs.utils.sleep(1000).then(()=>{
          //1000ms之后resolve.
       });
 */
exports.sleep = utils.sleep;

/**
 * @desc: the browser is mobile.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsMobile = utils.browserIsMobile;

/**
 * @desc: the browser is ios.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsIOS = utils.browserIsIOS;

/**
 * @desc: the browser is phone.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsPhone = utils.browserIsPhone;

/**
 * @desc: the browser is weixin.
 */
exports.browserIsWeixin = utils.browserIsWeixin;

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
exports.getTimeString = utils.getTimeString;

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
exports.getTimeStringFromNow = utils.getTimeStringFromNow;

/**
 * @desc: getDate('2012-05-09')
 * @return: Date.
 */
exports.getDate = utils.getDate;

/**
 * @desc: getDate2('20120509')
 * @return: Date.
 */
exports.getDate2 = utils.getDate2;

/**
 * @desc: 合并多个map.
 * @return: {}
 */
exports.mergeMap = utils.mergeMap;

/**
 * @desc: 判断参数是否是null,undefined,NaN
 * @return: boolean
 */
exports.isNull = utils.isNull;

/**
* @desc: 创建promise，但函数中的this可以为指定值.
*         例如: yield denodeify(fs.exists)(path);
* @param self: 指定的对象.s
* @return: promise.
*/
exports.denodeify = utils.denodeify;

/**
 * @desc: 判断是否是ie.
 */
exports.browserIsIE = function () {
  if (!!window.ActiveXObject || "ActiveXObject" in window) return true;else return false;
};

/**
 * @desc: 判断ie版本号.
 * @return number. 非ie返回Number.MAX_SAFE_INTEGER.
 *        如果是 edge 返回 'edge'
 */
exports.browserIEVer = function () {
  if (!exports.browserIsIE()) return Number.MAX_SAFE_INTEGER;

  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6; //IE版本<=7
    }
  } else if (isEdge) {
    return 'edge'; //edge
  } else if (isIE11) {
    return 11; //IE11  
  } else {
    Number.MAX_SAFE_INTEGER;; //不是ie浏览器
  }
};

/**
 * @desc: the browser is support html5.
 */
exports.browserIsSupportHtml5 = function () {
  if (typeof Worker !== "undefined") {
    return true;
  } else {
    return false;
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var string = __webpack_require__(3);

/**
* @desc: 判断是否是手机号码.
* @return: boolean.
*/
exports.isPhoneMobile = string.isPhoneMobile;

/**
 * @desc: 是否为空串.
 * @return: boolean.
 */
exports.isEmpty = string.isEmpty;

/**
 * @desc: 获得字符串utf8编码后的字节长度.
 * @return: u32.
 */
exports.getByteSize = string.getByteSize;

/**
 * @desc: 替换字符串中所有的strSrc->strDest.
 * @return: string.
 */
exports.replace = string.replace;

exports.utf8ToBytes = string.utf8ToBytes;
exports.bytesToUtf8 = string.bytesToUtf8;

exports.trim = string.trim;

/**
* @desc: 对字符串中的 <> 标签进行转义为 &lt;, &gt;
* @return: string.
*/
exports.escapeHtml = string.escapeHtml;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var PromiseLib = Promise;

/**
* @desc: 判断是否是有效时间.
*/
exports.isValidate = function (date /*:Date*/) /*:boolean*/{
  if (isNaN(date) || !date || date.toString() == 'Invalid Date') return false;
  return date instanceof Date;
};

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
function getTimeString(time, fmt, weekFmt) {
  if (typeof time !== "number") return "";

  fmt = fmt || 'HH:mm:ss';

  var t = new Date(time);
  var o = {
    "M+": t.getMonth() + 1, //月份         
    "d+": t.getDate(), //日         
    "h+": t.getHours() % 12 == 0 ? 12 : t.getHours() % 12, //小时         
    "H+": t.getHours(), //小时         
    "m+": t.getMinutes(), //分         
    "s+": t.getSeconds(), //秒         
    "q+": Math.floor((t.getMonth() + 3) / 3), //季度         
    "S": t.getMilliseconds() //毫秒         
  };
  var week = weekFmt || {
    "0": "星期天",
    "1": "星期一",
    "2": "星期二",
    "3": "星期三",
    "4": "星期四",
    "5": "星期五",
    "6": "星期六"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, week[t.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
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
exports.getTimeStringFromNow = function (time, strFmt) {
  strFmt = strFmt || {};
  strFmt.now = strFmt.now || '刚刚';
  strFmt.second = strFmt.second || '秒前';
  strFmt.minute = strFmt.minute || '分钟前';
  strFmt.hour = strFmt.hour || '小时前';
  strFmt.day_yesterday = strFmt.day_yesterday || '昨天';
  strFmt.day = strFmt.day || '天前';
  strFmt.month = strFmt.month || '个月前';
  strFmt.time = strFmt.time || 'yyyy-M-d h:m:s';

  var now = Math.ceil(Date.now() / 1000);
  time = Math.ceil(time / 1000);

  if (now > time) {
    var s = now - time;
    if (s < 3) {
      return strFmt.now;
    }

    if (s < 60) {
      return s.toString() + strFmt.second;
    }

    if (s < 60 * 60) {
      return Math.ceil(s / 60).toString() + strFmt.minute;
    }

    if (s < 60 * 60 * 24) {
      return Math.ceil(s / 60 / 60).toString() + strFmt.hour;
    }

    if (s < 60 * 60 * 24 * 30) {
      var dNow = new Date(now * 1000);

      dNow.setHours(0, 0, 1);
      if (dNow.getTime() - time <= 60 * 60 * 24) {
        return strFmt.day_yesterday;
      }

      return Math.ceil(s / 60 / 60 / 24).toString() + strFmt.day;
    }

    if (s < 60 * 60 * 24 * 30 * 6) {
      return Math.ceil(s / 60 / 60 / 24 / 30).toString() + strFmt.month;
    }

    return getTimeString(time, strFmt.time);
  }

  return strFmt.now;
};

/**
 * @desc: 通过字符串获取date. getTime('2012-05-09 11:10:12')
 * @param strTime: 时间字符串. '2012-05-09 11:10:12' 
 * @return: Date.
 */
exports.getTime = function (strTime) {
  var date = new Date();
  date.setFullYear(parseInt(strTime.substr(0, 4)), parseInt(strTime.substr(5, 2), 10) - 1, parseInt(strTime.substr(8, 2)));
  date.setHours(parseInt(strTime.substr(11, 2)) || 0, parseInt(strTime.substr(14, 2)) || 0, parseInt(strTime.substr(17, 2)) || 0, 0);
  return date;
};

/**
 * @desc: 通过时间获取date. getTime2('20120509111012')
 * @param strTime: 时间字符串. '20120509111012' 
 * @return: Date.
 */
exports.getTime2 = function (strTime) {
  var date = new Date();

  date.setFullYear(parseInt(strTime.substr(0, 4)), parseInt(strTime.substr(4, 2), 10) - 1, parseInt(strTime.substr(6, 2)));
  date.setHours(parseInt(strTime.substr(8, 2)) || 0, parseInt(strTime.substr(10, 2)) || 0, parseInt(strTime.substr(12, 2)) || 0, 0);

  return date;
};

/**
 * @desc: getDate('2012-05-09')
 * @return: Date.
 */
exports.getDate = function (strDate) {
  var date = new Date(parseInt(strDate.substr(0, 4)), parseInt(strDate.substr(5, 2), 10) - 1, parseInt(strDate.substr(8, 2)));
  return date;
};

/**
 * @desc: getDate2('20120509')
 * @return: Date.
 */
exports.getDate2 = function (strDate) {
  var date = new Date(parseInt(strDate.substr(0, 4)), parseInt(strDate.substr(4, 2), 10) - 1, parseInt(strDate.substr(6, 2)));
  return date;
};

/**
 * @desc: 获取时间的协调世界时间 string.
 * @param time: ms. (本地时间)
 * @param fmt: 格式化, 默认为 'HH:mm:ss'
 *             年(y)、月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 *              'yyyy-MM-dd hh:mm:ss.S' ==> 2006-07-02 08:09:04.423
 *              'yyyy-MM-dd E HH:mm:ss' ==> 2009-03-10 星期二 20:09:04
 *              'yyyy-M-d h:m:s.S'      ==> 2006-7-2 8:9:4.18
 * @param weekFmt: 星期的文字格式, 默认为 {'0':'星期天', '1': '星期一', ..., '6':'星期六'}
 * @return: string.
 */
exports.getUTCTimeString = function (time, fmt, weekFmt) {
  if (typeof time !== "number") return "";

  fmt = fmt || 'HH:mm:ss';

  var t = new Date(time);
  var o = {
    "M+": t.getUTCMonth() + 1, //月份         
    "d+": t.getUTCDate(), //日         
    "h+": t.getUTCHours() % 12 == 0 ? 12 : t.getUTCHours() % 12, //小时         
    "H+": t.getUTCHours(), //小时         
    "m+": t.getUTCMinutes(), //分         
    "s+": t.getUTCSeconds(), //秒         
    "q+": Math.floor((t.getUTCMonth() + 3) / 3), //季度         
    "S": t.getUTCMilliseconds() //毫秒         
  };
  var week = weekFmt || {
    "0": "星期天",
    "1": "星期一",
    "2": "星期二",
    "3": "星期三",
    "4": "星期四",
    "5": "星期五",
    "6": "星期六"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (t.getUTCFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, week[t.getUTCDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return fmt;
};

/**
 * @desc: 通过世界时间获取date. getDateFromUTC('2012-05-09')
 * @param strDateUTC: 世界日期字符串. '2012-05-09' 
 * @return: Date.
 */
exports.getDateFromUTC = function (strDateUTC) {
  var date = new Date();
  date.setUTCFullYear(parseInt(strDateUTC.substr(0, 4)), parseInt(strDateUTC.substr(5, 2), 10) - 1, parseInt(strDateUTC.substr(8, 2)));
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

/**
 * @desc: 通过世界时间获取date. getDate2FromUTC('20120509')
 * @param strDateUTC: 世界日期字符串. '20120509' 
 * @return: Date.
 */
exports.getDate2FromUTC = function (strDateUTC) {
  var date = new Date();

  date.setUTCFullYear(parseInt(strDateUTC.substr(0, 4)), parseInt(strDateUTC.substr(4, 2), 10) - 1, parseInt(strDateUTC.substr(6, 2)));
  date.setUTCHours(0, 0, 0, 0);

  return date;
};

/**
 * @desc: 通过世界时间获取date. getTimeFromUTC('2012-05-09 11:10:12')
 * @param strTimeUTC: 世界时间字符串. '2012-05-09 11:10:12' 
 * @return: Date.
 */
exports.getTimeFromUTC = function (strTimeUTC) {
  var date = new Date();
  date.setUTCFullYear(parseInt(strTimeUTC.substr(0, 4)), parseInt(strTimeUTC.substr(5, 2), 10) - 1, parseInt(strTimeUTC.substr(8, 2)));
  date.setUTCHours(parseInt(strTimeUTC.substr(11, 2)) || 0, parseInt(strTimeUTC.substr(14, 2)) || 0, parseInt(strTimeUTC.substr(17, 2)) || 0, 0);
  return date;
};

/**
 * @desc: 通过世界时间获取date. getTime2FromUTC('20120509111012')
 * @param strTimeUTC: 世界日期字符串. '20120509111012' 
 * @return: Date.
 */
exports.getTime2FromUTC = function (strTimeUTC) {
  var date = new Date();

  date.setUTCFullYear(parseInt(strTimeUTC.substr(0, 4)), parseInt(strTimeUTC.substr(4, 2), 10) - 1, parseInt(strTimeUTC.substr(6, 2)));
  date.setUTCHours(parseInt(strTimeUTC.substr(8, 2)) || 0, parseInt(strTimeUTC.substr(10, 2)) || 0, parseInt(strTimeUTC.substr(12, 2)) || 0, 0);

  return date;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

/**
 * @desc: 判断是否是手机号码.
 * @return: boolean.
 */

exports.isPhoneMobile = function (str) {
  if (!str) return false;
  if (/^(1[2-9][0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89]|98[0-9]|99[0-9])\d{8}$/.test(str)) {
    return true;
  }
  return false;
};

/**
 * @desc: 判断是否是email.
 * @return: boolean.
 */
exports.isEmail = function (str) {
  if (!str) return false;
  if (/^(([A-Za-z0-9\u4e00-\u9fa5_-]|\.)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)$/.test(str)) {
    return true;
  }
  return false;
};

/**
 * @desc: 判断是否是英文数字组合.
 * @return: boolean.
 */
exports.isAlphaOrDigit = function (str) {
  if (!str) return false;
  if (/^[A-Za-z0-9]+$/.test(str)) {
    return true;
  }
  return false;
};

/**
 * @desc: 判断是否是中文.
 * @return: boolean.
 */
exports.isChinese = function (str) {
  if (!str) return false;
  if (/^[\u4e00-\u9fa5]{0,}$/.test(str)) {
    return true;
  }
  return false;
};

/**
 * @desc: 是否为空串.
 * @return: boolean.
 */
exports.isEmpty = function (s) {

  if (!s) {
    return true;
  }

  if (typeof s !== 'string') {
    return true;
  }

  if (s.length == 0) return true;

  return false;
};

/**
 * @desc: 获得字符串utf8编码后的字节长度.
 * @return: u32.
 */
exports.getByteSize = function (s) {
  if (!s) return 0;

  var totalLength = 0;
  var i;
  var charCode;
  for (i = 0; i < s.length; i++) {
    charCode = s.charCodeAt(i);
    if (charCode < 0x007f) {
      totalLength = totalLength + 1;
    } else if (0x0080 <= charCode && charCode <= 0x07ff) {
      totalLength += 2;
    } else if (0x0800 <= charCode && charCode <= 0xffff) {
      totalLength += 3;
    } else if (0x10000 <= charCode) {
      totalLength += 4;
    }
  }
  //alert(totalLength);
  return totalLength;
};

/**
 * @desc: 替换字符串中所有的strSrc->strDest.
 * @return: string.
 */
exports.replace = function (str, strSrc, strDest) {
  if (!str || !strSrc) return str;

  if (str.length == 0) return str;

  var s = '';

  var endPos = str.length;
  var i = 0;
  var j = 0;
  do {
    i = str.indexOf(strSrc, j);
    if (-1 != i && i < endPos) {
      if (i != j) s += str.slice(j, i);

      s += strDest;
      j = i + strSrc.length;
    } else {
      s += str.slice(j);
      break;
    }
  } while (i < endPos); // while

  return s;
};

exports.utf8ToBytes = function (str) {
  if (!str) {
    return new Array();
  }
  var bytes = new Array();
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(c >> 18 & 0x07 | 0xF0);
      bytes.push(c >> 12 & 0x3F | 0x80);
      bytes.push(c >> 6 & 0x3F | 0x80);
      bytes.push(c & 0x3F | 0x80);
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(c >> 12 & 0x0F | 0xE0);
      bytes.push(c >> 6 & 0x3F | 0x80);
      bytes.push(c & 0x3F | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(c >> 6 & 0x1F | 0xC0);
      bytes.push(c & 0x3F | 0x80);
    } else {
      bytes.push(c & 0xFF);
    }
  }
  return bytes;
};

exports.bytesToUtf8 = function (utf8Bytes) {
  var unicodeStr = "";
  for (var pos = 0; pos < utf8Bytes.length;) {
    var flag = utf8Bytes[pos];
    var unicode = 0;
    if (flag >>> 7 === 0) {
      unicodeStr += String.fromCharCode(utf8Bytes[pos]);
      pos += 1;
    } else if ((flag & 0xFC) === 0xFC) {
      unicode = (utf8Bytes[pos] & 0x3) << 30;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 24;
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 18;
      unicode |= (utf8Bytes[pos + 3] & 0x3F) << 12;
      unicode |= (utf8Bytes[pos + 4] & 0x3F) << 6;
      unicode |= utf8Bytes[pos + 5] & 0x3F;
      unicodeStr += String.fromCharCode(unicode);
      pos += 6;
    } else if ((flag & 0xF8) === 0xF8) {
      unicode = (utf8Bytes[pos] & 0x7) << 24;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 18;
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 12;
      unicode |= (utf8Bytes[pos + 3] & 0x3F) << 6;
      unicode |= utf8Bytes[pos + 4] & 0x3F;
      unicodeStr += String.fromCharCode(unicode);
      pos += 5;
    } else if ((flag & 0xF0) === 0xF0) {
      unicode = (utf8Bytes[pos] & 0xF) << 18;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 12;
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 6;
      unicode |= utf8Bytes[pos + 3] & 0x3F;
      unicodeStr += String.fromCharCode(unicode);
      pos += 4;
    } else if ((flag & 0xE0) === 0xE0) {
      unicode = (utf8Bytes[pos] & 0x1F) << 12;;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 6;
      unicode |= utf8Bytes[pos + 2] & 0x3F;
      unicodeStr += String.fromCharCode(unicode);
      pos += 3;
    } else if ((flag & 0xC0) === 0xC0) {
      //110
      unicode = (utf8Bytes[pos] & 0x3F) << 6;
      unicode |= utf8Bytes[pos + 1] & 0x3F;
      unicodeStr += String.fromCharCode(unicode);
      pos += 2;
    } else {
      unicodeStr += String.fromCharCode(utf8Bytes[pos]);
      pos += 1;
    }
  }
  return unicodeStr;
};

exports.trim = function (str) {
  if (!str) return str;

  return str.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * @desc: 对字符串中的 <>空格"& 标签进行转义为 &lt;, &gt;
 * @return: string.
 */
exports.escapeHtml = function (str) {
  // 转义.
  if (str) {
    str = exports.replace(str, '&', '&amp;');
    str = exports.replace(str, '<', '&lt;');
    str = exports.replace(str, '>', '&gt;');
    str = exports.replace(str, ' ', '&nbsp;');
    str = exports.replace(str, '"', '&quot;');
  }
  return str || '';
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

exports.DefaultTimeout = 5000;

exports.transfer = function (window) {
  var xhr;
  if (window.XMLHttpRequest) xhr = new XMLHttpRequest();else if (window.XDomainRequest) xhr = new XDomainRequest();else {
    var XmlHttpVersions = new Array("MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP");
    for (var i = 0; i < XmlHttpVersions.length && !xmlHttp; i++) {
      try {
        xhr = new ActiveXObject(XmlHttpVersions[i]);
      } catch (e) {}
    }
  }

  return xhr;
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function(global) {
  'use strict';
  if (!global.console) {
    global.console = {};
  }
  var con = global.console;
  var prop, method;
  var dummy = function() {};
  var properties = ['memory'];
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) if (!con[prop]) con[prop] = {};
  while (method = methods.pop()) if (!con[method]) con[method] = dummy;
  // Using `this` for web workers & supports Browserify / Webpack.
})(typeof window === 'undefined' ? this : window);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// window.requestAnimationFrame / window.cancelAnimationFrame


var animationFrame = {};

var lastTime = 0;
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
        var currTime = Date.now();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
}

animationFrame.requestAnimationFrame = window.requestAnimationFrame;
animationFrame.cancelAnimationFrame = window.cancelAnimationFrame;

module.exports = animationFrame;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 *  crc32(str, crc=null);
 *  crc32_file(file, function(crc32Value) {})
 */

var crypt = __webpack_require__(13);

/**
 * @desc: 计算字符串的crc32值
 * @param crc: 可以在这个值得基础上继续计算
 * @return: number.
 */
function crc32( /* String */str, /* Number */crc) {
    if (!crc) crc = 0;
    crc = crc ^ -1;

    for (var i = 0, iTop = str.length; i < iTop; i++) {
        crc = crc >>> 8 ^ crypt.crc32_table[(crc ^ str.charCodeAt(i)) & 0xFF];
    }
    return crc ^ -1;
}
exports.crc32 = crc32;

/**
 * @desc:
 * @param cb: cb(crc32)
 * @return:
 */
function crc32_fileSegment(file, offset, length, cb) {
    if (!file || !cb) {
        if (cb) cb(0);
        return;
    }

    if (offset >= file.size || offset < 0 || length == 0) {
        if (cb) cb(0);
        return;
    }

    if (length < 0) {
        length = file.size;
    }

    var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
    var fileReader = new FileReader();

    if (file.size - offset < length) {
        length = file.size - offset;
    }

    var chunkSize = 1024 * 1024 * 2;
    var chunks = Math.ceil(length / chunkSize);
    var currentChunk = 0;

    var loadNext = function loadNext() {
        var start = currentChunk * chunkSize + offset,
            end = start + chunkSize >= length + offset ? length + offset : start + chunkSize;
        fileReader.readAsBinaryString(blobSlice.call(file, start, end));
    };

    var crc = 0;

    //每块文件读取完毕之后的处理.
    fileReader.onload = function (e) {
        crc = crc32(e.target.result, crc);
        // append binary string
        currentChunk++;

        if (currentChunk < chunks) {
            loadNext();
        } else {
            cb(crc);
        }
    };

    loadNext();
}
exports.crc32_fileSegment = crc32_fileSegment;

/**
 * @desc:
 * @param cb: cb(crc32)
 * @return:
 */
exports.crc32_file = function (file, cb) {
    crc32_fileSegment(file, 0, file.size, cb);
};

/**
* @desc: base64编码.
* @param arrByte: 字节数组.
* @return: string.
*/
exports.base64_encode = crypt.base64_encode;

/**
* @desc: base64解码.
* @return: 字节数组.
*/
exports.base64_decode = function (strBase64) {
    var c1, c2, c3, c4;
    var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    var i = 0,
        len = strBase64.length,
        out = [];

    while (i < len) {
        do {
            c1 = base64DecodeChars[strBase64.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);

        if (c1 == -1) break;

        do {
            c2 = base64DecodeChars[strBase64.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);

        if (c2 == -1) break;

        out.push(c1 << 2 | (c2 & 0x30) >> 4);

        do {
            c3 = strBase64.charCodeAt(i++) & 0xff;
            if (c3 == 61) return out;

            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);

        if (c3 == -1) break;

        out.push((c2 & 0XF) << 4 | (c3 & 0x3C) >> 2);

        do {
            c4 = strBase64.charCodeAt(i++) & 0xff;
            if (c4 == 61) return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);

        if (c4 == -1) break;

        out.push((c3 & 0x03) << 6 | c4);
    }
    return out;
};

/**
* @desc: 生成一个uuid (v4 random).
* @return: 
*/
exports.uuid = function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
* Copyright (c) 2017 Copyright tj All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-02 17:39
* Desc: 
*/

var date = __webpack_require__(2);

exports.isValidate = date.isValidate;
exports.getDate = date.getDate;
exports.getDate2 = date.getDate2;
exports.getDate2FromUTC = date.getDate2FromUTC;
exports.getDateFromUTC = date.getDateFromUTC;
exports.getTime2FromUTC = date.getTime2FromUTC;
exports.getTimeString = date.getTimeString;
exports.getUTCTimeString = date.getUTCTimeString;
exports.getTimeStringFromNow = date.getTimeStringFromNow;
exports.getTimeFromUTC = date.getTimeFromUTC;
exports.getTime = date.getTime;
exports.getTime2 = date.getTime2;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var utils = __webpack_require__(0);
var stringUtils = __webpack_require__(1);

// - parentNodes 父节点 (HTMLNode)
// - name 子节点selector.
// - notAllChildren 仅查询一层子节点.
// 返回匹配到的元素集合.
function _matchElement(parentNodes, name, notAllChildren) {
  var elems;
  var tag = 0; // 0-tag, 1-id, 2-class.
  var nameattr, nameattrVal;

  // :checked, :disabled
  var selector = name.split(':');
  name = selector[0];
  name = stringUtils.trim(name);
  selector = selector[1];
  if (selector) {
    if (selector != 'checked' && selector != 'disabled') {
      throw new Error('only support `:checked or :disabled` selector');
    }
  }

  // attri.
  if (name.indexOf('[') > 0) {
    var iblace = name.indexOf('[');
    nameattr = name.substring(iblace + 1, name.length - 1);
    nameattr = nameattr.split('=');
    if (nameattr.length != 2) {
      throw new Error('Syntax error, unrecognized expression: ' + name);
    }
    nameattrVal = nameattr[1];
    if (nameattrVal.indexOf('\'') >= 0 || nameattrVal.indexOf('"') >= 0) nameattrVal = nameattrVal.substring(1, nameattrVal.length - 1);
    nameattr = nameattr[0];
    name = name.substr(0, iblace);
  }

  if (name[0] == '.') {
    tag = 2;
    name = name.substr(1);
  } else if (name[0] == '#') {
    tag = 1;
    name = name.substr(1);
  }

  if (!parentNodes || parentNodes.length == 0) {
    if (2 == tag) {
      elems = window.document.getElementsByClassName(name);
    } else if (1 == tag) {
      elems = window.document.getElementById(name);
      if (elems) elems = [elems];else elems = [];
    } else if (0 == tag) {
      elems = window.document.getElementsByTagName(name);
    }

    // attrvalue.
    if (nameattr) {
      var tt_elems = elems;
      elems = [];
      for (var i = 0; i < tt_elems.length; i++) {
        if (tt_elems[i].getAttribute(nameattr) === nameattrVal) {
          elems.push(tt_elems[i]);
        }
      }
    } // if.

    if (selector) {
      var tt_elems = elems;
      elems = [];
      for (var i = 0; i < tt_elems.length; i++) {
        if (selector == 'disabled') {
          if (tt_elems[i].disabled) {
            elems.push(tt_elems[i]);
          }
        } else if (selector == 'checked') {
          if (tt_elems[i].checked) {
            elems.push(tt_elems[i]);
          }
        }
      }
    } // if.
  } else {
    elems = [];
    for (var i = 0; i < parentNodes.length; i++) {
      var node1 = parentNodes[i].childNodes;
      if (!node1) continue;
      var node = [];
      for (var j = 0; j < node1.length; j++) {
        node.push(node1[j]);
      }

      for (var j = 0; j < node.length; j++) {
        var add = true;

        if (selector) {
          if (selector == 'disabled') {
            if (!node[j].disabled) {
              add = false;
            }
          } else if (selector == 'checked') {
            if (!node[j].checked) {
              add = false;
            }
          }
        } // if.

        // attrvalue.
        if (add && nameattr) {
          if (node[j].getAttribute(nameattr) !== nameattrVal) {
            add = false;
          }
        }

        if (add) {
          if (2 == tag) {
            if (_hasClass(node[j], name)) {
              elems.push(node[j]);
              continue;
            }
          } else if (1 == tag) {
            if (node[j].id == name) {
              elems.push(node[j]);
              continue;
            }
          } else if (0 == tag) {
            if (node[j].nodeName.toUpperCase() == name.toUpperCase()) {
              elems.push(node[j]);
              continue;
            }
          }
        } // if.

        if (!notAllChildren) {
          var nn = node[j].childNodes;
          if (nn && nn.length > 0) {
            for (var k = 0; k < nn.length; k++) {
              node.push(nn[k]);
            }
            if (j > 20) {
              node = node.slice(j + 1);
              j = -1;
            }
          }
        }
      } // for.
    } // for.
  } // if..else.

  return elems;
}

// - parentNode 仅筛选此节点下的节点.
function _getElement(name, parentNode) {
  if (name === '') name = null;
  var _elem;
  var _isarr = false;
  if (typeof name === 'string') {
    if (name[0] == '<') {
      _elem = window.document.createElement('div');
      _elem.innerHTML = name;
      if (_elem.childNodes.length == 1) {
        _elem = _elem.childNodes[0];
        _isarr = false;
      } else {
        _elem = _elem.childNodes;
        _isarr = true;
      }
    } else {
      if (name.indexOf('<') > 0 || name.indexOf('>') > 0) throw new Error('Syntax error, unrecognized');

      var names = name.split(' ');
      var nodes = parentNode ? [parentNode] : null;
      for (var i = 0; i < names.length; i++) {
        if (names[i] != '') nodes = _matchElement(nodes, names[i], !!parentNode);
      }
      if (nodes.length <= 1) {
        _elem = nodes[0];
        _isarr = false;
      } else {
        _elem = nodes;
        _isarr = true;
      }
    }
  } else {
    _elem = name;
  }
  return { _elem: _elem, _isarr: _isarr };
}

/**
 * hasClass
 */
function _hasClass(element, cName) {
  if (!element || !element.className || typeof element.className.match !== 'function') return false;
  return !!element.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断  
}

/**
 * addClass
 */
function _addClass(element, cName) {
  if (!element) return;
  if (typeof element.className === 'string') {
    if (!_hasClass(element, cName)) {
      if (stringUtils.isEmpty(element.className)) element.className += cName;else element.className += " " + cName;
    };
  }
}

/**
 * removeClass
 */
function _removeClass(element, cName) {
  if (!element) return;
  if (typeof element.className === 'string') {
    if (_hasClass(element, cName)) {
      element.className = element.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace方法是替换 
      // trim.
      element.className = stringUtils.trim(element.className);
    };
  }
}
/**
 * removeElement
 */
function _removeElement(element) {
  if (element) {
    var _parentElement = element.parentNode;
    if (_parentElement) {
      _parentElement.removeChild(element);
    }
  }
}

/**
 * appendChild
 */
function _appendChild(element, node) {
  if (element) {
    if (node instanceof Dom) {
      if (!node._isArray()) {
        element.appendChild(node[0]);
      } else {
        for (var i = 0; i < node.length; i++) {
          element.appendChild(node[i]);
        }
      }
    } else {
      element.appendChild(node);
    }
  }
}

function _prependChild(element, node) {
  if (!element) return;
  if (element.hasChildNodes()) {
    if (node instanceof Dom) {
      if (!node._isArray()) {
        element.insertBefore(node[0], element.firstChild);
      } else {
        for (var i = node.length - 1; i >= 0; i--) {
          element.insertBefore(node[i], element.firstChild);
        }
      }
    } else {
      element.insertBefore(node, element.firstChild);
    }
  } else {
    if (node instanceof Dom) {
      if (!node._isArray()) {
        element.appendChild(node[0]);
      } else {
        for (var i = 0; i < node.length; i++) {
          element.appendChild(node[i]);
        }
      }
    } else {
      element.appendChild(node);
    }
  }
}

function _isHtmlElement(obj) {
  var d = document.createElement("div");
  try {
    d.appendChild(obj.cloneNode(true));
    return obj.nodeType == 1 ? true : false;
  } catch (e) {
    return obj == window || obj == document;
  }
}

var CreateDom;

/**
 * @desc 类jquery dom操作.
 */

var Dom = function () {
  // _elem;
  // _isArr;

  /**
   * 支持 
   *    - .name 使用类名构建.
   *    - #name 使用id名构建.
   *    - name  使用tag名构建.
   *    - <div...>...</div> 使用内容构建.
   *    - node.
   */
  function Dom(name) {
    _classCallCheck(this, Dom);

    //
    // save in '_elem', '_isArr' 
    //
    if (name === window.document || name == window) {
      this._elem = name;
      this._isArr = false;
    } else if (name instanceof Dom) {
      this._elem = name._elem;
      this._isArr = name._isArr;
    } else {
      if (_isHtmlElement(name)) {
        this._elem = name;
        this._isArr = false;
      } else {
        this._elem = _getElement(name);
        this._isArr = this._elem._isarr;
        this._elem = this._elem._elem;
      }
    }

    if (!this._isArray()) {
      this[0] = this._elem;
      this.length = this._elem ? 1 : 0;
    } else {
      for (var i = 0; i < this._elem.length; i++) {
        this[i] = this._elem[i];
      }
      this.length = this._elem.length;
    }

    var _this = this;

    this.bind = this.on;
    this.unbind = this.off;
    this.live = this.on;
    this.die = this.off;

    if (name === window.document) {
      this.ready = function (f) {
        if (f) {
          if (window.addEventListener) window.document.addEventListener('DOMContentLoaded', f);else window.document.attachEvent('onload', f);
        } else {
          _this.trigger('ready');
        }
        return _this;
      };
      this.unload = function (f) {
        if (f) {
          if (window.addEventListener) window.document.addEventListener('unload', f);else window.document.attachEvent('onunload', f);
        } else {
          _this.trigger('unload');
        }
        return _this;
      };
      this.context = window.document;
    } else if (name === window) {
      this.unload = function (f) {
        if (f) {
          if (window.addEventListener) window.addEventListener('unload', f);else window.attachEvent('onunload', f);
        } else {
          _this.trigger('unload');
        }
        return _this;
      };
    } else {
      this.context = window.document;
    }

    if (typeof name === 'function') {
      var _foo = function _foo(e) {
        name.bind(_this)(e);
        if (window.addEventListener) window.document.removeEventListener('DOMContentLoaded', _foo);else window.document.detachEvent('onload', _foo);
      };

      if (window.addEventListener) window.document.addEventListener('DOMContentLoaded', _foo);else window.document.attachEvent('onload', _foo);
    } else {
      var ttt = function ttt(event, f) {
        if (f) {
          return _this.on(event, f);
        } else {
          return _this.trigger(event);
        }
      };

      this.blur = function (f) {
        return ttt('blur', f);
      };
      this.change = function (f) {
        return ttt('change', f);
      };
      this.click = function (f) {
        return ttt('click', f);
      };
      this.dblclick = function (f) {
        return ttt('dblclick', f);
      };
      this.error = function (f) {
        return ttt('error', f);
      };
      this.keydown = function (f) {
        return ttt('keydown', f);
      };
      this.keypress = function (f) {
        return ttt('keypress', f);
      };
      this.keyup = function (f) {
        return ttt('keyup', f);
      };
      this.load = function (f) {
        return ttt('load', f);
      };
      this.mousedown = function (f) {
        return ttt('mousedown', f);
      };
      this.mouseenter = function (f) {
        return ttt('mouseenter', f);
      };
      this.mouseleave = function (f) {
        return ttt('mouseleave', f);
      };
      this.mousemove = function (f) {
        return ttt('mousemove', f);
      };
      this.mouseout = function (f) {
        return ttt('mouseout', f);
      };
      this.mouseover = function (f) {
        return ttt('mouseover', f);
      };
      this.mouseup = function (f) {
        return ttt('mouseup', f);
      };
      this.scroll = function (f) {
        return ttt('scroll', f);
      };
      this.select = function (f) {
        return ttt('select', f);
      };
      this.submit = function (f) {
        return ttt('submit', f);
      };
    }

    if (this._elem) {
      if (this._isArray()) {
        for (var i = 0; i < this._elem.length; i++) {
          this._domtify(this._elem[i]);
        }
      } else {
        this._domtify(this._elem);
      }
    }

    // plugin.
    for (var key in CreateDom.fn) {
      if (key == 'extend' || key == 'fn') continue;
      if (typeof CreateDom.fn[key] === 'function') {
        this[key] = CreateDom.fn[key].bind(this);
      }
    }
    this.__domtify = true;
  }

  Dom.prototype.get = function get(index) {
    if (!this._elem) return null;else {
      if (this._isArray()) {
        return this._elem[index];
      } else {
        return index > 0 ? null : this._elem;
      }
    }
  };

  /**
   * @desc: hasClass
   */

  Dom.prototype.hasClass = function hasClass(cName) {
    if (!this._elem) {
      return false;
    }

    var _thisLength = this.length ? this.length : 1;

    for (var i = 0; i < _thisLength; i++) {
      if (_hasClass(this.get(i), cName)) return true;
    }
    return false;
  };

  /**
   * @desc: addClass
   */

  Dom.prototype.addClass = function addClass(cName) {
    if (!this._elem) {
      return this;
    }

    var _thisLength = this.length ? this.length : 1;

    for (var i = 0; i < _thisLength; i++) {
      _addClass(this.get(i), cName);
    }
    return this;
  };

  /**
   * @desc: removeClass
   */

  Dom.prototype.removeClass = function removeClass(cName) {
    if (!this._elem) {
      return this;
    }

    var _thisLength = this.length ? this.length : 1;

    for (var i = 0; i < _thisLength; i++) {
      _removeClass(this.get(i), cName);
    }
    return this;
  };

  /**
   * @desc: toggleClass
   */

  Dom.prototype.toggleClass = function toggleClass(cName) {
    if (!this._elem) {
      return this;
    }

    var _thisLength = this.length ? this.length : 1;

    for (var i = 0; i < _thisLength; i++) {
      if (_hasClass(this.get(i), cName)) _removeClass(this.get(i), cName);else _addClass(this.get(i), cName);
    }
    return this;
  };

  /**
   * @desc: remove
   */

  Dom.prototype.remove = function remove() {
    if (!this._elem) {
      return this;
    }

    var _thisLength = this.length ? this.length : 1;

    for (var i = 0; i < _thisLength; i++) {
      _removeElement(this.get(i));
    }
    return this;
  };

  /**
   * @desc: append
   */

  Dom.prototype.append = function append(node) {
    if (!this._elem) {
      return this;
    }
    var _dom = new Dom(node);
    _appendChild(this.get(0), _dom);

    return this;
  };

  /**
   * appendTo
   */

  Dom.prototype.appendTo = function appendTo(node) {
    if (!this._elem) {
      return this;
    }
    var dom = new Dom(node);
    dom.append(this);
    return this;
  };

  /**
   * @desc: prepend
   */

  Dom.prototype.prepend = function prepend(node) {
    if (!this._elem) {
      return this;
    }
    var _dom = new Dom(node);
    _prependChild(this.get(0), _dom);

    return this;
  };

  /**
   * @desc: prependTo
   */

  Dom.prototype.prependTo = function prependTo(node) {
    if (!this._elem) {
      return this;
    }
    var dom = new Dom(node);
    dom.prepend(this);
    return this;
  };

  /**
   * @desc: before
   */

  Dom.prototype.before = function before(node) {
    if (!this._elem) {
      return this;
    }

    var _dom = new Dom(node);

    var _thisLength = this.length ? this.length : 1;

    for (var i = 0; i < _thisLength; i++) {
      _dom.insertBefore(this.get(i));
    }

    return this;
  };

  /**
   * insertBefore
   */

  Dom.prototype.insertBefore = function insertBefore(node) {
    if (!this._elem) {
      return this;
    }
    var dom = new Dom(node);
    if (!dom._isArray()) {
      var elem = this._elem;
      if (!this._isArray()) elem = [elem];
      for (var i = 0; i < elem.length; i++) {
        dom[0].parentNode.insertBefore(elem[i], dom[0]);
      }
    }
    return this;
  };

  /**
   * @desc: after
   */

  Dom.prototype.after = function after(node) {
    if (!this._elem) {
      return this;
    }

    var _dom = new Dom(node);

    var _thisLength = this.length ? this.length : 1;

    for (var i = 0; i < _thisLength; i++) {
      _dom.insertAfter(this.get(i));
    }

    return this;
  };

  /**
   * @desc: insertAfter
   */

  Dom.prototype.insertAfter = function insertAfter(node) {
    if (!this._elem) {
      return this;
    }
    var dom = new Dom(node);
    if (!dom._isArray()) {
      var elem = this._elem;
      if (!this._isArray()) elem = [elem];
      for (var i = 0; i < elem.length; i++) {
        dom[0].parentNode.insertBefore(elem[i], dom[0].nextSibling);
      }
    }
    return this;
  };

  /**
   * @desc: attr.
   */

  Dom.prototype.attr = function attr(attrName, value) {
    if (!attrName) {
      throw new Error('need attrName');
    }

    if (!this._elem) {
      if (typeof value !== 'undefined') return this;
      return undefined;
    }
    if (typeof value === 'undefined') {
      if (!this.get(0).hasAttribute(attrName)) return undefined;

      return this.get(0).getAttribute(attrName);
    } else {

      var _thisLength = this.length ? this.length : 1;

      for (var i = 0; i < _thisLength; i++) {
        this.get(i).setAttribute(attrName, value);
      }
      return this;
    }
  };

  /**
   * @desc: removeAttr
   */

  Dom.prototype.removeAttr = function removeAttr(name) {
    if (!this._elem) {
      return this;
    }

    var _thisLength = this.length ? this.length : 1;

    for (var i = 0; i < _thisLength; i++) {
      this.get(i).removeAttribute(name);
    }
    return this;
  };

  /**
  * @desc: detach.
  */

  Dom.prototype.detach = function detach() {
    throw new Error('unimplement');
  };

  /**
  * @desc: clone.
  */

  Dom.prototype.clone = function clone() {
    throw new Error('unimplement');
  };

  /**
  * @desc: replaceAll.
  */

  Dom.prototype.replaceAll = function replaceAll() {
    throw new Error('unimplement');
  };

  /**
  * @desc: replaceWith.
  */

  Dom.prototype.unwrap = function unwrap() {
    throw new Error('unimplement');
  };
  /**
  * @desc: replaceWith.
  */

  Dom.prototype.wrap = function wrap() {
    throw new Error('unimplement');
  };
  /**
  * @desc: replaceWith.
  */

  Dom.prototype.wrapAll = function wrapAll() {
    throw new Error('unimplement');
  };
  /**
  * @desc: replaceWith.
  */

  Dom.prototype.wrapinner = function wrapinner() {
    throw new Error('unimplement');
  };

  /**
  * @desc: empty.
  */

  Dom.prototype.empty = function empty() {
    if (!this._elem) {
      return this;
    }

    var _thisLength = this.length ? this.length : 1;

    for (var i = 0; i < _thisLength; i++) {
      this.get(i).innerHTML = '';
    }
    return this;
  };

  /**
  * @desc: html.
  */

  Dom.prototype.html = function html(v) {
    if (!this._elem) {
      if (typeof v !== 'undefined') return this;
      return;
    }
    if (typeof v === 'undefined') {
      return this.get(0).innerHTML;
    } else {

      var _thisLength = this.length ? this.length : 1;

      for (var i = 0; i < _thisLength; i++) {
        this.get(i).innerHTML = v;
      }
      return this;
    }
  };

  /**
  * @desc: text.
  */

  Dom.prototype.text = function text(v) {
    if (!this._elem) {
      if (typeof v !== 'undefined') return this;
      return;
    }
    if (typeof v === 'undefined') {
      return this.get(0).textContent;
    } else {

      var _thisLength = this.length ? this.length : 1;

      for (var i = 0; i < _thisLength; i++) {
        this.get(i).textContent = v;
      }
      return this;
    }
  };

  /**
  * @desc: val.
  */

  Dom.prototype.val = function val(v) {
    if (!this._elem) {
      if (typeof v !== 'undefined') return this;
      return;
    }
    if (typeof v === 'undefined') {
      return this.get(0).value;
    } else {

      var _thisLength = this.length ? this.length : 1;

      for (var i = 0; i < _thisLength; i++) {
        this.get(i).value = v;
      }
      return this;
    }
  };

  /**
  * @desc: css.
  */

  Dom.prototype.css = function css(name, value) {
    if (!this._elem) {
      if (typeof value !== 'undefined') return this;
      return;
    }
    if (typeof value === 'undefined') {
      return this.get(0).style[name];
    } else {

      var _thisLength = this.length ? this.length : 0;

      for (var i = 0; i < _thisLength; i++) {
        if (value == '') this.get(i).style[name] = '';else this.get(i).style[name] = value;
      }
      return this;
    }
  };

  /**
  * @desc: on.
  */

  Dom.prototype.on = function on(eventname, foo) {
    if (!eventname) throw new Error('need event name');

    if (typeof foo !== 'function') throw new Error('on need function params');

    if (!this._elem) {
      return this;
    }

    var _thisLength = this.length ? this.length : 1;

    for (var i = 0; i < _thisLength; i++) {
      var ee = this.get(i);
      if (ee instanceof Dom || ee.__domtify) {
        ee = ee._elem;
        if (!ee) {
          continue;
        }
      }
      if (!ee.__events) ee.__events = {};
      if (!ee.__events[eventname]) ee.__events[eventname] = [];
      var env = ee.__events[eventname];
      var j;
      for (j = 0; j < env.length; j++) {
        if (env[j] === foo) {
          break;
        }
      }
      if (j >= env.length) {
        env.push(foo);
      }
      if ('on' + eventname in ee) {
        if (ee.addEventListener) ee.addEventListener(eventname, foo);else ee.attachEvent('on' + eventname, foo);
      }
    }
    return this;
  };

  /**
  * @desc: one.
  */

  Dom.prototype.one = function one(event, f) {
    if (!event || typeof event !== 'string') throw new Error('need event name');

    var _this = this;
    var tt = function tt(e) {
      _this.off(event, tt);f.bind(this)(e);
    };
    _this.on(event, tt);
    return this;
  };

  /**
  * @desc: off.
  */

  Dom.prototype.off = function off(eventname, foo) {
    if (!eventname) throw new Error('need event name');

    if (!this._elem) {
      return this;
    }
    if (!foo) {

      var _thisLength = this.length ? this.length : 1;

      for (var i = 0; i < _thisLength; i++) {
        var ee = this.get(i);
        if (ee instanceof Dom || ee.__domtify) {
          ee = ee._elem;
          if (!ee) {
            continue;
          }
        }
        if (ee.__events && ee.__events[eventname]) {
          var env = ee.__events[eventname];
          var j;
          if ('on' + eventname in ee) {
            for (j = 0; j < env.length; j++) {
              if (ee.removeEventListener) ee.removeEventListener(eventname, env[j]);else ee.detachEvent('on' + eventname, env[j]);
            }
          }
          ee.__events[eventname] = [];
        }
      }
      return this;
    }

    if (typeof foo !== 'function') throw new Error('off need function params');

    var _thisLength = this.length ? this.length : 1;

    for (var i = 0; i < _thisLength; i++) {
      var ee = this.get(i);
      if (ee instanceof Dom) {
        ee = ee._elem;
      }
      if (ee.__events && ee.__events[eventname]) {
        var env = ee.__events[eventname];
        var j;
        for (j = 0; j < env.length; j++) {
          if (env[j] === foo) {
            env.splice(j, 1);
            break;
          }
        }
      }
      if ('on' + eventname in ee) {
        if (ee.removeEventListener) ee.removeEventListener(eventname, foo);else ee.detachEvent('on' + eventname, foo);
      }
    }

    return this;
  };

  /**
  * @desc: trigger.
  */

  Dom.prototype.trigger = function trigger(eventname, extraParameters) {
    if (!eventname) throw new Error('need event name');

    if (!this._elem) {
      return this;
    }

    var _thisLength = this.length ? this.length : 1;

    for (var i = 0; i < _thisLength; i++) {
      var ee = this.get(i);
      if (ee instanceof Dom) {
        ee = ee._elem;
      }

      // fire.
      if (ee) {
        if ('on' + eventname in ee) {
          if (!window.document.addEventListener) {
            ee.fireEvent('on' + eventname);
          } else {
            var env = window.document.createEvent('HTMLEvents');
            env.initEvent(eventname, true, true);
            ee.dispatchEvent(env);
          }
        } else {
          if (ee.__events && ee.__events[eventname]) {
            var env = ee.__events[eventname];
            var j;

            var enve;
            // if (!window.document.addEventListener) {
            enve = {
              bubbles: false,
              cancelable: false,
              cancelBubble: false,
              defaultPrevented: false,
              // currentTarget: ee,
              // target: ee,
              type: eventname
            };
            // }
            // else {
            //   enve = window.document.createEvent('HTMLEvents');
            //   enve.initEvent(eventname, false, false);
            // }

            enve.currentTarget = ee;
            enve.target = ee;

            for (j = 0; j < env.length; j++) {
              env[j](enve, extraParameters);
            }
          } // if.
        }
      } // if.
    }
    return this;
  };

  /**
  * @desc: parent
  * @return: 
  */

  Dom.prototype.parent = function parent(selector) {
    if (!this._elem) {
      return new Dom();
    }
    var sel;
    if (selector) sel = new Dom(selector);
    if (this._isArray()) {
      var dom = new Dom();
      dom._elem = [];
      dom._isArr = true;
      dom.length = 0;

      var _thisLength = this.length ? this.length : 1;

      for (var i = 0; i < _thisLength; i++) {
        if (this.get(i).parentNode) {
          if (!sel || sel._isElementIn(this.get(i).parentNode)) {
            this._domtify(this.get(i).parentNode);
            dom._elem.push(this.get(i).parentNode);
            dom[dom.length] = this.get(i).parentNode;
            dom.length++;
          }
        }
      }
      if (dom._elem.length == 0) dom._elem = null;
      return dom;
    } else {
      if (!this._elem.parentNode) return new Dom();
      if (!sel || sel._isElementIn(this._elem.parentNode)) {
        return new Dom(this._elem.parentNode);
      }
      return new Dom();
    } // if.
  };

  /**
  * @desc: parents
  * @return: 
  */

  Dom.prototype.parents = function parents(selector) {
    if (!this._elem) {
      return new Dom();
    }
    var sel;
    if (selector) sel = new Dom(selector);

    var nodes = [];

    var _thisLength = this.length ? this.length : 1;

    for (var i = 0; i < _thisLength; i++) {
      if (!this.get(i).parentNode) continue;
      var elem = this.get(i);
      while (elem.parentNode) {
        if (elem.parentNode == window || elem.parentNode == window.document) break;

        if (!sel || sel._isElementIn(elem.parentNode)) {
          var j;
          for (j = 0; j < nodes.length; j++) {
            if (typeof nodes[j].isSameNode === 'function') {
              if (nodes[j].isSameNode(elem.parentNode)) {
                break;
              }
            } else {
              if (nodes[j] === elem.parentNode) {
                break;
              }
            }
          }
          if (j >= nodes.length) nodes.push(elem.parentNode);
        }
        elem = elem.parentNode;
      }
    } // for.

    var dom = new Dom();
    if (nodes.length > 0) {
      dom._elem = nodes;
      dom._isArr = true;
      dom.length = nodes.length;
      for (var i = 0; i < nodes.length; i++) {
        dom._domtify(nodes[i]);
        dom[i] = nodes[i];
      }
    }
    return dom;
  };

  /**
   * children
   * @param {*} selector 
   */

  Dom.prototype.children = function children(selector) {
    if (!this._elem) {
      return new Dom();
    }

    var nodes = [];

    var _thisLength = this.length ? this.length : 1;

    for (var i = 0; i < _thisLength; i++) {
      var sel;
      if (selector) sel = _getElement(selector, this.get(i));else {
        sel = { _elem: [], _isarr: true };
        for (var j = 0; j < this.get(i).childNodes.length; j++) {
          sel._elem.push(this.get(i).childNodes[j]);
        }
      }

      if (!sel._elem) continue;

      if (sel._isarr) {
        nodes = nodes.concat(sel._elem);
      } else {
        nodes.push(sel._elem);
      }
    }

    var dom = new Dom();
    dom._elem = nodes;
    dom._isArr = true;
    dom.length = nodes.length;
    for (var i = 0; i < nodes.length; i++) {
      this._domtify(nodes[i]);
      dom[i] = nodes[i];
    }
    return dom;
  };

  /**
   * next
   * @param {*} selector 
   */

  Dom.prototype.next = function next(selector) {
    if (!this._elem) {
      return new Dom();
    }

    var dom;
    if (selector) {
      dom = this.parent();
      dom = dom.children(selector);
    }

    if (this._isArray()) {
      var nodes = [];

      var _thisLength = this.length ? this.length : 1;

      for (var i = 0; i < _thisLength; i++) {
        if (!dom || dom._isElementIn(this.get(i).nextSibling)) {
          if (this.get(i).nextSibling) nodes.push(this.get(i).nextSibling);
        }
      }

      var dom1 = new Dom();
      dom1._elem = nodes;
      dom1._isArr = true;
      dom1.length = nodes.length;
      for (var i = 0; i < nodes.length; i++) {
        this._domtify(nodes[i]);
        dom1[i] = nodes[i];
      }
      return dom1;
    } else {
      var nodes;
      if (!dom || dom._isElementIn(this._elem.nextSibling)) {
        if (this._elem.nextSibling) nodes = this._elem.nextSibling;
      }

      var dom1 = new Dom();
      dom1._elem = nodes;
      dom1[0] = nodes;
      dom1._isArr = false;
      dom1.length = nodes ? 1 : 0;
      return dom1;
    } // if..else
  };

  /**
   * prev
   * @param {*} selector 
   */

  Dom.prototype.prev = function prev(selector) {
    if (!this._elem) {
      return new Dom();
    }

    var dom;
    if (selector) {
      dom = this.parent();
      dom = dom.children(selector);
    }

    if (this._isArray()) {
      var nodes = [];

      var _thisLength = this.length ? this.length : 1;

      for (var i = 0; i < _thisLength; i++) {
        if (!dom || dom._isElementIn(this.get(i).previousSibling)) {
          if (this.get(i).previousSibling) nodes.push(this.get(i).previousSibling);
        }
      }

      var dom1 = new Dom();
      dom1._elem = nodes;
      dom1._isArr = true;
      dom1.length = nodes.length;
      for (var i = 0; i < nodes.length; i++) {
        this._domtify(nodes[i]);
        dom1[i] = nodes[i];
      }
      return dom1;
    } else {
      var nodes;
      if (!dom || dom._isElementIn(this._elem.previousSibling)) {
        if (this._elem.previousSibling) nodes = this._elem.previousSibling;
      }

      var dom1 = new Dom();
      dom1._elem = nodes;
      dom1[0] = nodes;
      dom1._isArr = false;
      dom1.length = nodes ? 1 : 0;
      return dom1;
    } // if..else
  };

  /**
  * @desc: 遍历
  */

  Dom.prototype.each = function each(cb) {
    if (cb) {
      for (var i = 0; i < this.length; i++) {
        cb(i, this.get(i));
      }
    }
  };

  // 将普通节点设置为Dom对象.


  Dom.prototype._domtify = function _domtify(node) {
    if (node instanceof Dom) return;
    if (node.__domtify) return;

    var _proto = Object.getPrototypeOf(this);
    for (var key in _proto) {
      if (key != '__proto__' && key != 'constructor') {
        // 不覆盖native方法.
        if (!node[key]) {
          node[key] = _proto[key].bind(node);
        }
      }
    }

    // // plugin.
    for (var key in CreateDom.fn) {
      if (key == 'extend' || key == 'fn') continue;

      if (typeof CreateDom.fn[key] === 'function') {
        if (!node[key]) {
          node[key] = CreateDom.fn[key].bind(node);
        }
      }
    }

    // delete node.length;
    node._isArr = false;
    node._elem = node;
    // node[0] = node;
    node.__domtify = true;
  };

  // 当前是否是数组.


  Dom.prototype._isArray = function _isArray() {
    return this._isArr;
  };

  // 指定节点是否存在于本对象中.


  Dom.prototype._isElementIn = function _isElementIn(node) {
    if (!this._elem) return false;

    var _thisLength = this.length ? this.length : 1;

    for (var i = 0; i < _thisLength; i++) {
      if (typeof this.get(i).isSameNode === 'function') {
        if (this.get(i).isSameNode(node)) return true;
      } else {
        if (this.get(i) === node) return true;
      }
    }

    return false;
  };

  return Dom;
}();

;

CreateDom = function CreateDom(n) {
  return new Dom(n);
};
// plugin.
CreateDom.fn = {};
CreateDom.extend = function (plugin) {
  if (arguments.length == 0) return {};

  if (arguments.length == 1) {
    for (var key in arguments[0]) {
      if (key == 'extend' || key == 'fn') continue;
      if (typeof arguments[0][key] === 'function') {
        CreateDom[key] = arguments[0][key];
      }
    }
    return this;
  } else {
    if (arguments[0] === false) throw new Error('can\'t be false');

    var o = {};
    var i = 0;
    if (arguments[0] === true) i = 1;
    for (; i < arguments.length; i++) {
      o = utils.mergeMap(o, arguments[i]);
    }
    return o;
  } // if..else.
};

/**
* @desc: viewport.
* @return: {width, height}
*/
Dom.getViewPort = function () {
  if (window.document.compatMode == "BackCompat") {
    //浏览器嗅探，混杂模式
    return {
      width: window.document.body.clientWidth,
      height: window.document.body.clientHeight
    };
  } else {
    return {
      width: window.document.documentElement.clientWidth,
      height: window.document.documentElement.clientHeight
    };
  }
};

/**
* @desc: documentport.
* @return: {width, height}
*/
Dom.getDocumentPort = function () {
  if (window.document.compatMode == "BackCompat") {
    return {
      width: window.document.body.scrollWidth,
      height: window.document.body.scrollHeight
    };
  } else {
    return {
      width: Math.max(window.document.documentElement.scrollWidth, window.document.documentElement.clientWidth),
      height: Math.max(window.document.documentElement.scrollHeight, window.document.documentElement.clientHeight)
    };
  }
};

/**
* @desc: document offset.
* @return: {top, left}
*/
Dom.getDocumentOffset = function () {
  var elementScrollLeft;
  var elementScrollTop;

  if (window.document.compatMode == "BackCompat") {
    elementScrollLeft = window.document.body.scrollLeft;
    elementScrollTop = window.document.body.scrollTop;
  } else {
    // CSS1Compat
    elementScrollLeft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
    elementScrollTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
  }

  return {
    top: elementScrollTop,
    left: elementScrollLeft
  };
};

/**
* @desc: 获取指定元素相对于视口的的offset
* @return: 
*/
Dom.getElementOffset = function (e) {
  if (!e) {
    return {};
  }

  var ee = CreateDom(e);
  ee = ee[0];
  if (ee) {
    if (typeof ee.getBoundingClientRect === 'function') {
      var rect = ee.getBoundingClientRect();
      return {
        left: rect.left,
        top: rect.top
      };
    } else {
      var actualLeft = ee.offsetLeft;
      var actualTop = ee.offsetTop;
      var current = ee.offsetParent;

      while (current) {
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }

      var elementScrollLeft;
      var elementScrollTop;

      if (window.document.compatMode == "BackCompat") {
        elementScrollLeft = window.document.body.scrollLeft;
        elementScrollTop = window.document.body.scrollTop;
      } else {
        elementScrollLeft = window.document.documentElement.scrollLeft == 0 ? window.document.body.scrollLeft : window.document.documentElement.scrollLeft;
        elementScrollTop = window.document.documentElement.scrollTop == 0 ? window.document.body.scrollTop : window.document.documentElement.scrollTop;
      }

      return {
        left: actualLeft - elementScrollLeft,
        top: actualTop - elementScrollTop
      };
    } // if..else.
  }

  return {};
};

/**
* @desc: 判断是否是dom对象.
* @return: boolean.
*/
Dom.isDom = function (e) {
  return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? e instanceof HTMLElement : e && (typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object' && e.nodeType === 1 && typeof e.nodeName === 'string';
};

/**
* @desc: 统一处理 removeEventListener, detachEvent; 并提供useCapture参数问题.
*/
Dom.removeEventListener = function (dom, eventName, foo, useCapture) {
  if (!dom) return;
  if (dom.addEventListener) {
    dom.removeEventListener(eventName, foo, useCapture);
  } else {
    dom.detachEvent('on' + eventName, foo);
  }
};

/**
* @desc: 统一处理 addEventListener, attachEvent; 并提供useCapture参数问题.
*/
Dom.addEventListener = function (dom, eventName, foo, useCapture) {
  if (!dom) return;
  if (dom.addEventListener) {
    dom.addEventListener(eventName, foo, useCapture);
  } else {
    dom.attachEvent('on' + eventName, foo);
  }
};

exports.Dom = Dom;
exports.CreateDom = CreateDom;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var febsUtils = __webpack_require__(0);
var netajax = __webpack_require__(15);
var netfetch = __webpack_require__(16);
var netjsonp = __webpack_require__(17);

'use strict';

var net = {
  ajax: netajax.ajax,
  fetch: netfetch.fetch,
  jsonp: netjsonp.jsonp
};

module.exports = net;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

(function () {
  if (typeof Promise.prototype.finally === 'function') {
    return
  }
  Promise.prototype.finally = function (fn) {
    return this
      .then(value => this.constructor.resolve(fn()).then(() => value))
      ['catch'](reason => this.constructor.resolve(fn()).then(() => { throw reason }))
  }
})()


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


// require('es5-shim');
// require('es5-shim/es5-sham');
__webpack_require__(5);
__webpack_require__(11);
// require('babel-polyfill');
// require('../third-party/bluebird.min.js');
// require('../third-party/bignumber.min.js');

( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "febs requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {


//
// define the __debug.
if (!window['__debug']) {
  window.__debug = false;
}

//
// define the animationFrame.
var animationFrame  = __webpack_require__(6);
if (!window['requestAnimationFrame'])
  window.requestAnimationFrame = animationFrame.requestAnimationFrame;
if (!window['cancelAnimationFrame'])
  window.cancelAnimationFrame = animationFrame.cancelAnimationFrame;


var febs = {};

febs.date = __webpack_require__(8);
febs.string = __webpack_require__(1);
febs.crypt  = __webpack_require__(7);
febs.utils  = __webpack_require__(0);
febs.net  = __webpack_require__(10);
febs.dom  = __webpack_require__(9);
febs['$'] = febs.dom.CreateDom;
febs.dom = febs.dom.Dom;

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
// }

return febs;
}
);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var utilsString = __webpack_require__(3);

var crc32_table = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3, 0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7, 0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F, 0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D, 0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433, 0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D];
exports.crc32_table = crc32_table;

/**
* @desc: base64编码.
* @param arrByte: 字节数组.
* @return: string.
*/
exports.base64_encode = function (arrByte) {

  if (!arrByte) {
    return '';
  }

  if (typeof arrByte === 'string') {
    arrByte = utilsString.utf8ToBytes(arrByte);
  }

  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var out, i, len;
  var c1, c2, c3;
  len = arrByte.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = arrByte[i++] & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = arrByte[i++];
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = arrByte[i++];
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
    out += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var PromiseLib = Promise;
var utilsDate = __webpack_require__(2);

/**
 * @desc: 模拟sleep.
 * @return: Promise.
 *     在ms时间后执行.
 * @e.g.
 *     febs.utils.sleep(1000).then(()=>{
          //1000ms之后resolve.
       });
 */
exports.sleep = function (ms) {
  return new PromiseLib(function (resolve, reject) {
    try {
      setTimeout(function () {
        resolve();
      }, ms);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @desc: the browser is mobile.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsMobile = function (userAgent) {

  if (!userAgent) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined) {
      userAgent = window.navigator.userAgent;
    }
  }

  var agent = userAgent;
  var platforms = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'Blackberry', 'Windows Phone'];
  var expression = new RegExp(platforms.join('|'), 'i');

  return agent.match(expression) != null;
};

/**
 * @desc: the browser is ios.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsIOS = function (userAgent) {
  if (!userAgent) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined) {
      userAgent = window.navigator.userAgent;
    }
  }

  var agent = userAgent;
  var platforms = ['iPhone', 'iPad', 'iPod'];
  var expression = new RegExp(platforms.join('|'), 'i');

  return agent.match(expression) != null;
};

/**
 * @desc: the browser is phone.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsPhone = function (userAgent) {
  if (!userAgent) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined) {
      userAgent = window.navigator.userAgent;
    }
  }

  var agent = userAgent;
  var platforms = ['Android', 'iPhone', 'iPod', 'Blackberry', 'Windows Phone'];
  var expression = new RegExp(platforms.join('|'), 'i');

  return agent.match(expression) != null;
};

/**
 * @desc: the browser is weixin.
 */
exports.browserIsWeixin = function (userAgent) {
  if (!userAgent) {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined) {
      userAgent = window.navigator.userAgent;
    }
  }

  var agent = userAgent;
  if (agent.match(/MicroMessenger/i) == "MicroMessenger") {
    return true;
  } else {
    return false;
  }
};

/**
 * @desc: 合并多个map.
 * @return: {}
 */
exports.mergeMap = function () {
  var map0 = {};
  var map2;
  for (var i = 0; i < arguments.length; i++) {
    map2 = arguments[i];
    if (map2) {
      for (var k in map2) {
        map0[k] = map2[k];
      }
    }
  }

  return map0;
};

/**
* @desc: 判断参数是否是null,undefined,NaN
* @return: boolean
*/
exports.isNull = function (e) {
  return e === null || e === undefined || Number.isNaN(e);
};

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
    var args = Array.prototype.slice.call(arguments, 0, argumentCount > 0 ? argumentCount : 0);
    return new PromiseLib(function (resolve, reject) {
      args.push(function (err, res) {
        if (err) reject(err);else resolve(res);
      });
      var res = fn.apply(self, args);
      if (res && ((typeof res === 'undefined' ? 'undefined' : _typeof(res)) === 'object' || typeof res === 'function') && typeof res.then === 'function') {
        resolve(res);
      }
    });
  };
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var febsUtils = __webpack_require__(0);

'use strict';

var transfer = __webpack_require__(4);

// var Ajaxmark = Symbol('ajaxmark');
var Ajaxmark = '_FeBs_ajaxmark';

var net = {};

//--------------------------------------------------------
// ajax
//--------------------------------------------------------

/**
 * @desc: ajax 跳转. 允许添加 progress: function(percent) 选项.
 * @return:
 */
function ajax(ctx) {
  //if (!!window.ActiveXObject || "ActiveXObject" in window) // ie11.
  {
    if (ctx.url) {
      if (!window[Ajaxmark]) window[Ajaxmark] = 1;
      var i = ctx.url.indexOf('?');
      if (i < 0) {
        ctx.url += "?ajaxmark=" + window[Ajaxmark];
      } else {
        if (i == ctx.url.length - 1) {
          ctx.url += "ajaxmark=" + window[Ajaxmark];
        } else {
          ctx.url += "&ajaxmark=" + window[Ajaxmark];
        }
      }
    }
    window[Ajaxmark]++;
  } // if.

  var cbError = ctx.error || function () {};
  var cbSuccess = ctx.success || function () {};
  var cbComplete = ctx.complete || function () {};

  ctx.processData = ctx.hasOwnProperty('processData') ? ctx.processData : true;

  //
  // net transfer.
  var xhr = transfer.transfer(window);

  // xhr.onload = function() {
  //   var status = (xhr.status === 1223) ? 204 : xhr.status
  //   if (status < 100 || status > 599) {
  //     reject(new TypeError('Network request failed'))
  //     return
  //   }
  //   var options = {
  //     status: status,
  //     statusText: xhr.statusText,
  //     headers: febsnet.headers(xhr),
  //     url: responseURL()
  //   }
  //   var body = 'response' in xhr ? xhr.response : xhr.responseText;
  //   resolve(new febsnet.Response(body, options))
  // }

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status === 1223 ? 204 : xhr.status;
      if (status < 100 || status > 599) {
        cbError(xhr, xhr.statusText, new TypeError('Network request failed'));
        cbError = null;
        return;
      }

      var body = 'response' in xhr ? xhr.response : xhr.responseText;
      if (status == 200) cbSuccess(body, xhr.statusText, xhr);

      cbComplete(xhr, xhr.statusText);
    }
  };

  xhr.ontimeout = function () {
    if (cbError) cbError(xhr, null, 'timeout');
  };
  xhr.onerror = function () {
    if (cbError) cbError(xhr, null, new TypeError('Network request failed'));
  };

  if (ctx.progress) {
    if ('upload' in xhr && 'onprogress' in xhr.upload) {
      xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
          ctx.progress(event.loaded / event.total);
        }
      };
    } else {
      console.log('The browser not support progress event');
    }
  }

  xhr.open(ctx.type, ctx.url, ctx.async === false ? false : true);
  var timeout = (ctx.async === false ? false : true) ? ctx.timeout : 0;
  xhr.timeout = timeout !== undefined && timeout !== null ? timeout : transfer.DefaultTimeout;

  if (ctx.hasOwnProperty('withCredentials')) {
    xhr.withCredentials = ctx.withCredentials;
  } else {
    xhr.withCredentials = true;
  }

  if (ctx.headers) {
    if (xhr.setRequestHeader) {
      for (var key in ctx.headers) {
        var element = ctx.headers[key];

        if (key == 'Content-Type' && element === false) {
          continue;
        }
        xhr.setRequestHeader(key, element);
      }
    } else {
      console.log('ajax can\'t set headers');
    }
  }

  if (!ctx.headers || !ctx.headers.hasOwnProperty('Content-Type')) {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  }

  // auto content-type.
  var data_content = ctx.data;
  if (data_content) {
    if (ctx.processData && typeof data_content !== 'string') {
      try {

        if (ctx.headers && ctx.headers['Content-Type'] && ctx.headers['Content-Type'].toLowerCase().indexOf('json') >= 0) {
          data_content = JSON.stringify(data_content);
        } else {
          var data_tt = '';
          for (var key in data_content) {
            var element = data_content[key];
            if (data_tt.length > 0) data_tt += '&';
            data_tt += key + '=' + (element ? element.toString() : '');
          }
          data_content = data_tt;
        }
      } catch (e) {
        console.log('ajax stringify data error');
        console.log(e);
      }
    }
  }

  if (ctx.beforeSend) {
    ctx.beforeSend(xhr);
  }

  xhr.send(data_content);

  return {
    abort: function abort() {
      xhr.abort();
    }
  };
}

net.ajax = ajax;

module.exports = net;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var febsUtils = __webpack_require__(0);

'use strict';

var transfer = __webpack_require__(4);

var febsnet = {};
var net = {};

//--------------------------------------------------------
// fetch.
//--------------------------------------------------------
if (false) {
  //febsnet.fetch=window.fetch;
} else {
  if (!Promise) {
    throw new Error('unsupported Promise');
  }

  // https://github.com/github/fetch
  febsnet.normalizeName = function (name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  };

  febsnet.normalizeValue = function (value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  };

  febsnet.Headers = function (headers) {
    this.map = {};

    if (headers instanceof febsnet.Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  };

  febsnet.Headers.prototype.append = function (name, value) {
    name = febsnet.normalizeName(name);
    value = febsnet.normalizeValue(value);
    var list = this.map[name];
    if (!list) {
      list = [];
      this.map[name] = list;
    }
    list.push(value);
  };

  febsnet.Headers.prototype['delete'] = function (name) {
    delete this.map[febsnet.normalizeName(name)];
  };

  febsnet.Headers.prototype.get = function (name) {
    var values = this.map[febsnet.normalizeName(name)];
    return values ? values[0] : null;
  };

  febsnet.Headers.prototype.getAll = function (name) {
    return this.map[febsnet.normalizeName(name)] || [];
  };

  febsnet.Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(febsnet.normalizeName(name));
  };

  febsnet.Headers.prototype.set = function (name, value) {
    this.map[febsnet.normalizeName(name)] = [febsnet.normalizeValue(value)];
  };

  febsnet.Headers.prototype.forEach = function (callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function (name) {
      this.map[name].forEach(function (value) {
        callback.call(thisArg, value, name, this);
      }, this);
    }, this);
  };

  febsnet.consumed = function (body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  };

  febsnet.fileReaderReady = function (reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  };

  febsnet.readBlobAsArrayBuffer = function (blob) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    return febsnet.fileReaderReady(reader);
  };

  febsnet.readBlobAsText = function (blob) {
    var reader = new FileReader();
    reader.readAsText(blob);
    return febsnet.fileReaderReady(reader);
  };

  febsnet.support = {
    blob: 'FileReader' in window.self && 'Blob' in window.self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in window.self,
    arrayBuffer: 'ArrayBuffer' in window.self
  };

  febsnet.Body = function () {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;
      if (typeof body === 'string') {
        this._bodyText = body;
      } else if (febsnet.support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (febsnet.support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (!body) {
        this._bodyText = '';
      } else if (febsnet.support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only febsnet.support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type');
      }
    };

    if (febsnet.support.blob) {
      this.blob = function () {
        var rejected = febsnet.consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        return this.blob().then(febsnet.readBlobAsArrayBuffer);
      };

      this.text = function () {
        var rejected = febsnet.consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return febsnet.readBlobAsText(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text');
        } else {
          return Promise.resolve(this._bodyText);
        }
      };
    } else {
      this.text = function () {
        var rejected = febsnet.consumed(this);
        return rejected ? rejected : Promise.resolve(this._bodyText);
      };
    }

    if (febsnet.support.formData) {
      this.formData = function () {
        return this.text().then(febsnet.decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  };

  // HTTP methods whose capitalization should be normalized
  febsnet.normalizeMethod = function (method) {
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  };

  febsnet.Request = function (input, options) {
    options = options || {};
    var body = options.body;
    if (febsnet.Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new febsnet.Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = input;
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new febsnet.Headers(options.headers);
    }
    this.method = febsnet.normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    // if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    //   throw new TypeError('febsnet.Body not allowed for GET or HEAD requests')
    // }

    this._initBody(body);
  };

  febsnet.Request.prototype.clone = function () {
    return new febsnet.Request(this);
  };

  febsnet.decode = function (body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  };

  febsnet.headers = function (xhr) {
    var head = new febsnet.Headers();
    var pairs = xhr.getAllResponseHeaders().trim().split('\n');
    pairs.forEach(function (header) {
      var split = header.trim().split(':');
      var key = split.shift().trim();
      var value = split.join(':').trim();
      head.append(key, value);
    });
    return head;
  };

  febsnet.Body.call(febsnet.Request.prototype);

  febsnet.Response = function (bodyInit, options) {
    if (!options) {
      options = {};
    }

    this._initBody(bodyInit);
    this.type = 'default';
    this.status = options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText;
    this.headers = options.headers instanceof febsnet.Headers ? options.headers : new febsnet.Headers(options.headers);
    this.url = options.url || '';
  };

  febsnet.Body.call(febsnet.Response.prototype);

  febsnet.Response.prototype.clone = function () {
    return new febsnet.Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new febsnet.Headers(this.headers),
      url: this.url
    });
  };

  febsnet.Response.error = function () {
    var response = new febsnet.Response(null, { status: 0, statusText: '' });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  febsnet.Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new febsnet.Response(null, { status: status, headers: { location: url } });
  };

  window.Headers = febsnet.Headers;
  window.Request = febsnet.Request;
  window.Response = febsnet.Response;

  window.fetch = febsnet.fetch = function (input, init) {

    // other.
    return new Promise(function (resolve, reject) {
      var request;
      if (febsnet.Request.prototype.isPrototypeOf(input) && !init) {
        request = input;
      } else {
        request = new febsnet.Request(input, init);
      }

      var xhr = transfer.transfer(window);

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL;
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL');
        }

        return;
      }

      // xhr.onload = function() {
      //   var status = (xhr.status === 1223) ? 204 : xhr.status
      //   if (status < 100 || status > 599) {
      //     reject(new TypeError('Network request failed'))
      //     return
      //   }
      //   var options = {
      //     status: status,
      //     statusText: xhr.statusText,
      //     headers: febsnet.headers(xhr),
      //     url: responseURL()
      //   }
      //   var body = 'response' in xhr ? xhr.response : xhr.responseText;
      //   resolve(new febsnet.Response(body, options))
      // }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          var status = xhr.status === 1223 ? 204 : xhr.status;
          if (status < 100 || status > 599) {
            reject(new TypeError('Network request failed'));
            return;
          }
          var options = {
            status: status,
            statusText: xhr.statusText,
            headers: febsnet.headers(xhr),
            url: responseURL()
          };
          var body = 'response' in xhr ? xhr.response : xhr.responseText;
          resolve(new febsnet.Response(body, options));
        }
      };

      xhr.ontimeout = function () {
        reject('timeout');
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      if (init.progress) {
        xhr.onprogress = function (event) {
          if (event.lengthComputable) {
            init.progress(event.position / event.totalSize);
          }
        };
      }

      xhr.open(request.method, request.url, true);
      var timeout = init ? init.timeout : null;
      xhr.timeout = timeout !== undefined && timeout !== null ? timeout : transfer.DefaultTimeout;

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && febsnet.support.blob) {
        xhr.responseType = 'blob';
      }

      if (xhr.setRequestHeader) {
        request.headers.forEach(function (value, name) {
          xhr.setRequestHeader(name, value);
        });
      } else if (request.headers && request.headers.map.length > 0) {
        console.log('fetch can\'t set headers');
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };

  febsnet.fetch.polyfill = true;

  net.fetch = febsnet.fetch;
} // if..else.

module.exports = net;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var febsUtils = __webpack_require__(0);

'use strict';

var DefaultTimeout = 5000;
var febsnet = {};
var net = {};

//--------------------------------------------------------
// jsonp
//--------------------------------------------------------

// From https://github.com/camsong/fetch-jsonp
febsnet.jsonp_defaultOptions = {
  timeout: DefaultTimeout,
  jsonpCallback: 'callback'
};

febsnet.jsonp_generateCallbackFunction = function () {
  return 'jsonp_' + Date.now().toString() + '_' + Math.ceil(Math.random() * 100000);
};

// Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined' error if request timeout
febsnet.jsonp_clearFunction = function (functionName) {
  // IE8 throws an exception when you try to delete a property on window
  // http://stackoverflow.com/a/1824228/751089
  try {
    delete window[functionName];
  } catch (e) {}
};

febsnet.jsonp_removeScript = function (scriptId) {
  var script = document.getElementById(scriptId);
  document.getElementsByTagName("head")[0].removeChild(script);
};

febsnet.jsonp = function (url, options) {
  options = options || {};
  var timeout = options.timeout != null ? options.timeout : febsnet.jsonp_defaultOptions.timeout;
  var jsonpCallback = !!options.jsonpCallback ? options.jsonpCallback : febsnet.jsonp_defaultOptions.jsonpCallback;

  var timeoutId;

  return new Promise(function (resolve, reject) {
    var callbackFunction = febsnet.jsonp_generateCallbackFunction();

    window[callbackFunction] = function (response) {
      resolve({
        ok: true,
        // keep consistent with fetch API
        json: function json() {
          return Promise.resolve(response);
        }
      });

      if (timeoutId) clearTimeout(timeoutId);

      febsnet.jsonp_removeScript(jsonpCallback + '_' + callbackFunction);

      febsnet.jsonp_clearFunction(callbackFunction);
    };

    // Check if the user set their own params, and if not add a ? to start a list of params
    url += url.indexOf('?') === -1 ? '?' : '&';

    var jsonpScript = document.createElement('script');
    jsonpScript.setAttribute("src", url + jsonpCallback + '=' + callbackFunction);
    jsonpScript.id = jsonpCallback + '_' + callbackFunction;
    document.getElementsByTagName("head")[0].appendChild(jsonpScript);

    timeoutId = setTimeout(function () {
      reject('timeout');

      febsnet.jsonp_clearFunction(callbackFunction);
      febsnet.jsonp_removeScript(jsonpCallback + '_' + callbackFunction);
    }, timeout);
  });
};

net.jsonp = febsnet.jsonp;

module.exports = net;

/***/ })
/******/ ]);
//# sourceMappingURL=febs.base.js.map