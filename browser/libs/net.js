/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var febsUtils = require('./utils');
var netajax = require('./net.ajax');
var netfetch = require('./net.fetch');
var netjsonp = require('./net.jsonp');


'use strict';

var net = {
  ajax: netajax.ajax,
  fetch: netfetch.fetch,
  jsonp: netjsonp.jsonp
};

module.exports = net;