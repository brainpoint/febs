'use strict';

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var string = require('../common/string');

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
 * @desc: 获得字符串utf8编码后的字节长度.
 * @return: u32.
 */
exports.getByteSize = string.getByteSize;


/**
 * @desc: 替换字符串中所有的strSrc->strDest.
 * @return: string.
 */
exports.replace = string.replace;
