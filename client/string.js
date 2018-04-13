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
exports.isPhoneMobile = function(str) {
  if (!str) return false;
  if(/^0?1[2|3|4|5|6|7|8][0-9]\d{8}$/.test(str))
  {
    return true;
  }
  return false;
};

/**
 * @desc: 是否为空串.
 * @return: boolean.
 */
exports.isEmpty = function(s) {

  if (!s)
  {
    return true;
  }

  if (typeof s !== 'string')
  {
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
exports.getByteSize = function(s) {
  if (!s)
    return 0;

  var totalLength = 0;
  var i;
  var charCode;
  for (i = 0; i < s.length; i++) {
    charCode = s.charCodeAt(i);
    if (charCode < 0x007f) {
      totalLength = totalLength + 1;
    }
    else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
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
exports.replace = function(str, strSrc, strDest) {
  if (!str || !strSrc)
    return str;

  if (str.length == 0)
      return str;

  var s = '';

  var endPos = str.length;
  var i = 0;
  var j = 0;
  do
  {
      i = str.indexOf(strSrc, j);
      if (-1 != i && i < endPos)
      {
        if (i != j)
          s += str.slice(j, i);

        s += strDest;
        j = i + strSrc.length;
      }
      else
      {
        s += str.slice(j);
        break;
      }
  } while (i < endPos);   // while

  return s;
};
