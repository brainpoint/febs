/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

exports.DefaultTimeout = 5000;

/**
 * @desc: 创建 XMLHttpRequest 实例.
 *        不再支持 IE8/9 的 ActiveXObject.
 */
exports.transfer = function(window) {
  if (window && window.XMLHttpRequest) {
    return new window.XMLHttpRequest();
  }

  return null;
}
