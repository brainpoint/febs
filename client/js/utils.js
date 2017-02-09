
febs.utils = function(){}

/**
 * @desc: the browser is mobile.
 */
febs.utils.browserIsMobile=
function() {

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
 */
febs.utils.browserIsIOS=
function () {

  var agent = window.navigator.userAgent;
  var platforms = [
    'iPhone', 'iPad',
    'iPod'
  ];
  var expression = new RegExp(platforms.join('|'), 'i');

  return agent.match(expression) != null;
}

/**
 * @desc: the browser is weixin.
 */
febs.utils.browserIsWeixin=
function (){
  var agent = window.navigator.userAgent;
  if(agent.match(/MicroMessenger/i)=="MicroMessenger") {
      return true;
  } else {
      return false;
  }
}

/**
 * @desc: the browser is phone.
 */
febs.utils.browserIsPhone=
function () {

  var agent = window.navigator.userAgent;
  var platforms = [
    'Android', 'iPhone',
    'iPod', 'Blackberry', 'Windows Phone'
  ];
  var expression = new RegExp(platforms.join('|'), 'i');

  return agent.match(expression) != null;
}

/**
 * @desc: the browser is support html5.
 */
febs.utils.browserIsSupportHtml5=
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
febs.utils.getTimeString=
function(time, fmt, weekFmt)
{
  if (typeof time !== "number")
    return "";

  fmt = fmt || 'HH:mm:ss';

  var t = new Date(time);
    var o = {         
    "M+" : t.getMonth()+1, // 月份         
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
febs.utils.getDate=
function (strDate) {
  var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
  function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
  return date;
}

/**
 * @desc: 合并多个map.
 * @return: {}
 */
febs.utils.mergeMap=
function ()
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
febs.utils.isNull=
function (e) {
  return e === null || e === undefined || Number.isNaN(e);
}
