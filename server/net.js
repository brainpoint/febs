/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

'use strict';

var exception = require('../browser/common/exception');

exports.fetch = function(url, init) {
  var options = Object.assign({}, init);

  // 原生 fetch 不支持 timeout 选项, 需要转换为 AbortSignal.
  // 调用方已传入 signal 时以其为准.
  if (options.timeout > 0 && !options.signal) {
    options.signal = AbortSignal.timeout(options.timeout);
  }
  delete options.timeout;

  return fetch(url, options)
    .catch(e => {
      // 超时:
      //   原生 fetch(AbortSignal.timeout) -> DOMException, name 为 'TimeoutError';
      //   node-fetch v2 -> FetchError, type 为 'request-timeout'.
      if (e && (e.name === 'TimeoutError' || e.type === 'request-timeout')) {
        throw new exception(e.message, 'NetworkTimeout', __filename, __line, __column);
      }

      // 网络错误: 原生 fetch 统一抛出 TypeError('fetch failed').
      if (e instanceof TypeError) {
        throw new exception(e.message, 'NetworkFailed', __filename, __line, __column);
      }

      throw e;
    });
}