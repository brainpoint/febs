/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

'use strict';

var nodeFetch = require('node-fetch');
var exception = require('../browser/common/exception');

exports.fetch = function (url, init) {
  return nodeFetch(url, init)
    .catch(e => {
      if (e instanceof nodeFetch.FetchError) {
        if (e.type === 'request-timeout') {
          throw new exception(e.message, 'NetworkTimeout', __filename, __line, __column);
        }
        else {
          throw new exception(e.message, 'NetworkFailed', __filename, __line, __column);
        }
      }
      throw e;
    });
}