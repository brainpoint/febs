/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var febsUtils = require('./utils');

'use strict';

var Window = "undefined" != typeof window ? window : ("undefined" != typeof global ? global : ("undefined" != typeof self ? self : undefined));

var DefaultTimeout = 5000;
var febsnet = {};
var net = {};


//--------------------------------------------------------
// jsonp
//--------------------------------------------------------

// From https://github.com/camsong/fetch-jsonp
febsnet.jsonp_defaultOptions = {
  timeout: DefaultTimeout,
  jsonpCallback: 'callback'
};

febsnet.jsonp_generateCallbackFunction = function () {
  return 'jsonp_' + Date.now().toString() + '_' + Math.ceil(Math.random() * 100000);
}

// Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined' error if request timeout
febsnet.jsonp_clearFunction = function (functionName) {
  // IE8 throws an exception when you try to delete a property on window
  // http://stackoverflow.com/a/1824228/751089
  try {
    delete Window[functionName];
  } catch(e) {
  }
}

febsnet.jsonp_removeScript = function (scriptId) {
  var script = document.getElementById(scriptId);
  document.getElementsByTagName("head")[0].removeChild(script);
}

febsnet.jsonp = function(url, options) {
  options = options || {};
  var timeout = options.timeout != null ? options.timeout : febsnet.jsonp_defaultOptions.timeout;
  var jsonpCallback = (!!options.jsonpCallback) ? options.jsonpCallback : febsnet.jsonp_defaultOptions.jsonpCallback;

  var timeoutId;

  return new Promise(function(resolve, reject) {
    var callbackFunction = febsnet.jsonp_generateCallbackFunction();

    Window[callbackFunction] = function(response) {
      resolve({
        ok: true,
        // keep consistent with fetch API
        json: function() {
          return Promise.resolve(response);
        }
      });

      if (timeoutId) clearTimeout(timeoutId);

      febsnet.jsonp_removeScript(jsonpCallback + '_' + callbackFunction);

      febsnet.jsonp_clearFunction(callbackFunction);
    };

    // Check if the user set their own params, and if not add a ? to start a list of params
    url += (url.indexOf('?') === -1) ? '?' : '&';

    var jsonpScript = document.createElement('script');
    jsonpScript.setAttribute("src", url + jsonpCallback + '=' + callbackFunction);
    jsonpScript.id = jsonpCallback + '_' + callbackFunction;
    document.getElementsByTagName("head")[0].appendChild(jsonpScript);

    timeoutId = setTimeout(function() {
      reject('timeout');

      febsnet.jsonp_clearFunction(callbackFunction);
      febsnet.jsonp_removeScript(jsonpCallback + '_' + callbackFunction);
    }, timeout);
  });
};

net.jsonp = febsnet.jsonp;

module.exports = net;