'use strict';

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

  if (s.length == 0)
    return true;

  return false;
}

/**
 * @desc: 获得字符串utf8编码后的字节长度.
 * @return: u32.
 */
exports.getByteSize = function (s) {
  if (!s)
    return 0;

  var totalLength = 0;
  var i;
  var charCode;
  for (i = 0; i < s.length; i++) {
    charCode = s.charCodeAt(i);
    if (charCode < 0x007f) {
      totalLength = totalLength + 1;
    } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
      totalLength += 2;
    } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
      totalLength += 3;
    } else if ((0x10000 <= charCode)) {
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
  if (!str || !strSrc)
    return str;

  if (str.length == 0)
    return str;

  var s = '';

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
      bytes.push(((c >> 18) & 0x07) | 0xF0);
      bytes.push(((c >> 12) & 0x3F) | 0x80);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(((c >> 12) & 0x0F) | 0xE0);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(((c >> 6) & 0x1F) | 0xC0);
      bytes.push((c & 0x3F) | 0x80);
    } else {
      bytes.push(c & 0xFF);
    }
  }
  return bytes;
}

exports.bytesToUtf8 = function (utf8Bytes) {
  var unicodeStr = "";
  for (var pos = 0; pos < utf8Bytes.length;) {
    var flag = utf8Bytes[pos];
    var unicode = 0;
    if ((flag >>> 7) === 0) {
      unicodeStr += String.fromCharCode(utf8Bytes[pos]);
      pos += 1;

    } else if ((flag & 0xFC) === 0xFC) {
      unicode = (utf8Bytes[pos] & 0x3) << 30;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 24;
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 18;
      unicode |= (utf8Bytes[pos + 3] & 0x3F) << 12;
      unicode |= (utf8Bytes[pos + 4] & 0x3F) << 6;
      unicode |= (utf8Bytes[pos + 5] & 0x3F);
      unicodeStr += String.fromCharCode(unicode);
      pos += 6;

    } else if ((flag & 0xF8) === 0xF8) {
      unicode = (utf8Bytes[pos] & 0x7) << 24;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 18;
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 12;
      unicode |= (utf8Bytes[pos + 3] & 0x3F) << 6;
      unicode |= (utf8Bytes[pos + 4] & 0x3F);
      unicodeStr += String.fromCharCode(unicode);
      pos += 5;

    } else if ((flag & 0xF0) === 0xF0) {
      unicode = (utf8Bytes[pos] & 0xF) << 18;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 12;
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 6;
      unicode |= (utf8Bytes[pos + 3] & 0x3F);
      unicodeStr += String.fromCharCode(unicode);
      pos += 4;

    } else if ((flag & 0xE0) === 0xE0) {
      unicode = (utf8Bytes[pos] & 0x1F) << 12;;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 6;
      unicode |= (utf8Bytes[pos + 2] & 0x3F);
      unicodeStr += String.fromCharCode(unicode);
      pos += 3;

    } else if ((flag & 0xC0) === 0xC0) { //110
      unicode = (utf8Bytes[pos] & 0x3F) << 6;
      unicode |= (utf8Bytes[pos + 1] & 0x3F);
      unicodeStr += String.fromCharCode(unicode);
      pos += 2;

    } else {
      unicodeStr += String.fromCharCode(utf8Bytes[pos]);
      pos += 1;
    }
  }
  return unicodeStr;
}

exports.utf8Encode = function utf8Encode(str) {
  var x, y, output = '',
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
        output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F),
          0x80 | (x & 0x3F));
      } else if (x <= 0xFFFF) {
        output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
          0x80 | ((x >>> 6) & 0x3F),
          0x80 | (x & 0x3F));
      } else if (x <= 0x1FFFFF) {
        output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
          0x80 | ((x >>> 12) & 0x3F),
          0x80 | ((x >>> 6) & 0x3F),
          0x80 | (x & 0x3F));
      }
    }
  }
  return output;
}

exports.utf8Decode = function utf8Decode(str) {
  var i, ac, c1, c2, c3, arr = [],
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
        arr[ac] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = str.charCodeAt(i + 1);
        c3 = str.charCodeAt(i + 2);
        arr[ac] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
  }
  return arr.join('');
}

exports.trim = function (str) {
  if (!str)
    return str;

  return str.replace(/(^\s*)|(\s*$)/g, "")
}

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
}
