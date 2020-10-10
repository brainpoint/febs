'use strict';

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var string = require('../browser/common/string');

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

/**
 * @desc: 除去字符串两端空格.
 * @return: string.
 */
exports.trim = string.trim;

exports.escapeHtml = string.escapeHtml;
