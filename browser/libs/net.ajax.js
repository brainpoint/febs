/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var febsUtils = require('./utils');

'use strict';

var transfer = require('./net.transfer');

// var Ajaxmark = Symbol('ajaxmark');
var Ajaxmark = '_FeBs_ajaxmark';

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

  ctx.processData = ctx.hasOwnProperty('processData') ? ctx.processData : true;

  //
  // net transfer.
  var xhr = transfer.transfer(window);

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

  xhr.open(ctx.type, ctx.url, ctx.async===false?false:true);
  var timeout = (ctx.async===false?false:true)? ctx.timeout: 0;
  xhr.timeout = (timeout !== undefined && timeout !== null) ? timeout : transfer.DefaultTimeout;


  xhr.withCredentials = true

  if (ctx.headers) {
    if (xhr.setRequestHeader) {
      for (var key in ctx.headers) {
        var element = ctx.headers[key];

        if (key == 'Content-Type' && element === false) {
          continue;
        }
        xhr.setRequestHeader(key, element);
      }
    }
    else {
      console.log('ajax can\'t set headers');
    }
  }

  if (!ctx.headers || !ctx.headers.hasOwnProperty('Content-Type')) {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  }

  // auto content-type.
  var data_content = ctx.data;
  if (data_content) {
    if (ctx.processData && typeof data_content !== 'string') {
      try {
        
        if (ctx.headers && ctx.headers['Content-Type'] && ctx.headers['Content-Type'].toLowerCase().indexOf('json') >= 0) {
          data_content = JSON.stringify(data_content);  
        } else {
          var data_tt = '';
          for (var key in data_content) {
            var element = data_content[key];
            if (data_tt.length > 0) data_tt += '&';
            data_tt += key + '=' + (element?element.toString():'');
          }
          data_content = data_tt;
        }

      } catch (e) {
        console.log('ajax stringify data error');
        console.log(e);        
      }
    }
  }

  if (ctx.beforeSend) {
    ctx.beforeSend(xhr);
  }

  xhr.send(data_content);

  return {
    abort: function() {
      xhr.abort();
    }
  };
}

net.ajax = ajax;

module.exports = net;