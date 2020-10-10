module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
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

exports.utf8Encode = function utf8Encode(str) {
  var x,
      y,
      output = '',
      i = -1,
      l;

  if (str && str.length) {
    l = str.length;
    while ((i += 1) < l) {
      /* Decode utf-16 surrogate pairs */
      x = str.charCodeAt(i);
      y = i + 1 < l ? str.charCodeAt(i + 1) : 0;
      if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
        x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
        i += 1;
      }
      /* Encode output as utf-8 */
      if (x <= 0x7F) {
        output += String.fromCharCode(x);
      } else if (x <= 0x7FF) {
        output += String.fromCharCode(0xC0 | x >>> 6 & 0x1F, 0x80 | x & 0x3F);
      } else if (x <= 0xFFFF) {
        output += String.fromCharCode(0xE0 | x >>> 12 & 0x0F, 0x80 | x >>> 6 & 0x3F, 0x80 | x & 0x3F);
      } else if (x <= 0x1FFFFF) {
        output += String.fromCharCode(0xF0 | x >>> 18 & 0x07, 0x80 | x >>> 12 & 0x3F, 0x80 | x >>> 6 & 0x3F, 0x80 | x & 0x3F);
      }
    }
  }
  return output;
};

exports.utf8Decode = function utf8Decode(str) {
  var i,
      ac,
      c1,
      c2,
      c3,
      arr = [],
      l;
  i = ac = c1 = c2 = c3 = 0;

  if (str && str.length) {
    l = str.length;
    str += '';

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
  return arr.join('');
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

/* bignumber.js v4.1.0 https://github.com/MikeMcl/bignumber.js/LICENCE */
!function (e) {
  "use strict";

  function n(e) {
    function a(e, n) {
      var t,
          r,
          i,
          o,
          u,
          s,
          l = this;if (!(l instanceof a)) return z && x(26, "constructor call without new", e), new a(e, n);if (null != n && V(n, 2, 64, C, "base")) {
        if (n = 0 | n, s = e + "", 10 == n) return l = new a(e instanceof a ? e : s), I(l, B + l.e + 1, P);if ((o = "number" == typeof e) && 0 * e != 0 || !new RegExp("^-?" + (t = "[" + v.slice(0, n) + "]+") + "(?:\\." + t + ")?$", 37 > n ? "i" : "").test(s)) return U(l, s, o, n);o ? (l.s = 0 > 1 / e ? (s = s.slice(1), -1) : 1, z && s.replace(/^0\.0*|\./, "").length > 15 && x(C, w, e), o = !1) : l.s = 45 === s.charCodeAt(0) ? (s = s.slice(1), -1) : 1, s = A(s, 10, n, l.s);
      } else {
        if (e instanceof a) return l.s = e.s, l.e = e.e, l.c = (e = e.c) ? e.slice() : e, void (C = 0);if ((o = "number" == typeof e) && 0 * e == 0) {
          if (l.s = 0 > 1 / e ? (e = -e, -1) : 1, e === ~~e) {
            for (r = 0, i = e; i >= 10; i /= 10, r++) {}return l.e = r, l.c = [e], void (C = 0);
          }s = e + "";
        } else {
          if (!h.test(s = e + "")) return U(l, s, o);l.s = 45 === s.charCodeAt(0) ? (s = s.slice(1), -1) : 1;
        }
      }for ((r = s.indexOf(".")) > -1 && (s = s.replace(".", "")), (i = s.search(/e/i)) > 0 ? (0 > r && (r = i), r += +s.slice(i + 1), s = s.substring(0, i)) : 0 > r && (r = s.length), i = 0; 48 === s.charCodeAt(i); i++) {}for (u = s.length; 48 === s.charCodeAt(--u);) {}if (s = s.slice(i, u + 1)) {
        if (u = s.length, o && z && u > 15 && (e > y || e !== p(e)) && x(C, w, l.s * e), r = r - i - 1, r > G) l.c = l.e = null;else if ($ > r) l.c = [l.e = 0];else {
          if (l.e = r, l.c = [], i = (r + 1) % b, 0 > r && (i += b), u > i) {
            for (i && l.c.push(+s.slice(0, i)), u -= b; u > i;) {
              l.c.push(+s.slice(i, i += b));
            }s = s.slice(i), i = b - s.length;
          } else i -= u;for (; i--; s += "0") {}l.c.push(+s);
        }
      } else l.c = [l.e = 0];C = 0;
    }function A(e, n, t, i) {
      var o,
          u,
          l,
          f,
          h,
          g,
          p,
          d = e.indexOf("."),
          m = B,
          w = P;for (37 > t && (e = e.toLowerCase()), d >= 0 && (l = W, W = 0, e = e.replace(".", ""), p = new a(t), h = p.pow(e.length - d), W = l, p.c = s(c(r(h.c), h.e), 10, n), p.e = p.c.length), g = s(e, t, n), u = l = g.length; 0 == g[--l]; g.pop()) {}if (!g[0]) return "0";if (0 > d ? --u : (h.c = g, h.e = u, h.s = i, h = L(h, p, m, w, n), g = h.c, f = h.r, u = h.e), o = u + m + 1, d = g[o], l = n / 2, f = f || 0 > o || null != g[o + 1], f = 4 > w ? (null != d || f) && (0 == w || w == (h.s < 0 ? 3 : 2)) : d > l || d == l && (4 == w || f || 6 == w && 1 & g[o - 1] || w == (h.s < 0 ? 8 : 7)), 1 > o || !g[0]) e = f ? c("1", -m) : "0";else {
        if (g.length = o, f) for (--n; ++g[--o] > n;) {
          g[o] = 0, o || (++u, g = [1].concat(g));
        }for (l = g.length; !g[--l];) {}for (d = 0, e = ""; l >= d; e += v.charAt(g[d++])) {}e = c(e, u);
      }return e;
    }function E(e, n, t, i) {
      var o, u, s, f, h;if (t = null != t && V(t, 0, 8, i, m) ? 0 | t : P, !e.c) return e.toString();if (o = e.c[0], s = e.e, null == n) h = r(e.c), h = 19 == i || 24 == i && q >= s ? l(h, s) : c(h, s);else if (e = I(new a(e), n, t), u = e.e, h = r(e.c), f = h.length, 19 == i || 24 == i && (u >= n || q >= u)) {
        for (; n > f; h += "0", f++) {}h = l(h, u);
      } else if (n -= s, h = c(h, u), u + 1 > f) {
        if (--n > 0) for (h += "."; n--; h += "0") {}
      } else if (n += u - f, n > 0) for (u + 1 == f && (h += "."); n--; h += "0") {}return e.s < 0 && o ? "-" + h : h;
    }function D(e, n) {
      var t,
          r,
          i = 0;for (u(e[0]) && (e = e[0]), t = new a(e[0]); ++i < e.length;) {
        if (r = new a(e[i]), !r.s) {
          t = r;break;
        }n.call(t, r) && (t = r);
      }return t;
    }function F(e, n, t, r, i) {
      return (n > e || e > t || e != f(e)) && x(r, (i || "decimal places") + (n > e || e > t ? " out of range" : " not an integer"), e), !0;
    }function _(e, n, t) {
      for (var r = 1, i = n.length; !n[--i]; n.pop()) {}for (i = n[0]; i >= 10; i /= 10, r++) {}return (t = r + t * b - 1) > G ? e.c = e.e = null : $ > t ? e.c = [e.e = 0] : (e.e = t, e.c = n), e;
    }function x(e, n, t) {
      var r = new Error(["new BigNumber", "cmp", "config", "div", "divToInt", "eq", "gt", "gte", "lt", "lte", "minus", "mod", "plus", "precision", "random", "round", "shift", "times", "toDigits", "toExponential", "toFixed", "toFormat", "toFraction", "pow", "toPrecision", "toString", "BigNumber"][e] + "() " + n + ": " + t);throw r.name = "BigNumber Error", C = 0, r;
    }function I(e, n, t, r) {
      var i,
          o,
          u,
          s,
          l,
          c,
          f,
          a = e.c,
          h = O;if (a) {
        e: {
          for (i = 1, s = a[0]; s >= 10; s /= 10, i++) {}if (o = n - i, 0 > o) o += b, u = n, l = a[c = 0], f = l / h[i - u - 1] % 10 | 0;else if (c = g((o + 1) / b), c >= a.length) {
            if (!r) break e;for (; a.length <= c; a.push(0)) {}l = f = 0, i = 1, o %= b, u = o - b + 1;
          } else {
            for (l = s = a[c], i = 1; s >= 10; s /= 10, i++) {}o %= b, u = o - b + i, f = 0 > u ? 0 : l / h[i - u - 1] % 10 | 0;
          }if (r = r || 0 > n || null != a[c + 1] || (0 > u ? l : l % h[i - u - 1]), r = 4 > t ? (f || r) && (0 == t || t == (e.s < 0 ? 3 : 2)) : f > 5 || 5 == f && (4 == t || r || 6 == t && (o > 0 ? u > 0 ? l / h[i - u] : 0 : a[c - 1]) % 10 & 1 || t == (e.s < 0 ? 8 : 7)), 1 > n || !a[0]) return a.length = 0, r ? (n -= e.e + 1, a[0] = h[(b - n % b) % b], e.e = -n || 0) : a[0] = e.e = 0, e;if (0 == o ? (a.length = c, s = 1, c--) : (a.length = c + 1, s = h[b - o], a[c] = u > 0 ? p(l / h[i - u] % h[u]) * s : 0), r) for (;;) {
            if (0 == c) {
              for (o = 1, u = a[0]; u >= 10; u /= 10, o++) {}for (u = a[0] += s, s = 1; u >= 10; u /= 10, s++) {}o != s && (e.e++, a[0] == N && (a[0] = 1));break;
            }if (a[c] += s, a[c] != N) break;a[c--] = 0, s = 1;
          }for (o = a.length; 0 === a[--o]; a.pop()) {}
        }e.e > G ? e.c = e.e = null : e.e < $ && (e.c = [e.e = 0]);
      }return e;
    }var L,
        U,
        C = 0,
        M = a.prototype,
        T = new a(1),
        B = 20,
        P = 4,
        q = -7,
        k = 21,
        $ = -1e7,
        G = 1e7,
        z = !0,
        V = F,
        j = !1,
        H = 1,
        W = 0,
        J = { decimalSeparator: ".", groupSeparator: ",", groupSize: 3, secondaryGroupSize: 0, fractionGroupSeparator: " ", fractionGroupSize: 0 };return a.another = n, a.ROUND_UP = 0, a.ROUND_DOWN = 1, a.ROUND_CEIL = 2, a.ROUND_FLOOR = 3, a.ROUND_HALF_UP = 4, a.ROUND_HALF_DOWN = 5, a.ROUND_HALF_EVEN = 6, a.ROUND_HALF_CEIL = 7, a.ROUND_HALF_FLOOR = 8, a.EUCLID = 9, a.config = a.set = function () {
      var e,
          n,
          t = 0,
          r = {},
          i = arguments,
          s = i[0],
          l = s && "object" == (typeof s === "undefined" ? "undefined" : _typeof(s)) ? function () {
        return s.hasOwnProperty(n) ? null != (e = s[n]) : void 0;
      } : function () {
        return i.length > t ? null != (e = i[t++]) : void 0;
      };return l(n = "DECIMAL_PLACES") && V(e, 0, S, 2, n) && (B = 0 | e), r[n] = B, l(n = "ROUNDING_MODE") && V(e, 0, 8, 2, n) && (P = 0 | e), r[n] = P, l(n = "EXPONENTIAL_AT") && (u(e) ? V(e[0], -S, 0, 2, n) && V(e[1], 0, S, 2, n) && (q = 0 | e[0], k = 0 | e[1]) : V(e, -S, S, 2, n) && (q = -(k = 0 | (0 > e ? -e : e)))), r[n] = [q, k], l(n = "RANGE") && (u(e) ? V(e[0], -S, -1, 2, n) && V(e[1], 1, S, 2, n) && ($ = 0 | e[0], G = 0 | e[1]) : V(e, -S, S, 2, n) && (0 | e ? $ = -(G = 0 | (0 > e ? -e : e)) : z && x(2, n + " cannot be zero", e))), r[n] = [$, G], l(n = "ERRORS") && (e === !!e || 1 === e || 0 === e ? (C = 0, V = (z = !!e) ? F : o) : z && x(2, n + d, e)), r[n] = z, l(n = "CRYPTO") && (e === !0 || e === !1 || 1 === e || 0 === e ? e ? (e = "undefined" == typeof crypto, !e && crypto && (crypto.getRandomValues || crypto.randomBytes) ? j = !0 : z ? x(2, "crypto unavailable", e ? void 0 : crypto) : j = !1) : j = !1 : z && x(2, n + d, e)), r[n] = j, l(n = "MODULO_MODE") && V(e, 0, 9, 2, n) && (H = 0 | e), r[n] = H, l(n = "POW_PRECISION") && V(e, 0, S, 2, n) && (W = 0 | e), r[n] = W, l(n = "FORMAT") && ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? J = e : z && x(2, n + " not an object", e)), r[n] = J, r;
    }, a.max = function () {
      return D(arguments, M.lt);
    }, a.min = function () {
      return D(arguments, M.gt);
    }, a.random = function () {
      var e = 9007199254740992,
          n = Math.random() * e & 2097151 ? function () {
        return p(Math.random() * e);
      } : function () {
        return 8388608 * (1073741824 * Math.random() | 0) + (8388608 * Math.random() | 0);
      };return function (e) {
        var t,
            r,
            i,
            o,
            u,
            s = 0,
            l = [],
            c = new a(T);if (e = null != e && V(e, 0, S, 14) ? 0 | e : B, o = g(e / b), j) if (crypto.getRandomValues) {
          for (t = crypto.getRandomValues(new Uint32Array(o *= 2)); o > s;) {
            u = 131072 * t[s] + (t[s + 1] >>> 11), u >= 9e15 ? (r = crypto.getRandomValues(new Uint32Array(2)), t[s] = r[0], t[s + 1] = r[1]) : (l.push(u % 1e14), s += 2);
          }s = o / 2;
        } else if (crypto.randomBytes) {
          for (t = crypto.randomBytes(o *= 7); o > s;) {
            u = 281474976710656 * (31 & t[s]) + 1099511627776 * t[s + 1] + 4294967296 * t[s + 2] + 16777216 * t[s + 3] + (t[s + 4] << 16) + (t[s + 5] << 8) + t[s + 6], u >= 9e15 ? crypto.randomBytes(7).copy(t, s) : (l.push(u % 1e14), s += 7);
          }s = o / 7;
        } else j = !1, z && x(14, "crypto unavailable", crypto);if (!j) for (; o > s;) {
          u = n(), 9e15 > u && (l[s++] = u % 1e14);
        }for (o = l[--s], e %= b, o && e && (u = O[b - e], l[s] = p(o / u) * u); 0 === l[s]; l.pop(), s--) {}if (0 > s) l = [i = 0];else {
          for (i = -1; 0 === l[0]; l.splice(0, 1), i -= b) {}for (s = 1, u = l[0]; u >= 10; u /= 10, s++) {}b > s && (i -= b - s);
        }return c.e = i, c.c = l, c;
      };
    }(), L = function () {
      function e(e, n, t) {
        var r,
            i,
            o,
            u,
            s = 0,
            l = e.length,
            c = n % R,
            f = n / R | 0;for (e = e.slice(); l--;) {
          o = e[l] % R, u = e[l] / R | 0, r = f * o + u * c, i = c * o + r % R * R + s, s = (i / t | 0) + (r / R | 0) + f * u, e[l] = i % t;
        }return s && (e = [s].concat(e)), e;
      }function n(e, n, t, r) {
        var i, o;if (t != r) o = t > r ? 1 : -1;else for (i = o = 0; t > i; i++) {
          if (e[i] != n[i]) {
            o = e[i] > n[i] ? 1 : -1;break;
          }
        }return o;
      }function r(e, n, t, r) {
        for (var i = 0; t--;) {
          e[t] -= i, i = e[t] < n[t] ? 1 : 0, e[t] = i * r + e[t] - n[t];
        }for (; !e[0] && e.length > 1; e.splice(0, 1)) {}
      }return function (i, o, u, s, l) {
        var c,
            f,
            h,
            g,
            d,
            m,
            w,
            v,
            y,
            O,
            R,
            S,
            A,
            E,
            D,
            F,
            _,
            x = i.s == o.s ? 1 : -1,
            L = i.c,
            U = o.c;if (!(L && L[0] && U && U[0])) return new a(i.s && o.s && (L ? !U || L[0] != U[0] : U) ? L && 0 == L[0] || !U ? 0 * x : x / 0 : NaN);for (v = new a(x), y = v.c = [], f = i.e - o.e, x = u + f + 1, l || (l = N, f = t(i.e / b) - t(o.e / b), x = x / b | 0), h = 0; U[h] == (L[h] || 0); h++) {}if (U[h] > (L[h] || 0) && f--, 0 > x) y.push(1), g = !0;else {
          for (E = L.length, F = U.length, h = 0, x += 2, d = p(l / (U[0] + 1)), d > 1 && (U = e(U, d, l), L = e(L, d, l), F = U.length, E = L.length), A = F, O = L.slice(0, F), R = O.length; F > R; O[R++] = 0) {}_ = U.slice(), _ = [0].concat(_), D = U[0], U[1] >= l / 2 && D++;do {
            if (d = 0, c = n(U, O, F, R), 0 > c) {
              if (S = O[0], F != R && (S = S * l + (O[1] || 0)), d = p(S / D), d > 1) for (d >= l && (d = l - 1), m = e(U, d, l), w = m.length, R = O.length; 1 == n(m, O, w, R);) {
                d--, r(m, w > F ? _ : U, w, l), w = m.length, c = 1;
              } else 0 == d && (c = d = 1), m = U.slice(), w = m.length;if (R > w && (m = [0].concat(m)), r(O, m, R, l), R = O.length, -1 == c) for (; n(U, O, F, R) < 1;) {
                d++, r(O, R > F ? _ : U, R, l), R = O.length;
              }
            } else 0 === c && (d++, O = [0]);y[h++] = d, O[0] ? O[R++] = L[A] || 0 : (O = [L[A]], R = 1);
          } while ((A++ < E || null != O[0]) && x--);g = null != O[0], y[0] || y.splice(0, 1);
        }if (l == N) {
          for (h = 1, x = y[0]; x >= 10; x /= 10, h++) {}I(v, u + (v.e = h + f * b - 1) + 1, s, g);
        } else v.e = f, v.r = +g;return v;
      };
    }(), U = function () {
      var e = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
          n = /^([^.]+)\.$/,
          t = /^\.([^.]+)$/,
          r = /^-?(Infinity|NaN)$/,
          i = /^\s*\+(?=[\w.])|^\s+|\s+$/g;return function (o, u, s, l) {
        var c,
            f = s ? u : u.replace(i, "");if (r.test(f)) o.s = isNaN(f) ? null : 0 > f ? -1 : 1;else {
          if (!s && (f = f.replace(e, function (e, n, t) {
            return c = "x" == (t = t.toLowerCase()) ? 16 : "b" == t ? 2 : 8, l && l != c ? e : n;
          }), l && (c = l, f = f.replace(n, "$1").replace(t, "0.$1")), u != f)) return new a(f, c);z && x(C, "not a" + (l ? " base " + l : "") + " number", u), o.s = null;
        }o.c = o.e = null, C = 0;
      };
    }(), M.absoluteValue = M.abs = function () {
      var e = new a(this);return e.s < 0 && (e.s = 1), e;
    }, M.ceil = function () {
      return I(new a(this), this.e + 1, 2);
    }, M.comparedTo = M.cmp = function (e, n) {
      return C = 1, i(this, new a(e, n));
    }, M.decimalPlaces = M.dp = function () {
      var e,
          n,
          r = this.c;if (!r) return null;if (e = ((n = r.length - 1) - t(this.e / b)) * b, n = r[n]) for (; n % 10 == 0; n /= 10, e--) {}return 0 > e && (e = 0), e;
    }, M.dividedBy = M.div = function (e, n) {
      return C = 3, L(this, new a(e, n), B, P);
    }, M.dividedToIntegerBy = M.divToInt = function (e, n) {
      return C = 4, L(this, new a(e, n), 0, 1);
    }, M.equals = M.eq = function (e, n) {
      return C = 5, 0 === i(this, new a(e, n));
    }, M.floor = function () {
      return I(new a(this), this.e + 1, 3);
    }, M.greaterThan = M.gt = function (e, n) {
      return C = 6, i(this, new a(e, n)) > 0;
    }, M.greaterThanOrEqualTo = M.gte = function (e, n) {
      return C = 7, 1 === (n = i(this, new a(e, n))) || 0 === n;
    }, M.isFinite = function () {
      return !!this.c;
    }, M.isInteger = M.isInt = function () {
      return !!this.c && t(this.e / b) > this.c.length - 2;
    }, M.isNaN = function () {
      return !this.s;
    }, M.isNegative = M.isNeg = function () {
      return this.s < 0;
    }, M.isZero = function () {
      return !!this.c && 0 == this.c[0];
    }, M.lessThan = M.lt = function (e, n) {
      return C = 8, i(this, new a(e, n)) < 0;
    }, M.lessThanOrEqualTo = M.lte = function (e, n) {
      return C = 9, -1 === (n = i(this, new a(e, n))) || 0 === n;
    }, M.minus = M.sub = function (e, n) {
      var r,
          i,
          o,
          u,
          s = this,
          l = s.s;if (C = 10, e = new a(e, n), n = e.s, !l || !n) return new a(NaN);if (l != n) return e.s = -n, s.plus(e);var c = s.e / b,
          f = e.e / b,
          h = s.c,
          g = e.c;if (!c || !f) {
        if (!h || !g) return h ? (e.s = -n, e) : new a(g ? s : NaN);if (!h[0] || !g[0]) return g[0] ? (e.s = -n, e) : new a(h[0] ? s : 3 == P ? -0 : 0);
      }if (c = t(c), f = t(f), h = h.slice(), l = c - f) {
        for ((u = 0 > l) ? (l = -l, o = h) : (f = c, o = g), o.reverse(), n = l; n--; o.push(0)) {}o.reverse();
      } else for (i = (u = (l = h.length) < (n = g.length)) ? l : n, l = n = 0; i > n; n++) {
        if (h[n] != g[n]) {
          u = h[n] < g[n];break;
        }
      }if (u && (o = h, h = g, g = o, e.s = -e.s), n = (i = g.length) - (r = h.length), n > 0) for (; n--; h[r++] = 0) {}for (n = N - 1; i > l;) {
        if (h[--i] < g[i]) {
          for (r = i; r && !h[--r]; h[r] = n) {}--h[r], h[i] += N;
        }h[i] -= g[i];
      }for (; 0 == h[0]; h.splice(0, 1), --f) {}return h[0] ? _(e, h, f) : (e.s = 3 == P ? -1 : 1, e.c = [e.e = 0], e);
    }, M.modulo = M.mod = function (e, n) {
      var t,
          r,
          i = this;return C = 11, e = new a(e, n), !i.c || !e.s || e.c && !e.c[0] ? new a(NaN) : !e.c || i.c && !i.c[0] ? new a(i) : (9 == H ? (r = e.s, e.s = 1, t = L(i, e, 0, 3), e.s = r, t.s *= r) : t = L(i, e, 0, H), i.minus(t.times(e)));
    }, M.negated = M.neg = function () {
      var e = new a(this);return e.s = -e.s || null, e;
    }, M.plus = M.add = function (e, n) {
      var r,
          i = this,
          o = i.s;if (C = 12, e = new a(e, n), n = e.s, !o || !n) return new a(NaN);if (o != n) return e.s = -n, i.minus(e);var u = i.e / b,
          s = e.e / b,
          l = i.c,
          c = e.c;if (!u || !s) {
        if (!l || !c) return new a(o / 0);if (!l[0] || !c[0]) return c[0] ? e : new a(l[0] ? i : 0 * o);
      }if (u = t(u), s = t(s), l = l.slice(), o = u - s) {
        for (o > 0 ? (s = u, r = c) : (o = -o, r = l), r.reverse(); o--; r.push(0)) {}r.reverse();
      }for (o = l.length, n = c.length, 0 > o - n && (r = c, c = l, l = r, n = o), o = 0; n;) {
        o = (l[--n] = l[n] + c[n] + o) / N | 0, l[n] = N === l[n] ? 0 : l[n] % N;
      }return o && (l = [o].concat(l), ++s), _(e, l, s);
    }, M.precision = M.sd = function (e) {
      var n,
          t,
          r = this,
          i = r.c;if (null != e && e !== !!e && 1 !== e && 0 !== e && (z && x(13, "argument" + d, e), e != !!e && (e = null)), !i) return null;if (t = i.length - 1, n = t * b + 1, t = i[t]) {
        for (; t % 10 == 0; t /= 10, n--) {}for (t = i[0]; t >= 10; t /= 10, n++) {}
      }return e && r.e + 1 > n && (n = r.e + 1), n;
    }, M.round = function (e, n) {
      var t = new a(this);return (null == e || V(e, 0, S, 15)) && I(t, ~~e + this.e + 1, null != n && V(n, 0, 8, 15, m) ? 0 | n : P), t;
    }, M.shift = function (e) {
      var n = this;return V(e, -y, y, 16, "argument") ? n.times("1e" + f(e)) : new a(n.c && n.c[0] && (-y > e || e > y) ? n.s * (0 > e ? 0 : 1 / 0) : n);
    }, M.squareRoot = M.sqrt = function () {
      var e,
          n,
          i,
          o,
          u,
          s = this,
          l = s.c,
          c = s.s,
          f = s.e,
          h = B + 4,
          g = new a("0.5");if (1 !== c || !l || !l[0]) return new a(!c || 0 > c && (!l || l[0]) ? NaN : l ? s : 1 / 0);if (c = Math.sqrt(+s), 0 == c || c == 1 / 0 ? (n = r(l), (n.length + f) % 2 == 0 && (n += "0"), c = Math.sqrt(n), f = t((f + 1) / 2) - (0 > f || f % 2), c == 1 / 0 ? n = "1e" + f : (n = c.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + f), i = new a(n)) : i = new a(c + ""), i.c[0]) for (f = i.e, c = f + h, 3 > c && (c = 0);;) {
        if (u = i, i = g.times(u.plus(L(s, u, h, 1))), r(u.c).slice(0, c) === (n = r(i.c)).slice(0, c)) {
          if (i.e < f && --c, n = n.slice(c - 3, c + 1), "9999" != n && (o || "4999" != n)) {
            (!+n || !+n.slice(1) && "5" == n.charAt(0)) && (I(i, i.e + B + 2, 1), e = !i.times(i).eq(s));break;
          }if (!o && (I(u, u.e + B + 2, 0), u.times(u).eq(s))) {
            i = u;break;
          }h += 4, c += 4, o = 1;
        }
      }return I(i, i.e + B + 1, P, e);
    }, M.times = M.mul = function (e, n) {
      var r,
          i,
          o,
          u,
          s,
          l,
          c,
          f,
          h,
          g,
          p,
          d,
          m,
          w,
          v,
          y = this,
          O = y.c,
          S = (C = 17, e = new a(e, n)).c;if (!(O && S && O[0] && S[0])) return !y.s || !e.s || O && !O[0] && !S || S && !S[0] && !O ? e.c = e.e = e.s = null : (e.s *= y.s, O && S ? (e.c = [0], e.e = 0) : e.c = e.e = null), e;for (i = t(y.e / b) + t(e.e / b), e.s *= y.s, c = O.length, g = S.length, g > c && (m = O, O = S, S = m, o = c, c = g, g = o), o = c + g, m = []; o--; m.push(0)) {}for (w = N, v = R, o = g; --o >= 0;) {
        for (r = 0, p = S[o] % v, d = S[o] / v | 0, s = c, u = o + s; u > o;) {
          f = O[--s] % v, h = O[s] / v | 0, l = d * f + h * p, f = p * f + l % v * v + m[u] + r, r = (f / w | 0) + (l / v | 0) + d * h, m[u--] = f % w;
        }m[u] = r;
      }return r ? ++i : m.splice(0, 1), _(e, m, i);
    }, M.toDigits = function (e, n) {
      var t = new a(this);return e = null != e && V(e, 1, S, 18, "precision") ? 0 | e : null, n = null != n && V(n, 0, 8, 18, m) ? 0 | n : P, e ? I(t, e, n) : t;
    }, M.toExponential = function (e, n) {
      return E(this, null != e && V(e, 0, S, 19) ? ~~e + 1 : null, n, 19);
    }, M.toFixed = function (e, n) {
      return E(this, null != e && V(e, 0, S, 20) ? ~~e + this.e + 1 : null, n, 20);
    }, M.toFormat = function (e, n) {
      var t = E(this, null != e && V(e, 0, S, 21) ? ~~e + this.e + 1 : null, n, 21);if (this.c) {
        var r,
            i = t.split("."),
            o = +J.groupSize,
            u = +J.secondaryGroupSize,
            s = J.groupSeparator,
            l = i[0],
            c = i[1],
            f = this.s < 0,
            a = f ? l.slice(1) : l,
            h = a.length;if (u && (r = o, o = u, u = r, h -= r), o > 0 && h > 0) {
          for (r = h % o || o, l = a.substr(0, r); h > r; r += o) {
            l += s + a.substr(r, o);
          }u > 0 && (l += s + a.slice(r)), f && (l = "-" + l);
        }t = c ? l + J.decimalSeparator + ((u = +J.fractionGroupSize) ? c.replace(new RegExp("\\d{" + u + "}\\B", "g"), "$&" + J.fractionGroupSeparator) : c) : l;
      }return t;
    }, M.toFraction = function (e) {
      var n,
          t,
          i,
          o,
          u,
          s,
          l,
          c,
          f,
          h = z,
          g = this,
          p = g.c,
          d = new a(T),
          m = t = new a(T),
          w = l = new a(T);if (null != e && (z = !1, s = new a(e), z = h, (!(h = s.isInt()) || s.lt(T)) && (z && x(22, "max denominator " + (h ? "out of range" : "not an integer"), e), e = !h && s.c && I(s, s.e + 1, 1).gte(T) ? s : null)), !p) return g.toString();for (f = r(p), o = d.e = f.length - g.e - 1, d.c[0] = O[(u = o % b) < 0 ? b + u : u], e = !e || s.cmp(d) > 0 ? o > 0 ? d : m : s, u = G, G = 1 / 0, s = new a(f), l.c[0] = 0; c = L(s, d, 0, 1), i = t.plus(c.times(w)), 1 != i.cmp(e);) {
        t = w, w = i, m = l.plus(c.times(i = m)), l = i, d = s.minus(c.times(i = d)), s = i;
      }return i = L(e.minus(t), w, 0, 1), l = l.plus(i.times(m)), t = t.plus(i.times(w)), l.s = m.s = g.s, o *= 2, n = L(m, w, o, P).minus(g).abs().cmp(L(l, t, o, P).minus(g).abs()) < 1 ? [m.toString(), w.toString()] : [l.toString(), t.toString()], G = u, n;
    }, M.toNumber = function () {
      return +this;
    }, M.toPower = M.pow = function (e, n) {
      var t,
          r,
          i,
          o = p(0 > e ? -e : +e),
          u = this;if (null != n && (C = 23, n = new a(n)), !V(e, -y, y, 23, "exponent") && (!isFinite(e) || o > y && (e /= 0) || parseFloat(e) != e && !(e = NaN)) || 0 == e) return t = Math.pow(+u, e), new a(n ? t % n : t);for (n ? e > 1 && u.gt(T) && u.isInt() && n.gt(T) && n.isInt() ? u = u.mod(n) : (i = n, n = null) : W && (t = g(W / b + 2)), r = new a(T);;) {
        if (o % 2) {
          if (r = r.times(u), !r.c) break;t ? r.c.length > t && (r.c.length = t) : n && (r = r.mod(n));
        }if (o = p(o / 2), !o) break;u = u.times(u), t ? u.c && u.c.length > t && (u.c.length = t) : n && (u = u.mod(n));
      }return n ? r : (0 > e && (r = T.div(r)), i ? r.mod(i) : t ? I(r, W, P) : r);
    }, M.toPrecision = function (e, n) {
      return E(this, null != e && V(e, 1, S, 24, "precision") ? 0 | e : null, n, 24);
    }, M.toString = function (e) {
      var n,
          t = this,
          i = t.s,
          o = t.e;return null === o ? i ? (n = "Infinity", 0 > i && (n = "-" + n)) : n = "NaN" : (n = r(t.c), n = null != e && V(e, 2, 64, 25, "base") ? A(c(n, o), 0 | e, 10, i) : q >= o || o >= k ? l(n, o) : c(n, o), 0 > i && t.c[0] && (n = "-" + n)), n;
    }, M.truncated = M.trunc = function () {
      return I(new a(this), this.e + 1, 1);
    }, M.valueOf = M.toJSON = function () {
      var e,
          n = this,
          t = n.e;return null === t ? n.toString() : (e = r(n.c), e = q >= t || t >= k ? l(e, t) : c(e, t), n.s < 0 ? "-" + e : e);
    }, M.isBigNumber = !0, null != e && a.config(e), a;
  }function t(e) {
    var n = 0 | e;return e > 0 || e === n ? n : n - 1;
  }function r(e) {
    for (var n, t, r = 1, i = e.length, o = e[0] + ""; i > r;) {
      for (n = e[r++] + "", t = b - n.length; t--; n = "0" + n) {}o += n;
    }for (i = o.length; 48 === o.charCodeAt(--i);) {}return o.slice(0, i + 1 || 1);
  }function i(e, n) {
    var t,
        r,
        i = e.c,
        o = n.c,
        u = e.s,
        s = n.s,
        l = e.e,
        c = n.e;if (!u || !s) return null;if (t = i && !i[0], r = o && !o[0], t || r) return t ? r ? 0 : -s : u;if (u != s) return u;if (t = 0 > u, r = l == c, !i || !o) return r ? 0 : !i ^ t ? 1 : -1;if (!r) return l > c ^ t ? 1 : -1;for (s = (l = i.length) < (c = o.length) ? l : c, u = 0; s > u; u++) {
      if (i[u] != o[u]) return i[u] > o[u] ^ t ? 1 : -1;
    }return l == c ? 0 : l > c ^ t ? 1 : -1;
  }function o(e, n, t) {
    return (e = f(e)) >= n && t >= e;
  }function u(e) {
    return "[object Array]" == Object.prototype.toString.call(e);
  }function s(e, n, t) {
    for (var r, i, o = [0], u = 0, s = e.length; s > u;) {
      for (i = o.length; i--; o[i] *= n) {}for (o[r = 0] += v.indexOf(e.charAt(u++)); r < o.length; r++) {
        o[r] > t - 1 && (null == o[r + 1] && (o[r + 1] = 0), o[r + 1] += o[r] / t | 0, o[r] %= t);
      }
    }return o.reverse();
  }function l(e, n) {
    return (e.length > 1 ? e.charAt(0) + "." + e.slice(1) : e) + (0 > n ? "e" : "e+") + n;
  }function c(e, n) {
    var t, r;if (0 > n) {
      for (r = "0."; ++n; r += "0") {}e = r + e;
    } else if (t = e.length, ++n > t) {
      for (r = "0", n -= t; --n; r += "0") {}e += r;
    } else t > n && (e = e.slice(0, n) + "." + e.slice(n));return e;
  }function f(e) {
    return e = parseFloat(e), 0 > e ? g(e) : p(e);
  }var a,
      h = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
      g = Math.ceil,
      p = Math.floor,
      d = " not a boolean or binary digit",
      m = "rounding mode",
      w = "number type has more than 15 significant digits",
      v = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_",
      N = 1e14,
      b = 14,
      y = 9007199254740991,
      O = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
      R = 1e7,
      S = 1e9;a = n(), a["default"] = a.BigNumber = a,  true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
    return a;
  }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" != typeof module && module.exports ? module.exports = a : (e || (e = "undefined" != typeof self ? self : Function("return this")()), e.BigNumber = a);
}(undefined);
//# sourceMappingURL=bignumber.js.map

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


(function () {
  if (typeof Promise.prototype['finally'] === 'function') {
    return;
  }
  Promise.prototype['finally'] = function (fn) {
    return this.then(function (value) {
      return this.constructor.resolve(fn()).then(function () {
        return value;
      });
    })['catch'](function (reason) {
      return this.constructor.resolve(fn()).then(function () {
        throw reason;
      });
    });
  };
})();

/***/ }),
/* 4 */
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

var BigNumber = __webpack_require__(1);

/**
 * @desc: 进行bigint转换.
 */
exports.bigint = function (v) {
  if (exports.bigint_check(v)) {
    if (typeof v === 'string') {
      if (v.length >= 15) // 对千亿以上的数值使用bignumber.
        return new BigNumber(v);
      return Number(v);
    } else {
      return v;
    }
  } else {
    return Number.NaN;
  }
};

/**
 * @desc: 判断是否是bigint.
 */
exports.bigint_check = function (v) {
  if (Number.isInteger(v)) return true;
  if (!v) return false;

  var typev = typeof v === 'undefined' ? 'undefined' : _typeof(v);
  if (typev === 'string') {
    if (v.length > 22 || v.length < 1) return false;

    for (var j = 1; j < v.length; j++) {
      if (v[j] < '0' || v[j] > '9') return false;
    }

    if (v.length == 1) {
      if (v[0] < '0' || v[0] > '9') return false;else return true;
    }

    if (v[0] == '-') {
      if (v.length < 2 || v[1] < '1' || v[1] > '9') return false;
    } else {
      if (v[0] < '1' || v[0] > '9') return false;
    }

    return true;
  } else if (typev === 'object') {
    return !!v.isBigNumber;
  } else {
    return false;
  }
};

/**
* @desc: calc bigint
* @return: bigint.
*/
exports.bigint_add = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.plus(b);
};

exports.bigint_minus = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.minus(b);
};

exports.bigint_dividedBy = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.dividedBy(b);
};

exports.bigint_mul = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.times(b);
};

/**
* @desc: compare with bigint.
* @return: boolean.
*/
exports.bigint_equal = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.equals(b);
};

exports.bigint_more_than = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.greaterThan(b);
};

exports.bigint_more_than_e = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.greaterThanOrEqualTo(b);
};

exports.bigint_less_than = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.lessThan(b);
};

exports.bigint_less_than_e = function (a, b) {
  if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.lessThanOrEqualTo(b);
};

exports.bigint_mod = function (a, b) {
  if (Number.isInteger(a)) {
    if (Number.isInteger(b)) return a % b;else {
      return new BigNumber(a).mod(b);
    }
  }

  if (!(a instanceof BigNumber)) a = new BigNumber(a);
  return a.mod(b);
};

/**
* @desc: 转换bigint->string.
* @param fixed: 小数位个数, 默认为0.
* @return: string.
*/
exports.bigint_toFixed = function (a, fixed) {
  fixed = fixed || 0;if (!(a instanceof BigNumber)) a = new BigNumber(a);return a.toFixed(fixed);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 *  crc32(str, crc=null);
 *  crc32_file(file, function(crc32Value) {})
 */

var crypt = __webpack_require__(12);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var stringUtils = __webpack_require__(0);

function binl2rstr(input) {
  var i,
      l = input.length * 32,
      output = '';
  for (i = 0; i < l; i += 8) {
    output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xFF);
  }
  return output;
}

function bit_rol(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}

function rstr2binl(input) {
  var i,
      l = input.length * 8,
      output = Array(input.length >> 2),
      lo = output.length;
  for (i = 0; i < lo; i += 1) {
    output[i] = 0;
  }
  for (i = 0; i < l; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << i % 32;
  }
  return output;
}

function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF),
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xFFFF;
}

function hex(s) {
  var input = binl2rstr(binl(rstr2binl(s), s.length * 8));
  var hex_tab = '0123456789abcdef',
      output = '',
      x,
      i = 0,
      l = input.length;
  for (; i < l; i += 1) {
    x = input.charCodeAt(i);
    output += hex_tab.charAt(x >>> 4 & 0x0f) + hex_tab.charAt(x & 0x0f);
  }
  return output;
}

/**
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */

function binl(x, len) {
  var i,
      olda,
      oldb,
      oldc,
      oldd,
      a = 1732584193,
      b = -271733879,
      c = -1732584194,
      d = 271733878;

  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
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

/**
 * These functions implement the four basic operations the algorithm uses.
 */

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

exports.md5 = function (str) {
  return hex(stringUtils.utf8Encode(str));
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var stringUtils = __webpack_require__(0);

function binb2rstr(input) {
  var i,
      l = input.length * 32,
      output = '';
  for (i = 0; i < l; i += 8) {
    output += String.fromCharCode(input[i >> 5] >>> 24 - i % 32 & 0xff);
  }
  return output;
}

function bit_rol(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}

function safe_add(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff),
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
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
  var i,
      l = input.length * 8,
      output = Array(input.length >> 2),
      lo = output.length;
  for (i = 0; i < lo; i += 1) {
    output[i] = 0;
  }
  for (i = 0; i < l; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << 24 - i % 32;
  }
  return output;
}

function hex(s) {
  var input = binb2rstr(binb(rstr2binb(s), s.length * 8));
  var hex_tab = '0123456789abcdef',
      output = '',
      x,
      i = 0,
      l = input.length;
  for (; i < l; i += 1) {
    x = input.charCodeAt(i);
    output += hex_tab.charAt(x >>> 4 & 0x0f) + hex_tab.charAt(x & 0x0f);
  }
  return output;
}

function binb(x, len) {
  var i,
      j,
      t,
      olda,
      oldb,
      oldc,
      oldd,
      olde,
      w = Array(80),
      a = 1732584193,
      b = -271733879,
      c = -1732584194,
      d = 271733878,
      e = -1009589776;

  /* append padding */
  x[len >> 5] |= 0x80 << 24 - len % 32;
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
      t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
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

exports.sha1 = function (str) {
  return hex(stringUtils.utf8Encode(str));
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


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var string = __webpack_require__(0);

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
 * @desc: 判断是否是email.
 * @return: boolean.
 */
exports.isEmail = string.isEmail;

/**
 * @desc: 判断是否是英文数字组合.
 * @return: boolean.
 */
exports.isAlphaOrDigit = string.isAlphaOrDigit;

/**
 * @desc: 判断是否是中文.
 * @return: boolean.
 */
exports.isChinese = string.isChinese;

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

exports.utf8Encode = string.utf8Encode;
exports.utf8Decode = string.utf8Decode;

exports.trim = string.trim;

/**
* @desc: 对字符串中的 <> 标签进行转义为 &lt;, &gt;
* @return: string.
*/
exports.escapeHtml = string.escapeHtml;

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["fetch"] = fetch;
/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */


class FetchResponse {
  constructor(data, headers, status) {
    this.data = data;
    this.headers = headers;
    this.status = status;
  }
  get statusText() { return this.status.toString(); }
  blob() {
    return new Promise((resolve, reject)=>{
      reject(new Error('unsupport fetch.blob'));
    });
  }

  json() {
    return new Promise((resolve, reject)=>{
      try {
        let data = JSON.parse(this.data);
      } catch (e) {
        reject(e);
        return;
      }
      resolve(data);
    });
  }

  text() {
    return new Promise((resolve, reject)=>{
      resolve(this.data);
    });
  }
}

function fetch(url, option/*: {
    method?: string, // 请求方法 get, post, delete 等.
    mode?: string | 'no-cors' | 'cors' | 'same-origin',   // 'no-cors', 'same-origin'等; (可忽略)
    headers?: any, // 请求header, 例如:
    // {
    //   "Content-Type": "application/json",
    //   "Accept": 'application/json',
    // }
    body?: string,    // 请求内容.
    timeout?: number, // 超时 (ms), 默认为5000,
    credentials?: 'include' | null | undefined,  // 携带了credentials='include'则服务器需设置Access-Control-Allow-Credentials
  }*/) /*: Promise<any>*/ {
  
  option = option||{};

  return new Promise((resolve, reject)=>{
    wx.request({
      url,
      header: option.headers,
      timeout: option.timeout,
      data: option.body,
      method: option.method?option.method.toUpperCase():undefined,
      success: (res)=>{
        resolve( new FetchResponse(res.data, res.header, res.status) );
      }
    })
  });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var utils = __webpack_require__(13);

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
exports.browserIsIE =
  function () {
    return false;
  }

/**
 * @desc: 判断ie版本号.
 * @return number. 非ie返回Number.MAX_SAFE_INTEGER.
 *        如果是 edge 返回 'edge'
 */
exports.browserIEVer =
  function () {
    return Number.MAX_SAFE_INTEGER;
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
  return true;
}

/**
 * @desc: the browser is ios.
 */
exports.browserIsIOS = function() {
  let systemInfo = wx.getSystemInfoSync();
  if (systemInfo && systemInfo.platform == 'ios') {
    return true;
  }
  return false;
}


/**
 * @desc: the browser is phone.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsPhone = function(userAgent) {

  let systemInfo = wx.getSystemInfoSync();
  if (systemInfo && systemInfo.windowWidth <= 767) {
    return true;
  }
  return false;
}


/**
 * @desc: the browser is weixin.
 */
exports.browserIsWeixin = function(userAgent) {
  return true;
}

/**
 * @desc: the platform is Windows.
 */
exports.platformIsWindows = function(userAgent) {
  return false;
}


/**
 * @desc: the platform is Mac.
 */
exports.platformIsMac = function(userAgent) {
  return false;
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var utilsString = __webpack_require__(0);

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
/* 13 */
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
 * @desc: 合并多个map (浅拷贝).
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__debug", function() { return __debug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "crypt", function() { return crypt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return utils; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "net", function() { return net; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BigNumber", function() { return BigNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "date", function() { return date; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "string", function() { return string; });

// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
__webpack_require__(3);
// require('babel-polyfill');
// require('../third-party/bluebird.min.js');
// require('../third-party/bignumber.min.js');

var febsutils  = __webpack_require__(11);
var febscrypt  = __webpack_require__(5);
var cryptMd5  = __webpack_require__(6);
var cryptSha1  = __webpack_require__(7);
var utilsBig  = __webpack_require__(4);
var fetch  = __webpack_require__(10);
var BigNumber = __webpack_require__(1);
var date  = __webpack_require__(8);
var string = __webpack_require__(9);


const __debug = false;
const crypt = febsutils.mergeMap(febscrypt, cryptMd5, cryptSha1);
const utils = febsutils.mergeMap(febsutils, utilsBig);
const net = {
    fetch: fetch.fetch,
  };




/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map