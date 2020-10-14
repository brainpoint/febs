'use strict';

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

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
    this.code = code;
    this.msg = msg;
    this.filename = filename;
    this.line = line;
    this.column = column||0;
  }

  /**
  * @desc: 一般错误.
  */
  static get ERROR()               { return "error"; }

  /**
  * @desc: 参数错误.
  */
  static get PARAM()               { return "param error"; }

  /**
  * @desc: 越界
  * @return:
  */
  static get OUT_OF_RANGE()        { return "out of range"; }
};
