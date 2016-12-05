'use strict';

/**
 * Copyright (c) 2015 Copyright citongs All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 *  1. nav_init() 初始化.
 *  2. nav_go() 跳转.
 *  3. nav_refresh() 刷新.
 */

document.write("<script src='./uuid.js'></script>");

var nav_map = {};
var nav_arr = [];
var nav_max_length = 20;
var nav_callback = null;
var nav_url_equal_callback = null;
var nav_ajax_count = 0;
var nav_cur_url = null;
var nav_options;


/**
 * @desc: ajax 跳转.
 * @return:
 */
function nav_ajax( ctx )
{
  //if (!!window.ActiveXObject || "ActiveXObject" in window) // ie11.
  {
    if (ctx.url)
    {
      var i = ctx.url.indexOf('?');
      if (i < 0) {
        ctx.url += "?ajaxmark="+nav_ajax_count;
        nav_ajax_count++;
      } else {
        if (i == ctx.url.length-1) {
          ctx.url += "ajaxmark="+nav_ajax_count;
          nav_ajax_count++;
        } else {
          ctx.url += "&ajaxmark="+nav_ajax_count;
          nav_ajax_count++;
        }
      }
    }
  } // if.

  if (!ctx.timeout)
    ctx.timeout = nav_options.defaultTimeout;

  jQuery.ajax(ctx);
}

/**
 * @desc: 使用跳转函数初始化.
 * @param navCallback: function(object); 触发页面切换时的回调.
 * @param urlObjEquelCallback: function(obj1, obj2) : bool; 判断两个页面是否相等.
 * @param options: {
                     defaultTimeout: 10000,
                   }
 * @return:
 */
function nav_init(navCallback, urlObjEquelCallback, options)
{
  document.onkeydown = function(e){
    e = window.event || e;
    var keycode = e.keyCode || e.which;
    if(keycode == 116){ // F5.
      if(window.event){// ie
          try{e.keyCode = 0;} catch(e){}
          e.returnValue = false;
      }else{  // firefox
          e.preventDefault();
      }
      nav_refresh();
    }
  }

  options = options||{};
  options.defaultTimeout = options.defaultTimeout||10000;

  nav_options = options;
  nav_callback = navCallback;
  nav_url_equal_callback = urlObjEquelCallback;
}

/**
 * @desc: 寻找指定的url
 * @return: url.
 */
function nav_url(anchor)
{
  var url = null;
  if (anchor)
  {
    url = nav_map[anchor];
    url = url ? url : null;
  }
  return url;
}

function nav_hash_change()
{
  if (nav_cur_url != null)
  {
    nav_cur_url = null;
    return;
  }

  var hashStr = location.hash;
  if (hashStr != null && hashStr != "") {
    var url = nav_url(hashStr);
    if (url && nav_callback) {
      nav_callback(url);
    }
  }
}


/**
 * @desc: 记录一个新页面.
 * @param urlObject: 包含参数等链接的信息.
 * @return: 浏览器锚点url.
 */
function nav_push(urlObject)
{
  if (!nav_url_equal_callback)
    return;

  for (var i = 0; i < nav_arr.length; i++)
  {
    var obj = nav_map[nav_arr[i]];
    if (nav_url_equal_callback(obj, urlObject))
    {
      window.onhashchange = null;
      window.location.href = nav_arr[i];
      nav_cur_url = true;
      window.onhashchange = nav_hash_change;
      return;
    }
  }

  var anchor = '#' + uuid();
  if (nav_arr.length >= nav_max_length)
  {
    delete nav_map[nav_arr[0]];
    nav_arr.splice(0, 1);
  }

  window.onhashchange = null;
  window.location.href = anchor;
  nav_cur_url = true;
  window.onhashchange = nav_hash_change;

  nav_map[anchor] = urlObject;
  nav_arr.push(anchor);

  return anchor;
}

/**
 * @desc: 跳转至指定位置.
 * @param urlObject: null则当前页面刷新.
 * @return:
 */
function nav_go(urlObject)
{
  if (!nav_callback)
    return;

  if (urlObject)
    nav_push(urlObject);
  nav_hash_change();
}

/**
* @desc 刷新页面.
*/
function nav_refresh()
{
  nav_go(null);
}

/**
* @desc 刷新指定元素.
*/
function nav_refresh_elem( elem, url )
{
  nav_ajax({
    type: "GET",
    url: url,
    success: function(r) {
      elem.html(r);
    }
  });
}

window.onhashchange = nav_hash_change;
