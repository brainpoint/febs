/*!
 * febs-browser v1.3.2
 * Copyright (c) 2026 bpoint.lee@gmail.com All Rights Reserved.
 * Released under the MIT License.
 */
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// common/promise-finally-polyfill.js
var require_promise_finally_polyfill = __commonJS({
  "common/promise-finally-polyfill.js"() {
    (function() {
      if (typeof Promise.prototype.finally === "function") {
        return;
      }
      Promise.prototype.finally = function(fn) {
        return this.then(function(value) {
          return this.constructor.resolve(fn()).then(function() {
            return value;
          });
        }).catch(function(reason) {
          return this.constructor.resolve(fn()).then(function() {
            throw reason;
          });
        });
      };
    })();
  }
});

// libs/animationFrame.js
var require_animationFrame = __commonJS({
  "libs/animationFrame.js"(exports, module) {
    var Window2 = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : void 0;
    var animationFrame2 = {};
    var lastTime = 0;
    Window2.requestAnimationFrame = Window2.requestAnimationFrame || Window2.mozRequestAnimationFrame || Window2.webkitRequestAnimationFrame || Window2.msRequestAnimationFrame;
    Window2.cancelAnimationFrame = Window2.cancelAnimationFrame || Window2.mozCancelAnimationFrame;
    if (!Window2.requestAnimationFrame) {
      Window2.requestAnimationFrame = function(callback) {
        var currTime = Date.now();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = Window2.setTimeout(
          function() {
            callback(currTime + timeToCall);
          },
          timeToCall
        );
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!Window2.cancelAnimationFrame) {
      Window2.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
    animationFrame2.requestAnimationFrame = Window2.requestAnimationFrame;
    animationFrame2.cancelAnimationFrame = Window2.cancelAnimationFrame;
    module.exports = animationFrame2;
  }
});

// common/date.js
var require_date = __commonJS({
  "common/date.js"(exports) {
    "use strict";
    exports.isValidate = function(date3) {
      if (isNaN(date3) || !date3 || date3.toString() == "Invalid Date")
        return false;
      return date3 instanceof Date;
    };
    function getTimeString(time, fmt, weekFmt) {
      if (typeof time !== "number")
        return "";
      fmt = fmt || "HH:mm:ss";
      var t = new Date(time);
      var o = {
        "M+": t.getMonth() + 1,
        //月份         
        "d+": t.getDate(),
        //日         
        "h+": t.getHours() % 12 == 0 ? 12 : t.getHours() % 12,
        //小时         
        "H+": t.getHours(),
        //小时         
        "m+": t.getMinutes(),
        //分         
        "s+": t.getSeconds(),
        //秒         
        "q+": Math.floor((t.getMonth() + 3) / 3),
        //季度         
        "S": t.getMilliseconds()
        //毫秒         
      };
      var week = weekFmt || {
        "0": "\u661F\u671F\u5929",
        "1": "\u661F\u671F\u4E00",
        "2": "\u661F\u671F\u4E8C",
        "3": "\u661F\u671F\u4E09",
        "4": "\u661F\u671F\u56DB",
        "5": "\u661F\u671F\u4E94",
        "6": "\u661F\u671F\u516D"
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
    }
    exports.getTimeString = getTimeString;
    exports.getTimeStringFromNow = function(time, strFmt) {
      strFmt = strFmt || {};
      strFmt.now = strFmt.now || "\u521A\u521A";
      strFmt.second = strFmt.second || "\u79D2\u524D";
      strFmt.minute = strFmt.minute || "\u5206\u949F\u524D";
      strFmt.hour = strFmt.hour || "\u5C0F\u65F6\u524D";
      strFmt.day_yesterday = strFmt.day_yesterday || "\u6628\u5929";
      strFmt.day = strFmt.day || "\u5929\u524D";
      strFmt.month = strFmt.month || "\u4E2A\u6708\u524D";
      strFmt.time = strFmt.time || "yyyy-M-d h:m:s";
      var now = Math.ceil(Date.now() / 1e3);
      time = Math.ceil(time / 1e3);
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
          var dNow = new Date(now * 1e3);
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
    exports.getTime = function(strTime) {
      var date3 = /* @__PURE__ */ new Date();
      date3.setFullYear(
        parseInt(strTime.substr(0, 4)),
        parseInt(strTime.substr(5, 2), 10) - 1,
        parseInt(strTime.substr(8, 2))
      );
      date3.setHours(
        parseInt(strTime.substr(11, 2)) || 0,
        parseInt(strTime.substr(14, 2)) || 0,
        parseInt(strTime.substr(17, 2)) || 0,
        0
      );
      return date3;
    };
    exports.getTime2 = function(strTime) {
      var date3 = /* @__PURE__ */ new Date();
      date3.setFullYear(
        parseInt(strTime.substr(0, 4)),
        parseInt(strTime.substr(4, 2), 10) - 1,
        parseInt(strTime.substr(6, 2))
      );
      date3.setHours(
        parseInt(strTime.substr(8, 2)) || 0,
        parseInt(strTime.substr(10, 2)) || 0,
        parseInt(strTime.substr(12, 2)) || 0,
        0
      );
      return date3;
    };
    exports.getDate = function(strDate) {
      var date3 = new Date(
        parseInt(strDate.substr(0, 4)),
        parseInt(strDate.substr(5, 2), 10) - 1,
        parseInt(strDate.substr(8, 2))
      );
      return date3;
    };
    exports.getDate2 = function(strDate) {
      var date3 = new Date(
        parseInt(strDate.substr(0, 4)),
        parseInt(strDate.substr(4, 2), 10) - 1,
        parseInt(strDate.substr(6, 2))
      );
      return date3;
    };
    exports.getUTCTimeString = function(time, fmt, weekFmt) {
      if (typeof time !== "number")
        return "";
      fmt = fmt || "HH:mm:ss";
      var t = new Date(time);
      var o = {
        "M+": t.getUTCMonth() + 1,
        //月份         
        "d+": t.getUTCDate(),
        //日         
        "h+": t.getUTCHours() % 12 == 0 ? 12 : t.getUTCHours() % 12,
        //小时         
        "H+": t.getUTCHours(),
        //小时         
        "m+": t.getUTCMinutes(),
        //分         
        "s+": t.getUTCSeconds(),
        //秒         
        "q+": Math.floor((t.getUTCMonth() + 3) / 3),
        //季度         
        "S": t.getUTCMilliseconds()
        //毫秒         
      };
      var week = weekFmt || {
        "0": "\u661F\u671F\u5929",
        "1": "\u661F\u671F\u4E00",
        "2": "\u661F\u671F\u4E8C",
        "3": "\u661F\u671F\u4E09",
        "4": "\u661F\u671F\u56DB",
        "5": "\u661F\u671F\u4E94",
        "6": "\u661F\u671F\u516D"
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
    exports.getDateFromUTC = function(strDateUTC) {
      var date3 = /* @__PURE__ */ new Date();
      date3.setUTCFullYear(
        parseInt(strDateUTC.substr(0, 4)),
        parseInt(strDateUTC.substr(5, 2), 10) - 1,
        parseInt(strDateUTC.substr(8, 2))
      );
      date3.setUTCHours(0, 0, 0, 0);
      return date3;
    };
    exports.getDate2FromUTC = function(strDateUTC) {
      var date3 = /* @__PURE__ */ new Date();
      date3.setUTCFullYear(
        parseInt(strDateUTC.substr(0, 4)),
        parseInt(strDateUTC.substr(4, 2), 10) - 1,
        parseInt(strDateUTC.substr(6, 2))
      );
      date3.setUTCHours(0, 0, 0, 0);
      return date3;
    };
    exports.getTimeFromUTC = function(strTimeUTC) {
      var date3 = /* @__PURE__ */ new Date();
      date3.setUTCFullYear(
        parseInt(strTimeUTC.substr(0, 4)),
        parseInt(strTimeUTC.substr(5, 2), 10) - 1,
        parseInt(strTimeUTC.substr(8, 2))
      );
      date3.setUTCHours(
        parseInt(strTimeUTC.substr(11, 2)) || 0,
        parseInt(strTimeUTC.substr(14, 2)) || 0,
        parseInt(strTimeUTC.substr(17, 2)) || 0,
        0
      );
      return date3;
    };
    exports.getTime2FromUTC = function(strTimeUTC) {
      var date3 = /* @__PURE__ */ new Date();
      date3.setUTCFullYear(
        parseInt(strTimeUTC.substr(0, 4)),
        parseInt(strTimeUTC.substr(4, 2), 10) - 1,
        parseInt(strTimeUTC.substr(6, 2))
      );
      date3.setUTCHours(
        parseInt(strTimeUTC.substr(8, 2)) || 0,
        parseInt(strTimeUTC.substr(10, 2)) || 0,
        parseInt(strTimeUTC.substr(12, 2)) || 0,
        0
      );
      return date3;
    };
  }
});

// libs/date.js
var require_date2 = __commonJS({
  "libs/date.js"(exports) {
    "use strict";
    var date3 = require_date();
    exports.isValidate = date3.isValidate;
    exports.getDate = date3.getDate;
    exports.getDate2 = date3.getDate2;
    exports.getDate2FromUTC = date3.getDate2FromUTC;
    exports.getDateFromUTC = date3.getDateFromUTC;
    exports.getTime2FromUTC = date3.getTime2FromUTC;
    exports.getTimeString = date3.getTimeString;
    exports.getUTCTimeString = date3.getUTCTimeString;
    exports.getTimeStringFromNow = date3.getTimeStringFromNow;
    exports.getTimeFromUTC = date3.getTimeFromUTC;
    exports.getTime = date3.getTime;
    exports.getTime2 = date3.getTime2;
  }
});

// common/utils.js
var require_utils = __commonJS({
  "common/utils.js"(exports) {
    "use strict";
    var PromiseLib = Promise;
    var utilsDate = require_date();
    exports.sleep = function(ms) {
      return new PromiseLib(function(resolve, reject) {
        try {
          setTimeout(function() {
            resolve();
          }, ms);
        } catch (err) {
          reject(err);
        }
      });
    };
    exports.mergeMap = function() {
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
    exports.isNull = function(e) {
      return e === null || e === void 0 || Number.isNaN(e);
    };
    exports.getTimeString = utilsDate.getTimeString;
    exports.getTimeStringFromNow = utilsDate.getTimeStringFromNow;
    exports.getDate = utilsDate.getDate;
    exports.getDate2 = utilsDate.getDate2;
    exports.denodeify = function(fn, self2, argumentCount) {
      argumentCount = argumentCount || Infinity;
      return function() {
        var args = Array.prototype.slice.call(
          arguments,
          0,
          argumentCount > 0 ? argumentCount : 0
        );
        return new PromiseLib(function(resolve, reject) {
          args.push(function(err, res2) {
            if (err) reject(err);
            else resolve(res2);
          });
          var res = fn.apply(self2, args);
          if (res && (typeof res === "object" || typeof res === "function") && typeof res.then === "function") {
            resolve(res);
          }
        });
      };
    };
    exports.promisify = exports.denodeify;
  }
});

// common/utils.browser.js
var require_utils_browser = __commonJS({
  "common/utils.browser.js"(exports) {
    "use strict";
    var Window2 = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : void 0;
    function getUserAgent(userAgent) {
      if (userAgent) return userAgent;
      if (Window2 && Window2.navigator && Window2.navigator.userAgent) {
        return Window2.navigator.userAgent;
      }
      return "";
    }
    exports.browserIsIE = function() {
      if (!Window2) return false;
      if (!!Window2.ActiveXObject || "ActiveXObject" in Window2)
        return true;
      else
        return false;
    };
    exports.browserIEVer = function() {
      if (!exports.browserIsIE()) return Number.MAX_SAFE_INTEGER;
      var userAgent = getUserAgent();
      var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
      var isIE11 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
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
          return 6;
        }
      } else if (isIE11) {
        return 11;
      } else {
        return Number.MAX_SAFE_INTEGER;
      }
    };
    exports.browserIsSupportHtml5 = function() {
      if (Window2 && typeof Window2.Worker !== "undefined") {
        return true;
      } else {
        return false;
      }
    };
    exports.browserIsMobile = function(userAgent) {
      var agent = getUserAgent(userAgent);
      var platforms = [
        "Android",
        "webOS",
        "iPhone",
        "iPad",
        "iPod",
        "Blackberry",
        "Windows Phone"
      ];
      var expression = new RegExp(platforms.join("|"), "i");
      return agent.match(expression) != null;
    };
    exports.browserIsIOS = function(userAgent) {
      var agent = getUserAgent(userAgent);
      var platforms = [
        "iPhone",
        "iPad",
        "iPod"
      ];
      var expression = new RegExp(platforms.join("|"), "i");
      return agent.match(expression) != null;
    };
    exports.browserIsPhone = function(userAgent) {
      var agent = getUserAgent(userAgent);
      var platforms = [
        "Android",
        "iPhone",
        "iPod",
        "Blackberry",
        "Windows Phone"
      ];
      var expression = new RegExp(platforms.join("|"), "i");
      return agent.match(expression) != null;
    };
    exports.browserIsSafari = function(userAgent) {
      var agent = getUserAgent(userAgent).toLowerCase();
      return agent.match(/version\/([\d.]+).*safari/);
    };
    exports.browserIsOpera = function(userAgent) {
      var agent = getUserAgent(userAgent).toLowerCase();
      return agent.match(/opera.([\d.]+)/);
    };
    exports.browserIsFirefox = function(userAgent) {
      var agent = getUserAgent(userAgent).toLowerCase();
      return agent.match(/firefox\/([\d.]+)/);
    };
    exports.browserIsChrome = function(userAgent) {
      var agent = getUserAgent(userAgent).toLowerCase();
      return !!agent.match(/chrome\/([\d.]+)/) && !!!agent.match(/edg\/([\d.]+)/);
    };
    exports.browserIsEdge = function(userAgent) {
      var agent = getUserAgent(userAgent).toLowerCase();
      return agent.match(/edg\/([\d.]+)/);
    };
    exports.browserIsWeixin = function(userAgent) {
      var agent = getUserAgent(userAgent);
      if (agent.match(/MicroMessenger/i) == "MicroMessenger") {
        return true;
      } else {
        return false;
      }
    };
    exports.platformIsWin = function(userAgent) {
      var agent = getUserAgent(userAgent).toLowerCase();
      if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
        return true;
      }
      if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
        return true;
      }
      if (agent.indexOf("windows nt") >= 0) {
        return true;
      }
      return false;
    };
    exports.platformIsMac = function(userAgent) {
      var agent = getUserAgent(userAgent);
      if (/macintosh|mac os x/i.test(agent)) {
        return true;
      }
      return false;
    };
  }
});

// libs/utils.js
var require_utils2 = __commonJS({
  "libs/utils.js"(exports) {
    "use strict";
    var utils3 = require_utils();
    var utilsBrowser = require_utils_browser();
    exports.sleep = utils3.sleep;
    exports.getTimeString = utils3.getTimeString;
    exports.getTimeStringFromNow = utils3.getTimeStringFromNow;
    exports.getDate = utils3.getDate;
    exports.getDate2 = utils3.getDate2;
    exports.mergeMap = utils3.mergeMap;
    exports.isNull = utils3.isNull;
    exports.denodeify = utils3.denodeify;
    exports.promisify = utils3.promisify;
    exports.browserIsIE = utilsBrowser.browserIsIE;
    exports.browserIEVer = utilsBrowser.browserIEVer;
    exports.browserIsSupportHtml5 = utilsBrowser.browserIsSupportHtml5;
    exports.browserIsMobile = utilsBrowser.browserIsMobile;
    exports.browserIsIOS = utilsBrowser.browserIsIOS;
    exports.browserIsPhone = utilsBrowser.browserIsPhone;
    exports.browserIsSafari = utilsBrowser.browserIsSafari;
    exports.browserIsOpera = utilsBrowser.browserIsOpera;
    exports.browserIsFirefox = utilsBrowser.browserIsFirefox;
    exports.browserIsChrome = utilsBrowser.browserIsChrome;
    exports.browserIsEdge = utilsBrowser.browserIsEdge;
    exports.browserIsWeixin = utilsBrowser.browserIsWeixin;
    exports.platformIsWin = utilsBrowser.platformIsWin;
    exports.platformIsMac = utilsBrowser.platformIsMac;
  }
});

// common/string.js
var require_string = __commonJS({
  "common/string.js"(exports) {
    "use strict";
    exports.isPhoneMobile = function(str) {
      if (!str) return false;
      if (/^(1[2-9][0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89]|98[0-9]|99[0-9])\d{8}$/.test(str)) {
        return true;
      }
      return false;
    };
    exports.isEmail = function(str) {
      if (!str) return false;
      if (/^(([A-Za-z0-9\u4e00-\u9fa5_-]|\.)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)$/.test(str)) {
        return true;
      }
      return false;
    };
    exports.isAlphaOrDigit = function(str) {
      if (!str) return false;
      if (/^[A-Za-z0-9]+$/.test(str)) {
        return true;
      }
      return false;
    };
    exports.isChinese = function(str) {
      if (!str) return false;
      if (/^[\u4e00-\u9fa5]{0,}$/.test(str)) {
        return true;
      }
      return false;
    };
    exports.isEmpty = function(s) {
      if (!s) {
        return true;
      }
      if (typeof s !== "string") {
        return true;
      }
      if (s.length == 0)
        return true;
      return false;
    };
    exports.getByteSize = function(s) {
      if (!s)
        return 0;
      var totalLength = 0;
      var i;
      var charCode;
      for (i = 0; i < s.length; i++) {
        charCode = s.charCodeAt(i);
        if (charCode < 128) {
          totalLength = totalLength + 1;
        } else if (charCode < 2048) {
          totalLength += 2;
        } else if (charCode >= 55296 && charCode <= 56319) {
          var next = s.charCodeAt(i + 1);
          if (next >= 56320 && next <= 57343) {
            totalLength += 4;
            i++;
          } else {
            totalLength += 3;
          }
        } else {
          totalLength += 3;
        }
      }
      return totalLength;
    };
    exports.replace = function(str, strSrc, strDest) {
      if (!str || !strSrc)
        return str;
      if (str.length == 0)
        return str;
      var s = "";
      var endPos = str.length;
      var i = 0;
      var j = 0;
      do {
        i = str.indexOf(strSrc, j);
        if (-1 != i && i < endPos) {
          if (i != j)
            s += str.slice(j, i);
          s += strDest;
          j = i + strSrc.length;
        } else {
          s += str.slice(j);
          break;
        }
      } while (i < endPos);
      return s;
    };
    exports.utf8ToBytes = function(str) {
      if (!str) {
        return new Array();
      }
      var bytes = new Array();
      var c;
      for (var i = 0; i < str.length; i++) {
        c = str.charCodeAt(i);
        if (c >= 55296 && c <= 56319) {
          var next = str.charCodeAt(i + 1);
          if (next >= 56320 && next <= 57343) {
            c = 65536 + (c - 55296 << 10) + (next - 56320);
            i++;
          }
        }
        if (c <= 127) {
          bytes.push(c & 255);
        } else if (c <= 2047) {
          bytes.push(c >> 6 & 31 | 192);
          bytes.push(c & 63 | 128);
        } else if (c <= 65535) {
          bytes.push(c >> 12 & 15 | 224);
          bytes.push(c >> 6 & 63 | 128);
          bytes.push(c & 63 | 128);
        } else {
          bytes.push(c >> 18 & 7 | 240);
          bytes.push(c >> 12 & 63 | 128);
          bytes.push(c >> 6 & 63 | 128);
          bytes.push(c & 63 | 128);
        }
      }
      return bytes;
    };
    exports.bytesToUtf8 = function(utf8Bytes) {
      var unicodeStr = "";
      for (var pos = 0; pos < utf8Bytes.length; ) {
        var flag = utf8Bytes[pos];
        var unicode = 0;
        if (flag >>> 7 === 0) {
          unicodeStr += String.fromCharCode(utf8Bytes[pos]);
          pos += 1;
        } else if ((flag & 252) === 252) {
          unicode = (utf8Bytes[pos] & 3) << 30;
          unicode |= (utf8Bytes[pos + 1] & 63) << 24;
          unicode |= (utf8Bytes[pos + 2] & 63) << 18;
          unicode |= (utf8Bytes[pos + 3] & 63) << 12;
          unicode |= (utf8Bytes[pos + 4] & 63) << 6;
          unicode |= utf8Bytes[pos + 5] & 63;
          unicodeStr += String.fromCharCode(unicode);
          pos += 6;
        } else if ((flag & 248) === 248) {
          unicode = (utf8Bytes[pos] & 7) << 24;
          unicode |= (utf8Bytes[pos + 1] & 63) << 18;
          unicode |= (utf8Bytes[pos + 2] & 63) << 12;
          unicode |= (utf8Bytes[pos + 3] & 63) << 6;
          unicode |= utf8Bytes[pos + 4] & 63;
          unicodeStr += String.fromCharCode(unicode);
          pos += 5;
        } else if ((flag & 240) === 240) {
          unicode = (utf8Bytes[pos] & 15) << 18;
          unicode |= (utf8Bytes[pos + 1] & 63) << 12;
          unicode |= (utf8Bytes[pos + 2] & 63) << 6;
          unicode |= utf8Bytes[pos + 3] & 63;
          if (unicode > 65535) {
            unicode -= 65536;
            unicodeStr += String.fromCharCode(55296 + (unicode >> 10), 56320 + (unicode & 1023));
          } else {
            unicodeStr += String.fromCharCode(unicode);
          }
          pos += 4;
        } else if ((flag & 224) === 224) {
          unicode = (utf8Bytes[pos] & 31) << 12;
          ;
          unicode |= (utf8Bytes[pos + 1] & 63) << 6;
          unicode |= utf8Bytes[pos + 2] & 63;
          unicodeStr += String.fromCharCode(unicode);
          pos += 3;
        } else if ((flag & 192) === 192) {
          unicode = (utf8Bytes[pos] & 63) << 6;
          unicode |= utf8Bytes[pos + 1] & 63;
          unicodeStr += String.fromCharCode(unicode);
          pos += 2;
        } else {
          unicodeStr += String.fromCharCode(utf8Bytes[pos]);
          pos += 1;
        }
      }
      return unicodeStr;
    };
    exports.utf8Encode = function utf8Encode(str) {
      var x, y, output = "", i = -1, l;
      if (str && str.length) {
        l = str.length;
        while ((i += 1) < l) {
          x = str.charCodeAt(i);
          y = i + 1 < l ? str.charCodeAt(i + 1) : 0;
          if (55296 <= x && x <= 56319 && 56320 <= y && y <= 57343) {
            x = 65536 + ((x & 1023) << 10) + (y & 1023);
            i += 1;
          }
          if (x <= 127) {
            output += String.fromCharCode(x);
          } else if (x <= 2047) {
            output += String.fromCharCode(
              192 | x >>> 6 & 31,
              128 | x & 63
            );
          } else if (x <= 65535) {
            output += String.fromCharCode(
              224 | x >>> 12 & 15,
              128 | x >>> 6 & 63,
              128 | x & 63
            );
          } else if (x <= 2097151) {
            output += String.fromCharCode(
              240 | x >>> 18 & 7,
              128 | x >>> 12 & 63,
              128 | x >>> 6 & 63,
              128 | x & 63
            );
          }
        }
      }
      return output;
    };
    exports.utf8Decode = function utf8Decode(str) {
      var i, ac, c1, c2, c3, arr = [], l;
      i = ac = c1 = c2 = c3 = 0;
      if (str && str.length) {
        l = str.length;
        str += "";
        while (i < l) {
          c1 = str.charCodeAt(i);
          ac += 1;
          if (c1 < 128) {
            arr[ac] = String.fromCharCode(c1);
            i += 1;
          } else if (c1 > 191 && c1 < 224) {
            c2 = str.charCodeAt(i + 1);
            arr[ac] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
            i += 2;
          } else {
            c2 = str.charCodeAt(i + 1);
            c3 = str.charCodeAt(i + 2);
            arr[ac] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            i += 3;
          }
        }
      }
      return arr.join("");
    };
    exports.trim = function(str) {
      if (!str)
        return str;
      return str.replace(/(^\s*)|(\s*$)/g, "");
    };
    exports.escapeHtml = function(str) {
      if (str) {
        str = exports.replace(str, "&", "&amp;");
        str = exports.replace(str, "<", "&lt;");
        str = exports.replace(str, ">", "&gt;");
        str = exports.replace(str, " ", "&nbsp;");
        str = exports.replace(str, '"', "&quot;");
      }
      return str || "";
    };
  }
});

// libs/string.js
var require_string2 = __commonJS({
  "libs/string.js"(exports) {
    "use strict";
    var string3 = require_string();
    exports.isPhoneMobile = string3.isPhoneMobile;
    exports.isEmpty = string3.isEmpty;
    exports.isEmail = string3.isEmail;
    exports.isAlphaOrDigit = string3.isAlphaOrDigit;
    exports.isChinese = string3.isChinese;
    exports.getByteSize = string3.getByteSize;
    exports.replace = string3.replace;
    exports.utf8ToBytes = string3.utf8ToBytes;
    exports.bytesToUtf8 = string3.bytesToUtf8;
    exports.utf8Encode = string3.utf8Encode;
    exports.utf8Decode = string3.utf8Decode;
    exports.trim = string3.trim;
    exports.escapeHtml = string3.escapeHtml;
  }
});

// common/crypt.js
var require_crypt = __commonJS({
  "common/crypt.js"(exports) {
    var utilsString = require_string();
    var crc32_table = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
    exports.crc32_table = crc32_table;
    exports.base64_encode = function(arrByte) {
      if (!arrByte) {
        return "";
      }
      if (typeof arrByte === "string") {
        arrByte = utilsString.utf8ToBytes(arrByte);
      }
      var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var out, i, len;
      var c1, c2, c3;
      len = arrByte.length;
      i = 0;
      out = "";
      while (i < len) {
        c1 = arrByte[i++] & 255;
        if (i == len) {
          out += base64EncodeChars.charAt(c1 >> 2);
          out += base64EncodeChars.charAt((c1 & 3) << 4);
          out += "==";
          break;
        }
        c2 = arrByte[i++];
        if (i == len) {
          out += base64EncodeChars.charAt(c1 >> 2);
          out += base64EncodeChars.charAt((c1 & 3) << 4 | (c2 & 240) >> 4);
          out += base64EncodeChars.charAt((c2 & 15) << 2);
          out += "=";
          break;
        }
        c3 = arrByte[i++];
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 3) << 4 | (c2 & 240) >> 4);
        out += base64EncodeChars.charAt((c2 & 15) << 2 | (c3 & 192) >> 6);
        out += base64EncodeChars.charAt(c3 & 63);
      }
      return out;
    };
  }
});

// libs/crypt.js
var require_crypt2 = __commonJS({
  "libs/crypt.js"(exports) {
    var crypt3 = require_crypt();
    function crc32(str, crc) {
      if (!crc) crc = 0;
      crc = crc ^ -1;
      for (var i = 0, iTop = str.length; i < iTop; i++) {
        crc = crc >>> 8 ^ crypt3.crc32_table[(crc ^ str.charCodeAt(i)) & 255];
      }
      return crc ^ -1;
    }
    exports.crc32 = crc32;
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
      var loadNext = function() {
        var start = currentChunk * chunkSize + offset, end = start + chunkSize >= length + offset ? length + offset : start + chunkSize;
        fileReader.readAsBinaryString(blobSlice.call(file, start, end));
      };
      var crc = 0;
      fileReader.onload = function(e) {
        crc = crc32(e.target.result, crc);
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
    exports.crc32_file = function(file, cb) {
      crc32_fileSegment(file, 0, file.size, cb);
    };
    exports.base64_encode = crypt3.base64_encode;
    exports.base64_decode = function(strBase64) {
      var c1, c2, c3, c4;
      var base64DecodeChars = new Array(
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        62,
        -1,
        -1,
        -1,
        63,
        52,
        53,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        -1,
        -1,
        -1,
        -1,
        -1
      );
      var i = 0, len = strBase64.length, out = [];
      while (i < len) {
        do {
          c1 = base64DecodeChars[strBase64.charCodeAt(i++) & 255];
        } while (i < len && c1 == -1);
        if (c1 == -1) break;
        do {
          c2 = base64DecodeChars[strBase64.charCodeAt(i++) & 255];
        } while (i < len && c2 == -1);
        if (c2 == -1) break;
        out.push(c1 << 2 | (c2 & 48) >> 4);
        do {
          c3 = strBase64.charCodeAt(i++) & 255;
          if (c3 == 61)
            return out;
          c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1) break;
        out.push((c2 & 15) << 4 | (c3 & 60) >> 2);
        do {
          c4 = strBase64.charCodeAt(i++) & 255;
          if (c4 == 61) return out;
          c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1) break;
        out.push((c3 & 3) << 6 | c4);
      }
      return out;
    };
    exports.uuid = function() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 16), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr(s[19] & 3 | 8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";
      var uuid = s.join("");
      return uuid;
    };
  }
});

// libs/crypt.md5.js
var require_crypt_md5 = __commonJS({
  "libs/crypt.md5.js"(exports) {
    var stringUtils = require_string();
    function binl2rstr(input) {
      var i, l = input.length * 32, output = "";
      for (i = 0; i < l; i += 8) {
        output += String.fromCharCode(input[i >> 5] >>> i % 32 & 255);
      }
      return output;
    }
    function bit_rol(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }
    function rstr2binl(input) {
      var i, l = input.length * 8, output = Array(input.length >> 2), lo = output.length;
      for (i = 0; i < lo; i += 1) {
        output[i] = 0;
      }
      for (i = 0; i < l; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 255) << i % 32;
      }
      return output;
    }
    function safe_add(x, y) {
      var lsw = (x & 65535) + (y & 65535), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 65535;
    }
    function hex(s) {
      var input = binl2rstr(binl(rstr2binl(s), s.length * 8));
      var hex_tab = "0123456789abcdef", output = "", x, i = 0, l = input.length;
      for (; i < l; i += 1) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt(x >>> 4 & 15) + hex_tab.charAt(x & 15);
      }
      return output;
    }
    function binl(x, len) {
      var i, olda, oldb, oldc, oldd, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
      x[len >> 5] |= 128 << len % 32;
      x[(len + 64 >>> 9 << 4) + 14] = len;
      for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
      }
      return Array(a, b, c, d);
    }
    function md5_cmn(q, a, b, x, s, t) {
      return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
      return md5_cmn(b & c | ~b & d, a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
      return md5_cmn(b & d | c & ~d, a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
      return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
      return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    exports.md5 = function(str) {
      return hex(stringUtils.utf8Encode(str));
    };
  }
});

// libs/crypt.sha1.js
var require_crypt_sha1 = __commonJS({
  "libs/crypt.sha1.js"(exports) {
    var stringUtils = require_string();
    function binb2rstr(input) {
      var i, l = input.length * 32, output = "";
      for (i = 0; i < l; i += 8) {
        output += String.fromCharCode(input[i >> 5] >>> 24 - i % 32 & 255);
      }
      return output;
    }
    function bit_rol(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }
    function safe_add(x, y) {
      var lsw = (x & 65535) + (y & 65535), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 65535;
    }
    function sha1_ft(t, b, c, d) {
      if (t < 20) {
        return b & c | ~b & d;
      }
      if (t < 40) {
        return b ^ c ^ d;
      }
      if (t < 60) {
        return b & c | b & d | c & d;
      }
      return b ^ c ^ d;
    }
    function sha1_kt(t) {
      return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
    }
    function rstr2binb(input) {
      var i, l = input.length * 8, output = Array(input.length >> 2), lo = output.length;
      for (i = 0; i < lo; i += 1) {
        output[i] = 0;
      }
      for (i = 0; i < l; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 255) << 24 - i % 32;
      }
      return output;
    }
    function hex(s) {
      var input = binb2rstr(binb(rstr2binb(s), s.length * 8));
      var hex_tab = "0123456789abcdef", output = "", x, i = 0, l = input.length;
      for (; i < l; i += 1) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt(x >>> 4 & 15) + hex_tab.charAt(x & 15);
      }
      return output;
    }
    function binb(x, len) {
      var i, j, t, olda, oldb, oldc, oldd, olde, w = Array(80), a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, e = -1009589776;
      x[len >> 5] |= 128 << 24 - len % 32;
      x[(len + 64 >> 9 << 4) + 15] = len;
      for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        olde = e;
        for (j = 0; j < 80; j += 1) {
          if (j < 16) {
            w[j] = x[i + j];
          } else {
            w[j] = bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
          }
          t = safe_add(
            safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)),
            safe_add(safe_add(e, w[j]), sha1_kt(j))
          );
          e = d;
          d = c;
          c = bit_rol(b, 30);
          b = a;
          a = t;
        }
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
      }
      return Array(a, b, c, d, e);
    }
    exports.sha1 = function(str) {
      return hex(stringUtils.utf8Encode(str));
    };
  }
});

// libs/net.transfer.js
var require_net_transfer = __commonJS({
  "libs/net.transfer.js"(exports) {
    exports.DefaultTimeout = 5e3;
    exports.transfer = function(window2) {
      if (window2 && window2.XMLHttpRequest) {
        return new window2.XMLHttpRequest();
      }
      return null;
    };
  }
});

// libs/net.ajax.js
var require_net_ajax = __commonJS({
  "libs/net.ajax.js"(exports, module) {
    "use strict";
    var febsUtils = require_utils2();
    var Window2 = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : void 0;
    var transfer = require_net_transfer();
    var Ajaxmark = "_FeBs_ajaxmark";
    var net3 = {};
    function ajax(ctx) {
      var url = ctx.url;
      if (url) {
        if (!Window2[Ajaxmark]) Window2[Ajaxmark] = 1;
        var i = url.indexOf("?");
        if (i < 0) {
          url += "?ajaxmark=" + Window2[Ajaxmark];
        } else {
          if (i == url.length - 1) {
            url += "ajaxmark=" + Window2[Ajaxmark];
          } else {
            url += "&ajaxmark=" + Window2[Ajaxmark];
          }
        }
      }
      Window2[Ajaxmark]++;
      var cbError = ctx.error || function() {
      };
      var cbSuccess = ctx.success || function() {
      };
      var cbComplete = ctx.complete || function() {
      };
      var processData = ctx.hasOwnProperty("processData") ? ctx.processData : true;
      var xhr = transfer.transfer(Window2);
      if (!xhr) {
        throw new Error("XMLHttpRequest is not supported in current environment");
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          var status = xhr.status === 1223 ? 204 : xhr.status;
          if (status < 100 || status > 599) {
            cbError(xhr, xhr.statusText, new TypeError("Network request failed"));
            cbError = null;
            return;
          }
          var body = "response" in xhr ? xhr.response : xhr.responseText;
          if (status >= 200 && status < 300 || status == 304)
            cbSuccess(body, xhr.statusText, xhr);
          cbComplete(xhr, xhr.statusText);
        }
      };
      xhr.ontimeout = function() {
        if (cbError)
          cbError(xhr, null, "timeout");
      };
      xhr.onerror = function() {
        if (cbError)
          cbError(xhr, null, new TypeError("Network request failed"));
      };
      if (ctx && ctx.progress) {
        if ("upload" in xhr && "onprogress" in xhr.upload) {
          xhr.upload.onprogress = function(event) {
            if (event.lengthComputable) {
              ctx.progress(event.loaded / event.total);
            }
          };
        } else {
          console.log("The browser not support progress event");
        }
      }
      xhr.open(ctx.type, url, ctx.async === false ? false : true);
      var timeout = (ctx.async === false ? false : true) ? ctx.timeout : 0;
      xhr.timeout = timeout !== void 0 && timeout !== null ? timeout : transfer.DefaultTimeout;
      if (ctx.hasOwnProperty("withCredentials")) {
        xhr.withCredentials = ctx.withCredentials;
      }
      if (ctx.headers) {
        if (xhr.setRequestHeader) {
          for (var key in ctx.headers) {
            var element = ctx.headers[key];
            if (key == "Content-Type" && element === false) {
              continue;
            }
            xhr.setRequestHeader(key, element);
          }
        } else {
          console.log("ajax can't set headers");
        }
      }
      if ((!ctx.headers || !ctx.headers.hasOwnProperty("Content-Type")) && xhr.setRequestHeader) {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
      }
      var data_content = ctx.data;
      if (data_content) {
        if (processData && typeof data_content !== "string") {
          try {
            if (ctx.headers && ctx.headers["Content-Type"] && ctx.headers["Content-Type"].toLowerCase().indexOf("json") >= 0) {
              data_content = JSON.stringify(data_content);
            } else {
              var data_tt = "";
              for (var key in data_content) {
                var element = data_content[key];
                if (data_tt.length > 0) data_tt += "&";
                data_tt += key + "=" + (element ? element.toString() : "");
              }
              data_content = data_tt;
            }
          } catch (e) {
            console.log("ajax stringify data error");
            console.log(e);
          }
        }
      }
      if (ctx.beforeSend) {
        ctx.beforeSend(xhr);
      }
      xhr.send(data_content);
      return {
        abort: function() {
          xhr.abort();
        }
      };
    }
    net3.ajax = ajax;
    module.exports = net3;
  }
});

// common/exception.js
var require_exception = __commonJS({
  "common/exception.js"(exports, module) {
    "use strict";
    module.exports = class extends Error {
      /**
      * @desc: 构造异常对象.
      * @param msg: 异常消息
      * @param code: 异常代码
      * @param filename: 异常文件名
      * @param line: 异常文件所在行
      * @param column: 异常文件所在列
      * @return: 
      */
      constructor(msg, code, filename, line, column) {
        super(code + " " + msg);
        this.__tag = "febs.exception";
        this.code = code;
        this.msg = msg;
        this.filename = filename;
        this.line = line;
        this.column = column || 0;
      }
      /**
       * 判断是否是febs.exception异常实例.
       */
      static isInstance(e) {
        return e && e.__tag === "febs.exception";
      }
      /**
      * @desc: 一般错误.
      */
      static get ERROR() {
        return "error";
      }
      /**
      * @desc: 参数错误.
      */
      static get PARAM() {
        return "param error";
      }
      /**
      * @desc: 越界
      * @return:
      */
      static get OUT_OF_RANGE() {
        return "out of range";
      }
    };
  }
});

// libs/net.fetch.js
var require_net_fetch = __commonJS({
  "libs/net.fetch.js"(exports, module) {
    "use strict";
    var febsUtils = require_utils2();
    var Window2 = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : void 0;
    var transfer = require_net_transfer();
    var exception3 = require_exception();
    var febsnet = {};
    var net3 = {};
    if (false) {
    } else {
      let AbortController = function() {
        let _this = this;
        Object.defineProperty(this, "signal", {
          get: function() {
            if (!_this.__signalWrap) {
              _this.__signalWrap = {};
            }
            return _this.__signalWrap;
          },
          enumerable: true,
          configurable: true
        });
      };
      if (!Promise) {
        throw new Error("unsupported Promise");
      }
      AbortController.prototype.abort = function() {
        if (this.__signalWrap && this.__signalWrap.__xhr) {
          try {
            this.__signalWrap.__xhr.abort();
          } catch (e) {
            console.log(e);
          }
          this.__signalWrap.__xhr = null;
        }
      };
      Window2._AbortController = AbortController;
      net3.AbortController = AbortController;
      febsnet.normalizeName = function(name) {
        if (typeof name !== "string") {
          name = String(name);
        }
        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
          throw new TypeError("Invalid character in header field name");
        }
        return name.toLowerCase();
      };
      febsnet.normalizeValue = function(value) {
        if (typeof value !== "string") {
          value = String(value);
        }
        return value;
      };
      febsnet.Headers = function(headers) {
        this.map = {};
        if (headers instanceof febsnet.Headers) {
          headers.forEach(function(value, name) {
            this.append(name, value);
          }, this);
        } else if (headers) {
          Object.getOwnPropertyNames(headers).forEach(function(name) {
            this.append(name, headers[name]);
          }, this);
        }
      };
      febsnet.Headers.prototype.append = function(name, value) {
        name = febsnet.normalizeName(name);
        value = febsnet.normalizeValue(value);
        var list = this.map[name];
        if (!list) {
          list = [];
          this.map[name] = list;
        }
        list.push(value);
      };
      febsnet.Headers.prototype["delete"] = function(name) {
        delete this.map[febsnet.normalizeName(name)];
      };
      febsnet.Headers.prototype.get = function(name) {
        var values = this.map[febsnet.normalizeName(name)];
        return values ? values[0] : null;
      };
      febsnet.Headers.prototype.getAll = function(name) {
        return this.map[febsnet.normalizeName(name)] || [];
      };
      febsnet.Headers.prototype.has = function(name) {
        return this.map.hasOwnProperty(febsnet.normalizeName(name));
      };
      febsnet.Headers.prototype.set = function(name, value) {
        this.map[febsnet.normalizeName(name)] = [febsnet.normalizeValue(value)];
      };
      febsnet.Headers.prototype.forEach = function(callback, thisArg) {
        Object.getOwnPropertyNames(this.map).forEach(function(name) {
          this.map[name].forEach(function(value) {
            callback.call(thisArg, value, name, this);
          }, this);
        }, this);
      };
      febsnet.consumed = function(body) {
        if (body.bodyUsed) {
          return Promise.reject(new TypeError("Already read"));
        }
        body.bodyUsed = true;
      };
      febsnet.fileReaderReady = function(reader) {
        return new Promise(function(resolve, reject) {
          reader.onload = function() {
            resolve(reader.result);
          };
          reader.onerror = function() {
            reject(reader.error);
          };
        });
      };
      febsnet.readBlobAsArrayBuffer = function(blob) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        return febsnet.fileReaderReady(reader);
      };
      febsnet.readBlobAsText = function(blob) {
        var reader = new FileReader();
        reader.readAsText(blob);
        return febsnet.fileReaderReady(reader);
      };
      if (!Window2.self) {
        febsnet.support = {};
      } else {
        febsnet.support = {
          blob: "FileReader" in Window2.self && "Blob" in Window2.self && (function() {
            try {
              new Blob();
              return true;
            } catch (e) {
              return false;
            }
          })(),
          formData: "FormData" in Window2.self,
          arrayBuffer: "ArrayBuffer" in Window2.self
        };
      }
      febsnet.Body = function() {
        this.bodyUsed = false;
        this._initBody = function(body) {
          this._bodyInit = body;
          if (typeof body === "string") {
            this._bodyText = body;
          } else if (febsnet.support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body;
          } else if (febsnet.support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body;
          } else if (!body) {
            this._bodyText = "";
          } else if (febsnet.support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
          } else {
            throw new Error("unsupported BodyInit type");
          }
        };
        if (febsnet.support.blob) {
          this.blob = function() {
            var rejected = febsnet.consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return Promise.resolve(this._bodyBlob);
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as blob");
            } else {
              return Promise.resolve(new Blob([this._bodyText]));
            }
          };
          this.arrayBuffer = function() {
            return this.blob().then(febsnet.readBlobAsArrayBuffer);
          };
          this.text = function() {
            var rejected = febsnet.consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return febsnet.readBlobAsText(this._bodyBlob);
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
        } else {
          this.text = function() {
            var rejected = febsnet.consumed(this);
            return rejected ? rejected : Promise.resolve(this._bodyText);
          };
        }
        if (febsnet.support.formData) {
          this.formData = function() {
            return this.text().then(febsnet.decode);
          };
        }
        this.json = function() {
          return this.text().then(JSON.parse);
        };
        return this;
      };
      febsnet.normalizeMethod = function(method) {
        var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        var upcased = method.toUpperCase();
        return methods.indexOf(upcased) > -1 ? upcased : method;
      };
      febsnet.Request = function(input, options) {
        options = options || {};
        var body = options.body;
        if (febsnet.Request.prototype.isPrototypeOf(input)) {
          if (input.bodyUsed) {
            throw new TypeError("Already read");
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
        this.credentials = options.credentials || this.credentials || "omit";
        if (options.headers || !this.headers) {
          this.headers = new febsnet.Headers(options.headers);
        }
        this.method = febsnet.normalizeMethod(options.method || this.method || "GET");
        this.mode = options.mode || this.mode || null;
        this.referrer = null;
        this._initBody(body);
      };
      febsnet.Request.prototype.clone = function() {
        return new febsnet.Request(this);
      };
      febsnet.decode = function(body) {
        var form = new FormData();
        body.trim().split("&").forEach(function(bytes) {
          if (bytes) {
            var split = bytes.split("=");
            var name = split.shift().replace(/\+/g, " ");
            var value = split.join("=").replace(/\+/g, " ");
            form.append(decodeURIComponent(name), decodeURIComponent(value));
          }
        });
        return form;
      };
      febsnet.headers = function(xhr) {
        var head = new febsnet.Headers();
        var pairs = xhr.getAllResponseHeaders().trim().split("\n");
        pairs.forEach(function(header) {
          var split = header.trim().split(":");
          var key = split.shift().trim();
          var value = split.join(":").trim();
          head.append(key, value);
        });
        return head;
      };
      febsnet.Body.call(febsnet.Request.prototype);
      febsnet.Response = function(bodyInit, options) {
        if (!options) {
          options = {};
        }
        this._initBody(bodyInit);
        this.type = "default";
        this.status = options.status;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = options.statusText;
        this.headers = options.headers instanceof febsnet.Headers ? options.headers : new febsnet.Headers(options.headers);
        this.url = options.url || "";
      };
      febsnet.Body.call(febsnet.Response.prototype);
      febsnet.Response.prototype.clone = function() {
        return new febsnet.Response(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new febsnet.Headers(this.headers),
          url: this.url
        });
      };
      febsnet.Response.error = function() {
        var response = new febsnet.Response(null, { status: 0, statusText: "" });
        response.type = "error";
        return response;
      };
      redirectStatuses = [301, 302, 303, 307, 308];
      febsnet.Response.redirect = function(url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
          throw new RangeError("Invalid status code");
        }
        return new febsnet.Response(null, { status, headers: { location: url } });
      };
      Window2.Headers = febsnet.Headers;
      Window2.Request = febsnet.Request;
      Window2.Response = febsnet.Response;
      Window2.fetch = febsnet.fetch = function(input, init) {
        return new Promise(function(resolve, reject) {
          var request;
          if (febsnet.Request.prototype.isPrototypeOf(input) && !init) {
            request = input;
          } else {
            request = new febsnet.Request(input, init);
          }
          var xhr = transfer.transfer(Window2);
          function responseURL() {
            if ("responseURL" in xhr) {
              return xhr.responseURL;
            }
            if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
              return xhr.getResponseHeader("X-Request-URL");
            }
            return;
          }
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              var status = xhr.status === 1223 ? 204 : xhr.status;
              if (status < 100 || status > 599) {
                reject(new exception3("Network request failed", "NetworkFailed", null, null, null));
                return;
              }
              var options = {
                status,
                statusText: xhr.statusText,
                headers: febsnet.headers(xhr),
                url: responseURL()
              };
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              resolve(new febsnet.Response(body, options));
            }
          };
          xhr.ontimeout = function() {
            reject(new exception3("Network timeout", "NetworkTimeout", null, null, null));
          };
          xhr.onerror = function() {
            reject(new exception3("Network request failed", "NetworkFailed", null, null, null));
          };
          if (init && init.progress) {
            xhr.onprogress = function(event) {
              if (event.lengthComputable) {
                init.progress((event.position || event.loaded || 0) / (event.totalSize || event.total || 1));
              }
            };
          }
          if (init && init.signal) {
            init.signal.__xhr = xhr;
          }
          xhr.open(request.method, request.url, true);
          var timeout = init ? init.timeout : null;
          xhr.timeout = timeout !== void 0 && timeout !== null ? timeout : transfer.DefaultTimeout;
          if (request.credentials === "include") {
            xhr.withCredentials = true;
          } else {
            xhr.withCredentials = false;
          }
          if ("responseType" in xhr && febsnet.support.blob) {
            xhr.responseType = "blob";
          }
          if (xhr.setRequestHeader) {
            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value);
            });
          } else if (request.headers && request.headers.map.length > 0) {
            console.log("fetch can't set headers");
          }
          try {
            xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
          } catch (e) {
            reject(new exception3("Network request failed", "NetworkFailed", null, null, null));
          }
        });
      };
      febsnet.fetch.polyfill = true;
      net3.fetch = febsnet.fetch;
    }
    var redirectStatuses;
    module.exports = net3;
  }
});

// libs/net.jsonp.js
var require_net_jsonp = __commonJS({
  "libs/net.jsonp.js"(exports, module) {
    "use strict";
    var febsUtils = require_utils2();
    var Window2 = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : void 0;
    var DefaultTimeout = 5e3;
    var febsnet = {};
    var net3 = {};
    febsnet.jsonp_defaultOptions = {
      timeout: DefaultTimeout,
      jsonpCallback: "callback"
    };
    febsnet.jsonp_generateCallbackFunction = function() {
      return "jsonp_" + Date.now().toString() + "_" + Math.ceil(Math.random() * 1e5);
    };
    febsnet.jsonp_clearFunction = function(functionName) {
      try {
        delete Window2[functionName];
      } catch (e) {
      }
    };
    febsnet.jsonp_removeScript = function(scriptId) {
      var script = document.getElementById(scriptId);
      document.getElementsByTagName("head")[0].removeChild(script);
    };
    febsnet.jsonp = function(url, options) {
      options = options || {};
      var timeout = options.timeout != null ? options.timeout : febsnet.jsonp_defaultOptions.timeout;
      var jsonpCallback = !!options.jsonpCallback ? options.jsonpCallback : febsnet.jsonp_defaultOptions.jsonpCallback;
      var timeoutId;
      return new Promise(function(resolve, reject) {
        var callbackFunction = febsnet.jsonp_generateCallbackFunction();
        Window2[callbackFunction] = function(response) {
          resolve({
            ok: true,
            // keep consistent with fetch API
            json: function() {
              return Promise.resolve(response);
            }
          });
          if (timeoutId) clearTimeout(timeoutId);
          febsnet.jsonp_removeScript(jsonpCallback + "_" + callbackFunction);
          febsnet.jsonp_clearFunction(callbackFunction);
        };
        url += url.indexOf("?") === -1 ? "?" : "&";
        var jsonpScript = document.createElement("script");
        jsonpScript.setAttribute("src", url + jsonpCallback + "=" + callbackFunction);
        jsonpScript.id = jsonpCallback + "_" + callbackFunction;
        document.getElementsByTagName("head")[0].appendChild(jsonpScript);
        timeoutId = setTimeout(function() {
          reject("timeout");
          febsnet.jsonp_clearFunction(callbackFunction);
          febsnet.jsonp_removeScript(jsonpCallback + "_" + callbackFunction);
        }, timeout);
      });
    };
    net3.jsonp = febsnet.jsonp;
    module.exports = net3;
  }
});

// libs/net.js
var require_net = __commonJS({
  "libs/net.js"(exports, module) {
    "use strict";
    var febsUtils = require_utils2();
    var netajax = require_net_ajax();
    var netfetch = require_net_fetch();
    var netjsonp = require_net_jsonp();
    var net3 = {
      ajax: netajax.ajax,
      AbortController: netfetch.AbortController,
      fetch: netfetch.fetch,
      jsonp: netjsonp.jsonp
    };
    module.exports = net3;
  }
});

// libs/dom.js
var require_dom = __commonJS({
  "libs/dom.js"(exports) {
    var Window2 = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : void 0;
    var utils3 = require_utils2();
    var stringUtils = require_string2();
    function _matchElement(parentNodes, name, notAllChildren) {
      var elems;
      var tag = 0;
      var nameattr, nameattrVal;
      var selector = name.split(":");
      name = selector[0];
      name = stringUtils.trim(name);
      selector = selector[1];
      if (selector) {
        if (selector != "checked" && selector != "disabled") {
          throw new Error("only support `:checked or :disabled` selector");
        }
      }
      if (name.indexOf("[") > 0) {
        var iblace = name.indexOf("[");
        nameattr = name.substring(iblace + 1, name.length - 1);
        nameattr = nameattr.split("=");
        if (nameattr.length != 2) {
          throw new Error("Syntax error, unrecognized expression: " + name);
        }
        nameattrVal = nameattr[1];
        if (nameattrVal.indexOf("'") >= 0 || nameattrVal.indexOf('"') >= 0)
          nameattrVal = nameattrVal.substring(1, nameattrVal.length - 1);
        nameattr = nameattr[0];
        name = name.substr(0, iblace);
      }
      if (name[0] == ".") {
        tag = 2;
        name = name.substr(1);
      } else if (name[0] == "#") {
        tag = 1;
        name = name.substr(1);
      }
      if (!parentNodes || parentNodes.length == 0) {
        if (2 == tag) {
          elems = Window2.document.getElementsByClassName(name);
        } else if (1 == tag) {
          elems = Window2.document.getElementById(name);
          if (elems) elems = [elems];
          else elems = [];
        } else if (0 == tag) {
          elems = Window2.document.getElementsByTagName(name);
        }
        if (nameattr) {
          var tt_elems = elems;
          elems = [];
          for (var i = 0; i < tt_elems.length; i++) {
            if (tt_elems[i].getAttribute(nameattr) === nameattrVal) {
              elems.push(tt_elems[i]);
            }
          }
        }
        if (selector) {
          var tt_elems = elems;
          elems = [];
          for (var i = 0; i < tt_elems.length; i++) {
            if (selector == "disabled") {
              if (tt_elems[i].disabled) {
                elems.push(tt_elems[i]);
              }
            } else if (selector == "checked") {
              if (tt_elems[i].checked) {
                elems.push(tt_elems[i]);
              }
            }
          }
        }
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
              if (selector == "disabled") {
                if (!node[j].disabled) {
                  add = false;
                }
              } else if (selector == "checked") {
                if (!node[j].checked) {
                  add = false;
                }
              }
            }
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
            }
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
          }
        }
      }
      return elems;
    }
    function _getElement(name, parentNode) {
      if (name === "") name = null;
      var _elem;
      var _isarr = false;
      if (typeof name === "string") {
        if (name[0] == "<") {
          _elem = Window2.document.createElement("div");
          _elem.innerHTML = name;
          if (_elem.childNodes.length == 1) {
            _elem = _elem.childNodes[0];
            _isarr = false;
          } else {
            _elem = _elem.childNodes;
            _isarr = true;
          }
        } else {
          if (name.indexOf("<") > 0 || name.indexOf(">") > 0)
            throw new Error("Syntax error, unrecognized");
          var names = name.split(" ");
          var nodes = parentNode ? [parentNode] : null;
          for (var i = 0; i < names.length; i++) {
            if (names[i] != "")
              nodes = _matchElement(nodes, names[i], !!parentNode);
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
      return { _elem, _isarr };
    }
    function _hasClass(element, cName) {
      if (!element || !element.className || typeof element.className.match !== "function")
        return false;
      return !!element.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
    }
    function _addClass(element, cName) {
      if (!element) return;
      if (typeof element.className === "string") {
        if (!_hasClass(element, cName)) {
          if (stringUtils.isEmpty(element.className))
            element.className += cName;
          else
            element.className += " " + cName;
        }
        ;
      }
    }
    function _removeClass(element, cName) {
      if (!element) return;
      if (typeof element.className === "string") {
        if (_hasClass(element, cName)) {
          element.className = element.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
          element.className = stringUtils.trim(element.className);
        }
        ;
      }
    }
    function _removeElement(element) {
      if (element) {
        var _parentElement = element.parentNode;
        if (_parentElement) {
          _parentElement.removeChild(element);
        }
      }
    }
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
        return obj == Window2 || obj == document;
      }
    }
    var CreateDom;
    var Dom = class _Dom {
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
      constructor(name) {
        if (name === Window2.document || name == Window2) {
          this._elem = name;
          this._isArr = false;
        } else if (name instanceof _Dom) {
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
        if (name === Window2.document) {
          this.ready = function(f) {
            if (f) {
              if (Window2.addEventListener)
                Window2.document.addEventListener("DOMContentLoaded", f);
              else
                Window2.document.attachEvent("onload", f);
            } else {
              _this.trigger("ready");
            }
            return _this;
          };
          this.unload = function(f) {
            if (f) {
              if (Window2.addEventListener)
                Window2.document.addEventListener("unload", f);
              else
                Window2.document.attachEvent("onunload", f);
            } else {
              _this.trigger("unload");
            }
            return _this;
          };
          this.context = Window2.document;
        } else if (name === Window2) {
          this.unload = function(f) {
            if (f) {
              if (Window2.addEventListener)
                Window2.addEventListener("unload", f);
              else
                Window2.attachEvent("onunload", f);
            } else {
              _this.trigger("unload");
            }
            return _this;
          };
        } else {
          this.context = Window2.document;
        }
        if (typeof name === "function") {
          let foo2 = function(e) {
            name.bind(_this)(e);
            if (Window2.addEventListener)
              Window2.document.removeEventListener("DOMContentLoaded", foo2);
            else
              Window2.document.detachEvent("onload", foo2);
          };
          var foo = foo2;
          if (Window2.addEventListener)
            Window2.document.addEventListener("DOMContentLoaded", foo2);
          else
            Window2.document.attachEvent("onload", foo2);
        } else {
          let ttt2 = function(event, f) {
            if (f) {
              return _this.on(event, f);
            } else {
              return _this.trigger(event);
            }
          };
          var ttt = ttt2;
          this.blur = function(f) {
            return ttt2("blur", f);
          };
          this.change = function(f) {
            return ttt2("change", f);
          };
          this.click = function(f) {
            return ttt2("click", f);
          };
          this.dblclick = function(f) {
            return ttt2("dblclick", f);
          };
          this.error = function(f) {
            return ttt2("error", f);
          };
          this.keydown = function(f) {
            return ttt2("keydown", f);
          };
          this.keypress = function(f) {
            return ttt2("keypress", f);
          };
          this.keyup = function(f) {
            return ttt2("keyup", f);
          };
          this.load = function(f) {
            return ttt2("load", f);
          };
          this.mousedown = function(f) {
            return ttt2("mousedown", f);
          };
          this.mouseenter = function(f) {
            return ttt2("mouseenter", f);
          };
          this.mouseleave = function(f) {
            return ttt2("mouseleave", f);
          };
          this.mousemove = function(f) {
            return ttt2("mousemove", f);
          };
          this.mouseout = function(f) {
            return ttt2("mouseout", f);
          };
          this.mouseover = function(f) {
            return ttt2("mouseover", f);
          };
          this.mouseup = function(f) {
            return ttt2("mouseup", f);
          };
          this.scroll = function(f) {
            return ttt2("scroll", f);
          };
          this.select = function(f) {
            return ttt2("select", f);
          };
          this.submit = function(f) {
            return ttt2("submit", f);
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
        for (var key in CreateDom.fn) {
          if (key == "extend" || key == "fn") continue;
          if (typeof CreateDom.fn[key] === "function") {
            this[key] = CreateDom.fn[key].bind(this);
          }
        }
        this.__domtify = true;
      }
      get(index) {
        if (!this._elem) return null;
        else {
          if (this._isArray()) {
            return this._elem[index];
          } else {
            return index > 0 ? null : this._elem;
          }
        }
      }
      /**
       * @desc: hasClass
       */
      hasClass(cName) {
        if (!this._elem) {
          return false;
        }
        var _thisLength = this.length ? this.length : 1;
        for (var i = 0; i < _thisLength; i++) {
          if (_hasClass(this.get(i), cName)) return true;
        }
        return false;
      }
      /**
       * @desc: addClass
       */
      addClass(cName) {
        if (!this._elem) {
          return this;
        }
        var _thisLength = this.length ? this.length : 1;
        for (var i = 0; i < _thisLength; i++) {
          _addClass(this.get(i), cName);
        }
        return this;
      }
      /**
       * @desc: removeClass
       */
      removeClass(cName) {
        if (!this._elem) {
          return this;
        }
        var _thisLength = this.length ? this.length : 1;
        for (var i = 0; i < _thisLength; i++) {
          _removeClass(this.get(i), cName);
        }
        return this;
      }
      /**
       * @desc: toggleClass
       */
      toggleClass(cName) {
        if (!this._elem) {
          return this;
        }
        var _thisLength = this.length ? this.length : 1;
        for (var i = 0; i < _thisLength; i++) {
          if (_hasClass(this.get(i), cName))
            _removeClass(this.get(i), cName);
          else
            _addClass(this.get(i), cName);
        }
        return this;
      }
      /**
       * @desc: remove
       */
      remove() {
        if (!this._elem) {
          return this;
        }
        var _thisLength = this.length ? this.length : 1;
        for (var i = _thisLength - 1; i >= 0; i--) {
          _removeElement(this.get(i));
        }
        return this;
      }
      /**
       * @desc: append
       */
      append(node) {
        if (!this._elem) {
          return this;
        }
        var _dom2 = new _Dom(node);
        _appendChild(this.get(0), _dom2);
        return this;
      }
      /**
       * appendTo
       */
      appendTo(node) {
        if (!this._elem) {
          return this;
        }
        var dom3 = new _Dom(node);
        dom3.append(this);
        return this;
      }
      /**
       * @desc: prepend
       */
      prepend(node) {
        if (!this._elem) {
          return this;
        }
        var _dom2 = new _Dom(node);
        _prependChild(this.get(0), _dom2);
        return this;
      }
      /**
       * @desc: prependTo
       */
      prependTo(node) {
        if (!this._elem) {
          return this;
        }
        var dom3 = new _Dom(node);
        dom3.prepend(this);
        return this;
      }
      /**
       * @desc: before
       */
      before(node) {
        if (!this._elem) {
          return this;
        }
        var _dom2 = new _Dom(node);
        var _thisLength = this.length ? this.length : 1;
        for (var i = 0; i < _thisLength; i++) {
          _dom2.insertBefore(this.get(i));
        }
        return this;
      }
      /**
       * insertBefore
       */
      insertBefore(node) {
        if (!this._elem) {
          return this;
        }
        var dom3 = new _Dom(node);
        if (!dom3._isArray()) {
          var elem = this._elem;
          if (!this._isArray()) elem = [elem];
          for (var i = 0; i < elem.length; i++) {
            dom3[0].parentNode.insertBefore(elem[i], dom3[0]);
          }
        }
        return this;
      }
      /**
       * @desc: after
       */
      after(node) {
        if (!this._elem) {
          return this;
        }
        var _dom2 = new _Dom(node);
        var _thisLength = this.length ? this.length : 1;
        for (var i = 0; i < _thisLength; i++) {
          _dom2.insertAfter(this.get(i));
        }
        return this;
      }
      /**
       * @desc: insertAfter
       */
      insertAfter(node) {
        if (!this._elem) {
          return this;
        }
        var dom3 = new _Dom(node);
        if (!dom3._isArray()) {
          var elem = this._elem;
          if (!this._isArray()) elem = [elem];
          for (var i = 0; i < elem.length; i++) {
            dom3[0].parentNode.insertBefore(elem[i], dom3[0].nextSibling);
          }
        }
        return this;
      }
      /**
       * @desc: attr.
       */
      attr(attrName, value) {
        if (!attrName) {
          throw new Error("need attrName");
        }
        if (!this._elem) {
          if (typeof value !== "undefined")
            return this;
          return void 0;
        }
        if (typeof value === "undefined") {
          if (!this.get(0).hasAttribute(attrName))
            return void 0;
          return this.get(0).getAttribute(attrName);
        } else {
          var _thisLength = this.length ? this.length : 1;
          for (var i = 0; i < _thisLength; i++) {
            this.get(i).setAttribute(attrName, value);
          }
          return this;
        }
      }
      /**
       * @desc: removeAttr
       */
      removeAttr(name) {
        if (!this._elem) {
          return this;
        }
        var _thisLength = this.length ? this.length : 1;
        for (var i = 0; i < _thisLength; i++) {
          this.get(i).removeAttribute(name);
        }
        return this;
      }
      /**
      * @desc: detach.
      */
      detach() {
        throw new Error("unimplement");
      }
      /**
      * @desc: clone.
      */
      clone() {
        throw new Error("unimplement");
      }
      /**
      * @desc: replaceAll.
      */
      replaceAll() {
        throw new Error("unimplement");
      }
      /**
      * @desc: replaceWith.
      */
      unwrap() {
        throw new Error("unimplement");
      }
      /**
      * @desc: replaceWith.
      */
      wrap() {
        throw new Error("unimplement");
      }
      /**
      * @desc: replaceWith.
      */
      wrapAll() {
        throw new Error("unimplement");
      }
      /**
      * @desc: replaceWith.
      */
      wrapinner() {
        throw new Error("unimplement");
      }
      /**
      * @desc: empty.
      */
      empty() {
        if (!this._elem) {
          return this;
        }
        var _thisLength = this.length ? this.length : 1;
        for (var i = 0; i < _thisLength; i++) {
          this.get(i).innerHTML = "";
        }
        return this;
      }
      /**
      * @desc: html.
      */
      html(v) {
        if (!this._elem) {
          if (typeof v !== "undefined")
            return this;
          return;
        }
        if (typeof v === "undefined") {
          return this.get(0).innerHTML;
        } else {
          var _thisLength = this.length ? this.length : 1;
          for (var i = 0; i < _thisLength; i++) {
            this.get(i).innerHTML = v;
          }
          return this;
        }
      }
      /**
      * @desc: text.
      */
      text(v) {
        if (!this._elem) {
          if (typeof v !== "undefined")
            return this;
          return;
        }
        if (typeof v === "undefined") {
          return this.get(0).textContent;
        } else {
          var _thisLength = this.length ? this.length : 1;
          for (var i = 0; i < _thisLength; i++) {
            this.get(i).textContent = v;
          }
          return this;
        }
      }
      /**
      * @desc: val.
      */
      val(v) {
        if (!this._elem) {
          if (typeof v !== "undefined")
            return this;
          return;
        }
        if (typeof v === "undefined") {
          return this.get(0).value;
        } else {
          var _thisLength = this.length ? this.length : 1;
          for (var i = 0; i < _thisLength; i++) {
            this.get(i).value = v;
          }
          return this;
        }
      }
      /**
      * @desc: css.
      */
      css(name, value) {
        if (!this._elem) {
          if (typeof value !== "undefined")
            return this;
          return;
        }
        if (typeof value === "undefined") {
          return this.get(0).style[name];
        } else {
          var _thisLength = this.length ? this.length : 0;
          for (var i = 0; i < _thisLength; i++) {
            if (value == "")
              this.get(i).style[name] = "";
            else
              this.get(i).style[name] = value;
          }
          return this;
        }
      }
      /**
      * @desc: on.
      */
      on(eventname, foo) {
        if (!eventname)
          throw new Error("need event name");
        if (typeof foo !== "function")
          throw new Error("on need function params");
        if (!this._elem) {
          return this;
        }
        var _thisLength = this.length ? this.length : 1;
        for (var i = 0; i < _thisLength; i++) {
          var ee = this.get(i);
          if (ee instanceof _Dom || ee.__domtify) {
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
          if ("on" + eventname in ee) {
            if (ee.addEventListener)
              ee.addEventListener(eventname, foo);
            else
              ee.attachEvent("on" + eventname, foo);
          }
        }
        return this;
      }
      /**
      * @desc: one.
      */
      one(event, f) {
        if (!event || typeof event !== "string")
          throw new Error("need event name");
        var _this = this;
        var tt = function(e) {
          _this.off(event, tt);
          f.bind(this)(e);
        };
        _this.on(event, tt);
        return this;
      }
      /**
      * @desc: off.
      */
      off(eventname, foo) {
        if (!eventname)
          throw new Error("need event name");
        if (!this._elem) {
          return this;
        }
        if (!foo) {
          var _thisLength = this.length ? this.length : 1;
          for (var i = 0; i < _thisLength; i++) {
            var ee = this.get(i);
            if (ee instanceof _Dom || ee.__domtify) {
              ee = ee._elem;
              if (!ee) {
                continue;
              }
            }
            if (ee.__events && ee.__events[eventname]) {
              var env = ee.__events[eventname];
              var j;
              if ("on" + eventname in ee) {
                for (j = 0; j < env.length; j++) {
                  if (ee.removeEventListener)
                    ee.removeEventListener(eventname, env[j]);
                  else
                    ee.detachEvent("on" + eventname, env[j]);
                }
              }
              ee.__events[eventname] = [];
            }
          }
          return this;
        }
        if (typeof foo !== "function")
          throw new Error("off need function params");
        var _thisLength = this.length ? this.length : 1;
        for (var i = 0; i < _thisLength; i++) {
          var ee = this.get(i);
          if (ee instanceof _Dom) {
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
          if ("on" + eventname in ee) {
            if (ee.removeEventListener)
              ee.removeEventListener(eventname, foo);
            else
              ee.detachEvent("on" + eventname, foo);
          }
        }
        return this;
      }
      /**
      * @desc: trigger.
      */
      trigger(eventname, extraParameters) {
        if (!eventname)
          throw new Error("need event name");
        if (!this._elem) {
          return this;
        }
        var _thisLength = this.length ? this.length : 1;
        for (var i = 0; i < _thisLength; i++) {
          var ee = this.get(i);
          if (ee instanceof _Dom) {
            ee = ee._elem;
          }
          if (ee) {
            if ("on" + eventname in ee) {
              if (!Window2.document.addEventListener) {
                ee.fireEvent("on" + eventname);
              } else {
                var env = Window2.document.createEvent("HTMLEvents");
                env.initEvent(eventname, true, true);
                ee.dispatchEvent(env);
              }
            } else {
              if (ee.__events && ee.__events[eventname]) {
                var env = ee.__events[eventname];
                var j;
                var enve;
                enve = {
                  bubbles: false,
                  cancelable: false,
                  cancelBubble: false,
                  defaultPrevented: false,
                  // currentTarget: ee,
                  // target: ee,
                  type: eventname
                };
                enve.currentTarget = ee;
                enve.target = ee;
                for (j = 0; j < env.length; j++) {
                  env[j](enve, extraParameters);
                }
              }
            }
          }
        }
        return this;
      }
      /**
      * @desc: parent
      * @return: 
      */
      parent(selector) {
        if (!this._elem) {
          return new _Dom();
        }
        var sel;
        if (selector)
          sel = new _Dom(selector);
        if (this._isArray()) {
          var dom3 = new _Dom();
          dom3._elem = [];
          dom3._isArr = true;
          dom3.length = 0;
          var _thisLength = this.length ? this.length : 1;
          for (var i = 0; i < _thisLength; i++) {
            if (this.get(i).parentNode) {
              if (!sel || sel._isElementIn(this.get(i).parentNode)) {
                this._domtify(this.get(i).parentNode);
                dom3._elem.push(this.get(i).parentNode);
                dom3[dom3.length] = this.get(i).parentNode;
                dom3.length++;
              }
            }
          }
          if (dom3._elem.length == 0) dom3._elem = null;
          return dom3;
        } else {
          if (!this._elem.parentNode) return new _Dom();
          if (!sel || sel._isElementIn(this._elem.parentNode)) {
            return new _Dom(this._elem.parentNode);
          }
          return new _Dom();
        }
      }
      /**
      * @desc: parents
      * @return: 
      */
      parents(selector) {
        if (!this._elem) {
          return new _Dom();
        }
        var sel;
        if (selector)
          sel = new _Dom(selector);
        var nodes = [];
        var _thisLength = this.length ? this.length : 1;
        for (var i = 0; i < _thisLength; i++) {
          if (!this.get(i).parentNode) continue;
          var elem = this.get(i);
          while (elem.parentNode) {
            if (elem.parentNode == Window2 || elem.parentNode == Window2.document)
              break;
            if (!sel || sel._isElementIn(elem.parentNode)) {
              var j;
              for (j = 0; j < nodes.length; j++) {
                if (typeof nodes[j].isSameNode === "function") {
                  if (nodes[j].isSameNode(elem.parentNode)) {
                    break;
                  }
                } else {
                  if (nodes[j] === elem.parentNode) {
                    break;
                  }
                }
              }
              if (j >= nodes.length)
                nodes.push(elem.parentNode);
            }
            elem = elem.parentNode;
          }
        }
        var dom3 = new _Dom();
        if (nodes.length > 0) {
          dom3._elem = nodes;
          dom3._isArr = true;
          dom3.length = nodes.length;
          for (var i = 0; i < nodes.length; i++) {
            dom3._domtify(nodes[i]);
            dom3[i] = nodes[i];
          }
        }
        return dom3;
      }
      /**
       * children
       * @param {*} selector 
       */
      children(selector) {
        if (!this._elem) {
          return new _Dom();
        }
        var nodes = [];
        var _thisLength = this.length ? this.length : 1;
        for (var i = 0; i < _thisLength; i++) {
          var sel;
          if (selector)
            sel = _getElement(selector, this.get(i));
          else {
            sel = { _elem: [], _isarr: true };
            for (var j = 0; j < this.get(i).childNodes.length; j++) {
              sel._elem.push(this.get(i).childNodes[j]);
            }
          }
          if (!sel._elem)
            continue;
          if (sel._isarr) {
            nodes = nodes.concat(sel._elem);
          } else {
            nodes.push(sel._elem);
          }
        }
        var dom3 = new _Dom();
        dom3._elem = nodes;
        dom3._isArr = true;
        dom3.length = nodes.length;
        for (var i = 0; i < nodes.length; i++) {
          this._domtify(nodes[i]);
          dom3[i] = nodes[i];
        }
        return dom3;
      }
      /**
       * next
       * @param {*} selector 
       */
      next(selector) {
        if (!this._elem) {
          return new _Dom();
        }
        var dom3;
        if (selector) {
          dom3 = this.parent();
          dom3 = dom3.children(selector);
        }
        if (this._isArray()) {
          var nodes = [];
          var _thisLength = this.length ? this.length : 1;
          for (var i = 0; i < _thisLength; i++) {
            if (!dom3 || dom3._isElementIn(this.get(i).nextSibling)) {
              if (this.get(i).nextSibling)
                nodes.push(this.get(i).nextSibling);
            }
          }
          var dom1 = new _Dom();
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
          if (!dom3 || dom3._isElementIn(this._elem.nextSibling)) {
            if (this._elem.nextSibling)
              nodes = this._elem.nextSibling;
          }
          var dom1 = new _Dom();
          dom1._elem = nodes;
          dom1[0] = nodes;
          dom1._isArr = false;
          dom1.length = nodes ? 1 : 0;
          return dom1;
        }
      }
      /**
       * prev
       * @param {*} selector 
       */
      prev(selector) {
        if (!this._elem) {
          return new _Dom();
        }
        var dom3;
        if (selector) {
          dom3 = this.parent();
          dom3 = dom3.children(selector);
        }
        if (this._isArray()) {
          var nodes = [];
          var _thisLength = this.length ? this.length : 1;
          for (var i = 0; i < _thisLength; i++) {
            if (!dom3 || dom3._isElementIn(this.get(i).previousSibling)) {
              if (this.get(i).previousSibling)
                nodes.push(this.get(i).previousSibling);
            }
          }
          var dom1 = new _Dom();
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
          if (!dom3 || dom3._isElementIn(this._elem.previousSibling)) {
            if (this._elem.previousSibling)
              nodes = this._elem.previousSibling;
          }
          var dom1 = new _Dom();
          dom1._elem = nodes;
          dom1[0] = nodes;
          dom1._isArr = false;
          dom1.length = nodes ? 1 : 0;
          return dom1;
        }
      }
      /**
      * @desc: 遍历
      */
      each(cb) {
        if (cb) {
          for (var i = 0; i < this.length; i++) {
            cb(i, this.get(i));
          }
        }
      }
      // 将普通节点设置为Dom对象.
      _domtify(node) {
        if (node instanceof _Dom)
          return;
        if (node.__domtify)
          return;
        var _proto = Object.getPrototypeOf(this);
        for (var key in _proto) {
          if (key != "__proto__" && key != "constructor") {
            if (!node[key]) {
              node[key] = _proto[key].bind(node);
            }
          }
        }
        for (var key in CreateDom.fn) {
          if (key == "extend" || key == "fn") continue;
          if (typeof CreateDom.fn[key] === "function") {
            if (!node[key]) {
              node[key] = CreateDom.fn[key].bind(node);
            }
          }
        }
        node._isArr = false;
        node._elem = node;
        node.__domtify = true;
      }
      // 当前是否是数组.
      _isArray() {
        return this._isArr;
      }
      // 指定节点是否存在于本对象中.
      _isElementIn(node) {
        if (!this._elem) return false;
        var _thisLength = this.length ? this.length : 1;
        for (var i = 0; i < _thisLength; i++) {
          if (typeof this.get(i).isSameNode === "function") {
            if (this.get(i).isSameNode(node))
              return true;
          } else {
            if (this.get(i) === node)
              return true;
          }
        }
        return false;
      }
    };
    CreateDom = function(n) {
      return new Dom(n);
    };
    CreateDom.fn = {};
    CreateDom.extend = function(plugin) {
      if (arguments.length == 0)
        return {};
      if (arguments.length == 1) {
        for (var key in arguments[0]) {
          if (key == "extend" || key == "fn") continue;
          if (typeof arguments[0][key] === "function") {
            CreateDom[key] = arguments[0][key];
          }
        }
        return this;
      } else {
        if (arguments[0] === false)
          throw new Error("can't be false");
        var o = {};
        var i = 0;
        if (arguments[0] === true)
          i = 1;
        for (; i < arguments.length; i++) {
          o = utils3.mergeMap(o, arguments[i]);
        }
        return o;
      }
    };
    Dom.getViewPort = function() {
      if (Window2.document.compatMode == "BackCompat") {
        return {
          width: Window2.document.body.clientWidth,
          height: Window2.document.body.clientHeight
        };
      } else {
        return {
          width: Window2.document.documentElement.clientWidth,
          height: Window2.document.documentElement.clientHeight
        };
      }
    };
    Dom.getDocumentPort = function() {
      if (Window2.document.compatMode == "BackCompat") {
        return {
          width: Window2.document.body.scrollWidth,
          height: Window2.document.body.scrollHeight
        };
      } else {
        return {
          width: Math.max(Window2.document.documentElement.scrollWidth, Window2.document.documentElement.clientWidth),
          height: Math.max(Window2.document.documentElement.scrollHeight, Window2.document.documentElement.clientHeight)
        };
      }
    };
    Dom.getDocumentOffset = function() {
      var elementScrollLeft;
      var elementScrollTop;
      if (Window2.document.compatMode == "BackCompat") {
        elementScrollLeft = Window2.document.body.scrollLeft;
        elementScrollTop = Window2.document.body.scrollTop;
      } else {
        elementScrollLeft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
        elementScrollTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
      }
      return {
        top: elementScrollTop,
        left: elementScrollLeft
      };
    };
    Dom.getElementOffset = function(e) {
      if (!e) {
        return {};
      }
      var ee = CreateDom(e);
      ee = ee[0];
      if (ee) {
        if (typeof ee.getBoundingClientRect === "function") {
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
          if (Window2.document.compatMode == "BackCompat") {
            elementScrollLeft = Window2.document.body.scrollLeft;
            elementScrollTop = Window2.document.body.scrollTop;
          } else {
            elementScrollLeft = Window2.document.documentElement.scrollLeft == 0 ? Window2.document.body.scrollLeft : Window2.document.documentElement.scrollLeft;
            elementScrollTop = Window2.document.documentElement.scrollTop == 0 ? Window2.document.body.scrollTop : Window2.document.documentElement.scrollTop;
          }
          return {
            left: actualLeft - elementScrollLeft,
            top: actualTop - elementScrollTop
          };
        }
      }
      return {};
    };
    Dom.isDom = function(e) {
      return typeof HTMLElement === "object" ? e instanceof HTMLElement : e && typeof e === "object" && e.nodeType === 1 && typeof e.nodeName === "string";
    };
    Dom.removeEventListener = function(dom3, eventName, foo, useCapture) {
      if (!dom3) return;
      if (dom3.addEventListener) {
        dom3.removeEventListener(eventName, foo, useCapture);
      } else {
        dom3.detachEvent("on" + eventName, foo);
      }
    };
    Dom.addEventListener = function(dom3, eventName, foo, useCapture) {
      if (!dom3) return;
      if (dom3.addEventListener) {
        dom3.addEventListener(eventName, foo, useCapture);
      } else {
        dom3.attachEvent("on" + eventName, foo);
      }
    };
    exports.Dom = Dom;
    exports.CreateDom = CreateDom;
  }
});

// index.base.js
var index_base_exports = {};
__export(index_base_exports, {
  $: () => $,
  __debug: () => __debug,
  crypt: () => crypt,
  date: () => date,
  dom: () => dom,
  exception: () => exception,
  net: () => net,
  string: () => string,
  utils: () => utils
});
var Window, animationFrame, _date, _utils, _string, _crypt, _cryptMd5, _cryptSha1, _net, _dom, _exception, febs, __debug, date, utils, string, crypt, net, $, dom, exception;
var init_index_base = __esm({
  "index.base.js"() {
    Window = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : void 0;
    if (!Window.__line) {
      Window.__line = void 0;
      Window.__column = void 0;
    }
    require_promise_finally_polyfill();
    animationFrame = require_animationFrame();
    _date = require_date2();
    _utils = require_utils2();
    _string = require_string2();
    _crypt = require_crypt2();
    _cryptMd5 = require_crypt_md5();
    _cryptSha1 = require_crypt_sha1();
    _net = require_net();
    _dom = require_dom();
    _exception = require_exception();
    if (!Window["__debug"]) {
      Window.__debug = false;
    }
    if (!Window["requestAnimationFrame"])
      Window.requestAnimationFrame = animationFrame.requestAnimationFrame;
    if (!Window["cancelAnimationFrame"])
      Window.cancelAnimationFrame = animationFrame.cancelAnimationFrame;
    febs = {};
    febs.__debug = Window.__debug;
    febs.date = _date;
    febs.utils = _utils;
    febs.string = _string;
    febs.crypt = febs.utils.mergeMap(_crypt, _cryptMd5, _cryptSha1);
    febs.net = _net;
    febs["$"] = _dom.CreateDom;
    febs.dom = _dom.Dom;
    febs.exception = _exception;
    if (!Window["febs"])
      Window["febs"] = febs;
    else {
      Window["febs"].string = Window["febs"].string ? febs.utils.mergeMap(Window["febs"].string, febs.string) : febs.string;
      Window["febs"].crypt = Window["febs"].crypt ? febs.utils.mergeMap(Window["febs"].crypt, febs.crypt) : febs.crypt;
      Window["febs"].utils = Window["febs"].utils ? febs.utils.mergeMap(Window["febs"].utils, febs.utils) : febs.utils;
      Window["febs"].net = Window["febs"].net ? febs.utils.mergeMap(Window["febs"].net, febs.net) : febs.net;
      Window["febs"].dom = Window["febs"].dom ? febs.utils.mergeMap(Window["febs"].dom, febs.dom) : febs.dom;
      Window["febs"].exception = Window["febs"].exception ? febs.utils.mergeMap(Window["febs"].exception, febs.exception) : febs.exception;
    }
    if (!Window["$"])
      Window["$"] = febs["$"];
    if (!Window["jQuery"])
      Window["jQuery"] = febs["$"];
    if (Window.console) {
      Window.console.debug = function() {
        if (Window.__debug) {
          var logfoo;
          if (Window.console.warn)
            logfoo = Window.console.warn;
          else
            logfoo = Window.console.log;
          for (var i = 0; i < arguments.length; i++) {
            logfoo(arguments[i]);
          }
        }
      };
    }
    __debug = febs.__debug;
    date = febs.date;
    utils = febs.utils;
    string = febs.string;
    crypt = febs.crypt;
    net = febs.net;
    $ = febs["$"];
    dom = febs.dom;
    exception = febs.exception;
  }
});

// common/utils.bigint.native.js
var require_utils_bigint_native = __commonJS({
  "common/utils.bigint.native.js"(exports) {
    "use strict";
    var Window2 = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : void 0;
    function checkoutSupportBigint() {
      if (!Window2.hasOwnProperty("BigInt")) {
        throw new Error("Unsupport BigInt");
      }
    }
    var BigInt = Window2.BigInt;
    exports.bigint = function(v) {
      if (exports.bigint_check(v)) {
        return BigInt(v);
      } else {
        return Number.NaN;
      }
    };
    exports.bigint_check = function(v) {
      checkoutSupportBigint();
      if (Number.isInteger(v))
        return true;
      if (!v)
        return false;
      var typev = typeof v;
      if (typev === "string") {
        if (v.length > 22 || v.length < 1)
          return false;
        for (var j = 1; j < v.length; j++) {
          if (v[j] < "0" || v[j] > "9")
            return false;
        }
        if (v.length == 1) {
          if (v[0] < "0" || v[0] > "9")
            return false;
          else
            return true;
        }
        if (v[0] == "-") {
          if (v.length < 2 || v[1] < "1" || v[1] > "9")
            return false;
        } else {
          if (v[0] < "1" || v[0] > "9")
            return false;
        }
        return true;
      } else if (typev === "bigint") {
        return true;
      } else {
        return false;
      }
    };
    exports.bigint_add = function(a, b) {
      checkoutSupportBigint();
      return BigInt(a) + BigInt(b);
    };
    exports.bigint_minus = function(a, b) {
      checkoutSupportBigint();
      return BigInt(a) - BigInt(b);
    };
    exports.bigint_dividedBy = function(a, b) {
      checkoutSupportBigint();
      return BigInt(a) / BigInt(b);
    };
    exports.bigint_mul = function(a, b) {
      checkoutSupportBigint();
      return BigInt(a) * BigInt(b);
    };
    exports.bigint_equal = function(a, b) {
      checkoutSupportBigint();
      return BigInt(a) === BigInt(b);
    };
    exports.bigint_more_than = function(a, b) {
      checkoutSupportBigint();
      return BigInt(a) > BigInt(b);
    };
    exports.bigint_more_than_e = function(a, b) {
      checkoutSupportBigint();
      return BigInt(a) >= BigInt(b);
    };
    exports.bigint_less_than = function(a, b) {
      checkoutSupportBigint();
      return BigInt(a) < BigInt(b);
    };
    exports.bigint_less_than_e = function(a, b) {
      checkoutSupportBigint();
      return BigInt(a) <= BigInt(b);
    };
    exports.bigint_mod = function(a, b) {
      checkoutSupportBigint();
      return BigInt(a) % BigInt(b);
    };
    exports.bigint_toFixed = function(a, fixed) {
      checkoutSupportBigint();
      a = BigInt(a).toString();
      if (fixed > 0) {
        a += ".0";
      }
      return a;
    };
  }
});

// index.noBignumber.js
var febs2 = (init_index_base(), __toCommonJS(index_base_exports));
var _utilsBig = require_utils_bigint_native();
var __debug2 = febs2.__debug;
var date2 = febs2.date;
var utils2 = febs2.utils.mergeMap(febs2.utils, _utilsBig);
var string2 = febs2.string;
var crypt2 = febs2.crypt;
var net2 = febs2.net;
var $2 = febs2["$"];
var dom2 = febs2.dom;
var exception2 = febs2.exception;
export {
  $2 as $,
  __debug2 as __debug,
  crypt2 as crypt,
  date2 as date,
  dom2 as dom,
  exception2 as exception,
  net2 as net,
  string2 as string,
  utils2 as utils
};
//# sourceMappingURL=index.noBignumber.esm.js.map