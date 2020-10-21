'use strict';

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var fs    = require('fs');
var crypto = require('crypto');
var { v4: uuidv4 } = require('uuid');
var crypt = require('../browser/common/crypt');

/**
 * @desc: 计算crc32值.
 * @param str: string or buffer.
 * @param crc 可以在这个值得基础上继续计算
 * @return: crc32.
 */
function crc32( str, crc ) {
    if( crc == undefined || crc == null ) crc = 0;
    crc = crc ^ (-1);

    if (str instanceof Buffer)
    {
      var c;
      for( var i1 = 0, iTop1 = str.length; i1 < iTop1; i1++ ) {
        c = str.readUInt8(i1);
        crc = (crc >>> 8) ^ crypt.crc32_table[(crc ^ c) & 0xFF];
      }
    }
    else {
      for( var i = 0, iTop = str.length; i < iTop; i++ ) {
        crc = (crc >>> 8) ^ crypt.crc32_table[(crc ^ str.charCodeAt(i)) & 0xFF];
      }
    }

    return crc ^ (-1);
};
exports.crc32 = crc32;

/**
 * @desc:
 * @return:u32. crc32
 */
function crc32_fileSegment( filename, offset, length ) {

  var stat = fs.statSync(filename);
  if (stat && stat.isFile() && stat.size > 0)
  {
    try {

      if (offset >= stat.size || offset < 0 || length == 0) {
        return 0;
      }

      if (length < 0) {
        length = stat.size;
      }

      if (stat.size-offset < length) {
        length = file.size-offset;
      }

      var fd = fs.openSync(filename, 'r');
      if (!fd)
        return 0;

      var crc = 0;
      var buf = new Buffer(1024*10);
      var size;
      for (var i = offset, len = offset+length; i < len; i+=buf.length) {
        size = buf.length > len-i ? len-i : buf.length;

        if (fs.readSync(fd, buf, 0, size, i) != size)
        {
          crc = 0;
          break;
        }
        crc = crc32(buf.slice(0, size), crc);
      }

      fs.closeSync(fd);
      return crc;
    }catch(e)
    {
      return 0;
    }
  }
  else
  {
    return 0;
  }
};
exports.crc32_fileSegment = crc32_fileSegment;

/**
 * @desc:
 * @return:u32. crc32
 */
exports.crc32_file = function( filename ) {
  return crc32_fileSegment(filename, 0, -1);
};

/**
 * @desc: 计算字符串的md5值
 * @return: string.
 */
exports.md5 =
function ( /* String */ str ) {
  var md5 = crypto.createHash('md5');
  md5.update(str);
  return md5.digest('hex');
}

/**
 * @desc:
 * @return:string;错误返回null.
 */
exports.md5_file = function( filename ) {

  var stat = fs.statSync(filename);
  if (stat && stat.isFile() && stat.size > 0)
  {
    var fd = null;
    try {
      fd = fs.openSync(filename, 'r');
      if (!fd)
        return 0;

      var buf = new Buffer(1024*10);
      var size;

      var md5 = crypto.createHash('md5');
      for (var i = 0, len = stat.size; i < len; i+=buf.length) {
        size = buf.length > len-i ? len-i : buf.length;

        if (fs.readSync(fd, buf, 0, size, null) != size)
        {
          break;
        }
        md5.update(buf.slice(0, size));
      }
      fs.closeSync(fd);
      fd = 0;

      if (i< len) {
        return null;
      }

      return md5.digest('hex');
    }catch(e)
    {
      if (fd) {
        fs.closeSync(fd);
      }
      return null;
    }
  }
  else
  {
    return null;
  }
};


/**
 * @desc: 计算字符串的sha1值
 * @return: string.
 */
exports.sha1 =
function ( /* String */ str ) {
  var sha1 = crypto.createHash('sha1');
  sha1.update(str);
  return sha1.digest('hex');
}

/**
 * @desc:
 * @return:string;错误返回null.
 */
exports.sha1_file = function( filename ) {

  var stat = fs.statSync(filename);
  if (stat && stat.isFile() && stat.size > 0)
  {
    var fd = null;
    try {
      fd = fs.openSync(filename, 'r');
      if (!fd)
        return 0;

      var buf = new Buffer(1024*10);
      var size;

      var sha1 = crypto.createHash('sha1');
      for (var i = 0, len = stat.size; i < len; i+=buf.length) {
        size = buf.length > len-i ? len-i : buf.length;

        if (fs.readSync(fd, buf, 0, size, null) != size)
        {
          break;
        }
        sha1.update(buf.slice(0, size));
      }
      fs.closeSync(fd);
      fd = 0;

      if (i< len) {
        return null;
      }

      return sha1.digest('hex');
    }catch(e)
    {
      if (fd) {
        fs.closeSync(fd);
      }
      return null;
    }
  }
  else
  {
    return null;
  }
};




/**
 * @desc: 分段计算方式.
 *  var hash = md5_begin();
 *  md5_update(hash, 'xxx');
 *  var hex = md5_finish(hash);
 */
exports.md5_begin =
function () {
  return crypto.createHash('md5');
}

exports.md5_update =
function (hash, /* String */ str) {
  hash.update(str);
}

exports.md5_finish =
function (hash) {
  return hash.digest('hex');
}

/**
 * @desc: 分段计算方式.
 *  var hash = sha1_begin();
 *  sha1_update(hash, 'xxx');
 *  var hex = sha1_finish(hash);
 */
exports.sha1_begin =
function () {
  return crypto.createHash('sha1');
}

exports.sha1_update =
function (hash, /* String */ str) {
  hash.update(str);
}

exports.sha1_finish =
function (hash) {
  return hash.digest('hex');
}


/**
* @desc: 生成一个uuid字符串 (uuid v1 timestamp)
* @return: 
*/
exports.uuid =
function () {
  return uuidv4();
}

/**
* @desc: base64编码.
* @param arrByte: 字节数组.
* @return: string.
*/
exports.base64_encode=crypt.base64_encode;

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

/**
* @desc: 使用上次的解码的数据继续进行base64解码.
* @return: 
        {
            c1,
            c2,
            c3,
            c4,
            data, // 字节数组
        }.
*/
exports.base64_decode =
function (strBase64, c1 = 0, c2 = 0, c3 = 0, c4 = 0){
  var i=0, len = strBase64.length, out = [];
  while (i < len){

    // c1_loop:
    if (c2 != -1 && c3 != -1 && c4 != -1) {
        do{
            c1 = base64DecodeChars[strBase64.charCodeAt(i++) & 0xff]
        } while (
            i < len && c1 == -1
        );

        if (c1 == -1) break;
    }

    // c2_loop:
    if (c3 != -1 && c4 != -1) {
        do{
            c2 = base64DecodeChars[strBase64.charCodeAt(i++) & 0xff]
        } while (
            i < len && c2 == -1
        );

        if (c2 == -1) break;

        out.push((c1 << 2) | ((c2 & 0x30) >> 4));
    }

    // c3_loop:
    if (c4 != -1) {
        do{
            c3 = strBase64.charCodeAt(i++) & 0xff;
            if (c3 == 61) 
                return {data:out};

            c3 = base64DecodeChars[c3]
        } while (
            i < len && c3 == -1
        );

        if (c3 == -1) break;

        out.push(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
    }

    // c4_loop:
    do{
        c4 = strBase64.charCodeAt(i++) & 0xff;
        if (c4 == 61) return {data:out};
        c4 = base64DecodeChars[c4]
    } while (
        i < len && c4 == -1
    );

    if (c4 == -1) break;

    out.push(((c3 & 0x03) << 6) | c4)
    c1 = c2 = c3 = c4 = 0;
  }
  return {data:out,c1,c2,c3,c4};
}