/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var febsUtils = require('./utils');

( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "febs requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

'use strict';

var transfer = require('./net.transfer');

var Ajaxmark = Symbol('ajaxmark');
var net = {};

//--------------------------------------------------------
// ajax
//--------------------------------------------------------

/**
 * @desc: ajax 跳转. 允许添加 progress: function(percent) 选项.
 * @return:
 */
function ajax( ctx )
{
  //if (!!window.ActiveXObject || "ActiveXObject" in window) // ie11.
  {
    if (ctx.url)
    {
      if (!window[Ajaxmark]) window[Ajaxmark] = 1;
      var i = ctx.url.indexOf('?');
      if (i < 0) {
        ctx.url += "?ajaxmark="+window[Ajaxmark];
      } else {
        if (i == ctx.url.length-1) {
          ctx.url += "ajaxmark="+window[Ajaxmark];
        } else {
          ctx.url += "&ajaxmark="+window[Ajaxmark];
        }
      }
    }
    window[Ajaxmark]++;
  } // if.

  var cbError = ctx.error || function(){}
  var cbSuccess = ctx.success || function(){}
  var cbComplete = ctx.complete || function(){}

  //
  // net transfer.
  var xhr = transfer.transfer(window, ctx.timeout);

  // xhr.onload = function() {
  //   var status = (xhr.status === 1223) ? 204 : xhr.status
  //   if (status < 100 || status > 599) {
  //     reject(new TypeError('Network request failed'))
  //     return
  //   }
  //   var options = {
  //     status: status,
  //     statusText: xhr.statusText,
  //     headers: febsnet.headers(xhr),
  //     url: responseURL()
  //   }
  //   var body = 'response' in xhr ? xhr.response : xhr.responseText;
  //   resolve(new febsnet.Response(body, options))
  // }

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var status = (xhr.status === 1223) ? 204 : xhr.status
      if (status < 100 || status > 599) {
        cbError(xhr, xhr.statusText, new TypeError('Network request failed'))
        cbError = null;
        return
      }

      var body = 'response' in xhr ? xhr.response : xhr.responseText;
      if (status == 200)
        cbSuccess(body, xhr.statusText, xhr);
      
      cbComplete(xhr, xhr.statusText);
    }
  }

  xhr.ontimeout = function() {
    if (cbError)
      cbError(xhr, null, 'timeout');
  }
  xhr.onerror = function() {
    if (cbError)
      cbError(xhr, null, new TypeError('Network request failed'));
  }

  if (ctx.progress) {
    if(('upload' in xhr) && ('onprogress' in xhr.upload)) {
      xhr.upload.onprogress = function(event){
        if(event.lengthComputable){
          ctx.progress(event.loaded/event.total);
        }
      }
    } else {
      console.log('The browser not support progress event');
    }
  }

  xhr.open(ctx.type, ctx.url, ctx.async===false?false:true)

  xhr.withCredentials = true

  if (ctx.headers) {
    if (xhr.setRequestHeader) {
      for (var key in ctx.headers) {
        var element = ctx.headers[key];
        xhr.setRequestHeader(key, element);
      }
    }
    else {
      console.log('can\'t set headers');
    }
  }

  if (ctx.beforeSend) {
    ctx.beforeSend(xhr);
  }

  xhr.send(ctx.data);

  return {
    abort: function() {
      xhr.abort();
    }
  };
}

net.ajax = ajax;

return net;
} );