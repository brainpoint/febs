

/**
* @desc: 判断是否是手机号码.
* @return: boolean.
*/
function isPhoneMobile(str) {
  if (!str) return false;
  if(/^0?1[2|3|4|5|6|7|8][0-9]\d{8}$/.test(str))
  {
    return true;
  }
  return false;
};

/**
 * @desc: the browser is mobile.
 */
function browserIsMobile() {

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
function browserIsIOS() {

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
 */
function browserIsPhone() {

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
function browserIsSupportHtml5() {
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
 * @return: string. xxxx-xx-xx / xx:xx:xx
 */
function getTimeString(time)
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
function getDate(strDate) {
  var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
  function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
  return date;
}

/**
 * @desc: 获取日期的string.
 * @param time: ms.
 * @return: string. xxxx-xx-xx
 */
function getDateString(time)
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
function mergeMap()
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
function isEmpty(e) {
  return e === null || e === undefined || Number.isNaN(e);
}