/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 *  crc32(str, crc=null);
 *  crc32_file(file, function(crc32Value) {})
 */

var crypt = require('../common/crypt');

/**
 * @desc: 计算字符串的crc32值
 * @param crc: 可以在这个值得基础上继续计算
 * @return: number.
 */
function crc32( /* String */ str, /* Number */ crc ) {
    if( !crc ) crc = 0;
    crc = crc ^ (-1);

    for( var i = 0, iTop = str.length; i < iTop; i++ ) {
      crc = (crc >>> 8) ^ crypt.crc32_table[(crc ^ str.charCodeAt(i)) & 0xFF];
    }
    return crc ^ (-1);
}
exports.crc32 = crc32;

/**
 * @desc:
 * @param cb: cb(crc32)
 * @return:
 */
exports.crc32_file =
function (file, cb) {
  if (!file && !cb)
  {
    if (cb) cb(0);
    return;
  }

  var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
  var fileReader = new FileReader();

  var chunkSize = 1024*1024*2;
  var chunks = Math.ceil(file.size / chunkSize);
  var currentChunk = 0;

  var loadNext = function() {
    var start = currentChunk * chunkSize, end = start + chunkSize >= file.size ? file.size : start + chunkSize;
    fileReader.readAsBinaryString(blobSlice.call(file, start, end));
  };

  var crc = 0;

  //每块文件读取完毕之后的处理.
  fileReader.onload = function(e) {
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

/**
* @desc: base64编码.
* @param arrByte: 字节数组.
* @return: string.
*/
exports.base64_encode= crypt.base64_encode;

/**
* @desc: base64解码.
* @return: 字节数组.
*/
exports.base64_decode =
function (strBase64){
  var c1, c2, c3, c4;
  var base64DecodeChars = new Array(
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
      58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6,
      7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
      25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
      37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1,
      -1, -1
  );
  var i=0, len = strBase64.length, out = [];

  while (i < len){
      do{
          c1 = base64DecodeChars[strBase64.charCodeAt(i++) & 0xff]
      } while (
          i < len && c1 == -1
      );

      if (c1 == -1) break;

      do{
          c2 = base64DecodeChars[strBase64.charCodeAt(i++) & 0xff]
      } while (
          i < len && c2 == -1
      );

      if (c2 == -1) break;

      out.push((c1 << 2) | ((c2 & 0x30) >> 4));

      do{
          c3 = strBase64.charCodeAt(i++) & 0xff;
          if (c3 == 61)
              return out;

          c3 = base64DecodeChars[c3]
      } while (
          i < len && c3 == -1
      );

      if (c3 == -1) break;

      out.push(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

      do{
          c4 = strBase64.charCodeAt(i++) & 0xff;
          if (c4 == 61) return out;
          c4 = base64DecodeChars[c4]
      } while (
          i < len && c4 == -1
      );

      if (c4 == -1) break;

      out.push(((c3 & 0x03) << 6) | c4)
  }
  return out;
}

/**
* @desc: 生成一个uuid (v4 random).
* @return: 
*/
exports.uuid =
function () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}