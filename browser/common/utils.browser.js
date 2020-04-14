'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-04-14 12:46
* Desc: 
*/



/**
 * @desc: 判断是否是ie.
 */
exports.browserIsIE =
  function () {
    if (!!window.ActiveXObject || "ActiveXObject" in window)
      return true;
    else
      return false;
  }

/**
 * @desc: 判断ie版本号.
 * @return number. 非ie返回Number.MAX_SAFE_INTEGER.
 *        如果是 edge 返回 'edge'
 */
exports.browserIEVer =
  function () {
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
  }


/**
 * @desc: the browser is support html5.
 */
exports.browserIsSupportHtml5 =
  function () {
    if (typeof (Worker) !== "undefined") {
      return true;
    } else {
      return false;
    }
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
 * @desc: the platform is Windows.
 */
exports.platformIsWin = function(userAgent) {
  if (!userAgent) {
    if (typeof window !== undefined) {
      userAgent = window.navigator.userAgent
    }
  }
  
  var agent = userAgent;
  if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
    return true;
  }
  if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
    return true;
  }

  return false;
}


/**
 * @desc: the platform is Mac.
 */
exports.platformIsMac = function(userAgent) {
  if (!userAgent) {
    if (typeof window !== undefined) {
      userAgent = window.navigator.userAgent
    }
  }
  
  var agent = userAgent;
  if (/macintosh|mac os x/i.test(agent)) {
    return true;
  }

  return false;
}
