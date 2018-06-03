'use strict';

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var PromiseLib   = Promise;

/**
* @desc: 判断是否是有效时间.
*/
exports.isValidate = function (date/*:Date*/)/*:boolean*/ {
  if (!date || date.toString() == 'Invalid Date')
    return false;
  return date instanceof Date;
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
exports.getUTCTimeString = function(time, fmt, weekFmt)
{
  if (typeof time !== "number")
    return "";

  fmt = fmt || 'HH:mm:ss';

  var t = new Date(time);
    var o = {         
    "M+" : t.getUTCMonth()+1, //月份         
    "d+" : t.getUTCDate(), //日         
    "h+" : t.getUTCHours()%12 == 0 ? 12 : t.getUTCHours()%12, //小时         
    "H+" : t.getUTCHours(), //小时         
    "m+" : t.getUTCMinutes(), //分         
    "s+" : t.getUTCSeconds(), //秒         
    "q+" : Math.floor((t.getUTCMonth()+3)/3), //季度         
    "S" : t.getUTCMilliseconds() //毫秒         
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
        fmt=fmt.replace(RegExp.$1, (t.getUTCFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, week[t.getUTCDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;
}

/**
 * @desc: 通过世界时间获取date. getDateFromUTC('2012-05-09')
 * @param strDateUTC: 世界日期字符串. '2012-05-09' 
 * @return: Date.
 */
exports.getDateFromUTC = function(strDateUTC) {
  var date = new Date();
  date.setUTCFullYear(
    parseInt(strDateUTC.substr(0, 4)), 
    parseInt(strDateUTC.substr(5, 2), 10)-1,
    parseInt(strDateUTC.substr(8, 2)));
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

/**
 * @desc: 通过世界时间获取date. getDate2FromUTC('20120509')
 * @param strDateUTC: 世界日期字符串. '20120509' 
 * @return: Date.
 */
exports.getDate2FromUTC = function(strDateUTC) {
  var date = new Date();

  date.setUTCFullYear(
    parseInt(strDateUTC.substr(0, 4)), 
    parseInt(strDateUTC.substr(4, 2), 10)-1,
    parseInt(strDateUTC.substr(6, 2)));
  date.setUTCHours(0, 0, 0, 0);
    
  return date;
}

/**
 * @desc: 通过世界时间获取date. getTimeFromUTC('2012-05-09 11:10:12')
 * @param strTimeUTC: 世界时间字符串. '2012-05-09 11:10:12' 
 * @return: Date.
 */
exports.getTimeFromUTC = function(strTimeUTC) {
  var date = new Date();
  date.setUTCFullYear(
    parseInt(strTimeUTC.substr(0, 4)), 
    parseInt(strTimeUTC.substr(5, 2), 10)-1,
    parseInt(strTimeUTC.substr(8, 2)));
  date.setUTCHours(
    parseInt(strTimeUTC.substr(11, 2)), 
    parseInt(strTimeUTC.substr(14, 2)),
    parseInt(strTimeUTC.substr(17, 2)),
    0);
  return date;
}

/**
 * @desc: 通过世界时间获取date. getTime2FromUTC('20120509111012')
 * @param strTimeUTC: 世界日期字符串. '20120509111012' 
 * @return: Date.
 */
exports.getTime2FromUTC = function(strTimeUTC) {
  var date = new Date();

  date.setUTCFullYear(
    parseInt(strTimeUTC.substr(0, 4)), 
    parseInt(strTimeUTC.substr(4, 2), 10)-1,
    parseInt(strTimeUTC.substr(6, 2)));
  date.setUTCHours(
    parseInt(strTimeUTC.substr(8, 2)), 
    parseInt(strTimeUTC.substr(10, 2)),
    parseInt(strTimeUTC.substr(12, 2)),
    0);
    
  return date;
}