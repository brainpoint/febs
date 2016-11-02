'use strict';

/**
 * Copyright (c) 2015 Copyright citongs All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

module.exports = class extends Error {
  constructor(msg, code, filename, line) {
    super(code + " " + msg);
    this.code = code;
    this.msg = msg;
    this.filename = filename;
    this.line = line;
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
