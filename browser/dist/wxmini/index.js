/*!
 * febs-browser v1.3.0
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

// common/date.js
var require_date = __commonJS({
  "common/date.js"(exports) {
    "use strict";
    exports.isValidate = function(date2) {
      if (isNaN(date2) || !date2 || date2.toString() == "Invalid Date")
        return false;
      return date2 instanceof Date;
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
      var date2 = /* @__PURE__ */ new Date();
      date2.setFullYear(
        parseInt(strTime.substr(0, 4)),
        parseInt(strTime.substr(5, 2), 10) - 1,
        parseInt(strTime.substr(8, 2))
      );
      date2.setHours(
        parseInt(strTime.substr(11, 2)) || 0,
        parseInt(strTime.substr(14, 2)) || 0,
        parseInt(strTime.substr(17, 2)) || 0,
        0
      );
      return date2;
    };
    exports.getTime2 = function(strTime) {
      var date2 = /* @__PURE__ */ new Date();
      date2.setFullYear(
        parseInt(strTime.substr(0, 4)),
        parseInt(strTime.substr(4, 2), 10) - 1,
        parseInt(strTime.substr(6, 2))
      );
      date2.setHours(
        parseInt(strTime.substr(8, 2)) || 0,
        parseInt(strTime.substr(10, 2)) || 0,
        parseInt(strTime.substr(12, 2)) || 0,
        0
      );
      return date2;
    };
    exports.getDate = function(strDate) {
      var date2 = new Date(
        parseInt(strDate.substr(0, 4)),
        parseInt(strDate.substr(5, 2), 10) - 1,
        parseInt(strDate.substr(8, 2))
      );
      return date2;
    };
    exports.getDate2 = function(strDate) {
      var date2 = new Date(
        parseInt(strDate.substr(0, 4)),
        parseInt(strDate.substr(4, 2), 10) - 1,
        parseInt(strDate.substr(6, 2))
      );
      return date2;
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
      var date2 = /* @__PURE__ */ new Date();
      date2.setUTCFullYear(
        parseInt(strDateUTC.substr(0, 4)),
        parseInt(strDateUTC.substr(5, 2), 10) - 1,
        parseInt(strDateUTC.substr(8, 2))
      );
      date2.setUTCHours(0, 0, 0, 0);
      return date2;
    };
    exports.getDate2FromUTC = function(strDateUTC) {
      var date2 = /* @__PURE__ */ new Date();
      date2.setUTCFullYear(
        parseInt(strDateUTC.substr(0, 4)),
        parseInt(strDateUTC.substr(4, 2), 10) - 1,
        parseInt(strDateUTC.substr(6, 2))
      );
      date2.setUTCHours(0, 0, 0, 0);
      return date2;
    };
    exports.getTimeFromUTC = function(strTimeUTC) {
      var date2 = /* @__PURE__ */ new Date();
      date2.setUTCFullYear(
        parseInt(strTimeUTC.substr(0, 4)),
        parseInt(strTimeUTC.substr(5, 2), 10) - 1,
        parseInt(strTimeUTC.substr(8, 2))
      );
      date2.setUTCHours(
        parseInt(strTimeUTC.substr(11, 2)) || 0,
        parseInt(strTimeUTC.substr(14, 2)) || 0,
        parseInt(strTimeUTC.substr(17, 2)) || 0,
        0
      );
      return date2;
    };
    exports.getTime2FromUTC = function(strTimeUTC) {
      var date2 = /* @__PURE__ */ new Date();
      date2.setUTCFullYear(
        parseInt(strTimeUTC.substr(0, 4)),
        parseInt(strTimeUTC.substr(4, 2), 10) - 1,
        parseInt(strTimeUTC.substr(6, 2))
      );
      date2.setUTCHours(
        parseInt(strTimeUTC.substr(8, 2)) || 0,
        parseInt(strTimeUTC.substr(10, 2)) || 0,
        parseInt(strTimeUTC.substr(12, 2)) || 0,
        0
      );
      return date2;
    };
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
    exports.denodeify = function(fn, self, argumentCount) {
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
          var res = fn.apply(self, args);
          if (res && (typeof res === "object" || typeof res === "function") && typeof res.then === "function") {
            resolve(res);
          }
        });
      };
    };
    exports.promisify = exports.denodeify;
  }
});

// wxmini/libs/utils.js
var require_utils2 = __commonJS({
  "wxmini/libs/utils.js"(exports) {
    "use strict";
    var utils2 = require_utils();
    exports.sleep = utils2.sleep;
    exports.getTimeString = utils2.getTimeString;
    exports.getTimeStringFromNow = utils2.getTimeStringFromNow;
    exports.getDate = utils2.getDate;
    exports.getDate2 = utils2.getDate2;
    exports.mergeMap = utils2.mergeMap;
    exports.isNull = utils2.isNull;
    exports.denodeify = utils2.denodeify;
    exports.promisify = utils2.promisify;
    exports.browserIsIE = function() {
      return false;
    };
    exports.browserIEVer = function() {
      return Number.MAX_SAFE_INTEGER;
    };
    exports.browserIsSupportHtml5 = function() {
      if (typeof Worker !== "undefined") {
        return true;
      } else {
        return false;
      }
    };
    exports.browserIsMobile = function(userAgent) {
      return true;
    };
    exports.browserIsIOS = function() {
      let systemInfo = wx.getSystemInfoSync();
      if (systemInfo && systemInfo.platform == "ios") {
        return true;
      }
      return false;
    };
    exports.browserIsPhone = function(userAgent) {
      let systemInfo = wx.getSystemInfoSync();
      if (systemInfo && systemInfo.windowWidth <= 767) {
        return true;
      }
      return false;
    };
    exports.browserIsWeixin = function(userAgent) {
      return true;
    };
    exports.platformIsWindows = function(userAgent) {
      return false;
    };
    exports.platformIsMac = function(userAgent) {
      return false;
    };
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
    var crypt2 = require_crypt();
    function crc32(str, crc) {
      if (!crc) crc = 0;
      crc = crc ^ -1;
      for (var i = 0, iTop = str.length; i < iTop; i++) {
        crc = crc >>> 8 ^ crypt2.crc32_table[(crc ^ str.charCodeAt(i)) & 255];
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
    exports.base64_encode = crypt2.base64_encode;
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

// wxmini/libs/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  fetch: () => fetch
});
function fetch(url, option) {
  option = option || {};
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      header: option.headers,
      timeout: option.timeout,
      data: option.body,
      method: option.method ? option.method.toUpperCase() : void 0,
      success: (res) => {
        resolve(new FetchResponse(res.data, res.header, res.status));
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
var FetchResponse;
var init_fetch = __esm({
  "wxmini/libs/fetch.js"() {
    FetchResponse = class {
      constructor(data, headers, status) {
        this.data = data;
        this.headers = headers;
        this.status = status;
      }
      get statusText() {
        return this.status.toString();
      }
      blob() {
        return new Promise((resolve, reject) => {
          reject(new Error("unsupport fetch.blob"));
        });
      }
      json() {
        return new Promise((resolve, reject) => {
          let data;
          try {
            data = JSON.parse(this.data);
          } catch (e) {
            reject(e);
            return;
          }
          resolve(data);
        });
      }
      text() {
        return new Promise((resolve, reject) => {
          resolve(this.data);
        });
      }
    };
  }
});

// libs/date.js
var require_date2 = __commonJS({
  "libs/date.js"(exports) {
    "use strict";
    var date2 = require_date();
    exports.isValidate = date2.isValidate;
    exports.getDate = date2.getDate;
    exports.getDate2 = date2.getDate2;
    exports.getDate2FromUTC = date2.getDate2FromUTC;
    exports.getDateFromUTC = date2.getDateFromUTC;
    exports.getTime2FromUTC = date2.getTime2FromUTC;
    exports.getTimeString = date2.getTimeString;
    exports.getUTCTimeString = date2.getUTCTimeString;
    exports.getTimeStringFromNow = date2.getTimeStringFromNow;
    exports.getTimeFromUTC = date2.getTimeFromUTC;
    exports.getTime = date2.getTime;
    exports.getTime2 = date2.getTime2;
  }
});

// libs/string.js
var require_string2 = __commonJS({
  "libs/string.js"(exports) {
    "use strict";
    var string2 = require_string();
    exports.isPhoneMobile = string2.isPhoneMobile;
    exports.isEmpty = string2.isEmpty;
    exports.isEmail = string2.isEmail;
    exports.isAlphaOrDigit = string2.isAlphaOrDigit;
    exports.isChinese = string2.isChinese;
    exports.getByteSize = string2.getByteSize;
    exports.replace = string2.replace;
    exports.utf8ToBytes = string2.utf8ToBytes;
    exports.bytesToUtf8 = string2.bytesToUtf8;
    exports.utf8Encode = string2.utf8Encode;
    exports.utf8Decode = string2.utf8Decode;
    exports.trim = string2.trim;
    exports.escapeHtml = string2.escapeHtml;
  }
});

// common/exception.js
var require_exception = __commonJS({
  "common/exception.js"(exports, module2) {
    "use strict";
    module2.exports = class extends Error {
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

// wxmini/index.js
var wxmini_exports = {};
__export(wxmini_exports, {
  __debug: () => __debug,
  crypt: () => crypt,
  date: () => date,
  exception: () => exception,
  net: () => net,
  string: () => string,
  utils: () => utils
});
module.exports = __toCommonJS(wxmini_exports);
if (!global.__line) {
  global.__line = void 0;
  global.__column = void 0;
}
require_promise_finally_polyfill();
var febsutils = require_utils2();
var febscrypt = require_crypt2();
var cryptMd5 = require_crypt_md5();
var cryptSha1 = require_crypt_sha1();
var fetch2 = (init_fetch(), __toCommonJS(fetch_exports));
var date = require_date2();
var string = require_string2();
var exception = require_exception();
var __debug = false;
var crypt = febsutils.mergeMap(febscrypt, cryptMd5, cryptSha1);
var utils = febsutils.mergeMap(febsutils);
var net = {
  fetch: fetch2.fetch
};
