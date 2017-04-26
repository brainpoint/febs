
/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 *  1. init() 初始化.
 *  2. go() 跳转.
 *  3. refresh() 刷新.
 */

febs.nav = febs.nav||function() {}

febs.nav.nav_map = {};
febs.nav.nav_arr = [];
febs.nav.nav_max_length = 20;
febs.nav.nav_callback = null;
febs.nav.nav_url_equal_callback = null;
febs.nav.nav_ajax_count = 0;
febs.nav.nav_cur_url = null;
febs.nav.nav_options = {defaultTimeout:10000};


/**
 * @desc: ajax 跳转.
 * @return:
 */
febs.nav.ajax=
function( ctx )
{
  //if (!!window.ActiveXObject || "ActiveXObject" in window) // ie11.
  {
    if (ctx.url)
    {
      var i = ctx.url.indexOf('?');
      if (i < 0) {
        ctx.url += "?ajaxmark="+febs.nav.nav_ajax_count;
        febs.nav.nav_ajax_count++;
      } else {
        if (i == ctx.url.length-1) {
          ctx.url += "ajaxmark="+febs.nav.nav_ajax_count;
          febs.nav.nav_ajax_count++;
        } else {
          ctx.url += "&ajaxmark="+febs.nav.nav_ajax_count;
          febs.nav.nav_ajax_count++;
        }
      }
    }
  } // if.

  if (!ctx.timeout)
    ctx.timeout = febs.nav.nav_options.defaultTimeout;

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
febs.nav.init=
function (navCallback, urlObjEquelCallback, options)
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

  febs.nav.nav_options = options;
  febs.nav.nav_callback = navCallback;
  febs.nav.nav_url_equal_callback = urlObjEquelCallback;
}

/**
 * @desc: 寻找指定的url
 * @return: url.
 */
febs.nav.url=
function (anchor)
{
  var url = null;
  if (anchor)
  {
    url = febs.nav.nav_map[anchor];
    url = url ? url : null;
  }
  return url;
}

febs.nav.hash_change=
function ()
{
  if (febs.nav.nav_cur_url != null)
  {
    febs.nav.nav_cur_url = null;
    return;
  }

  var hashStr = location.hash;
  if (hashStr != null && hashStr != "") {
    var url = febs.nav.url(hashStr);
    if (url && febs.nav.nav_callback) {
      febs.nav.nav_callback(url);
    }
  }
}


/**
 * @desc: 记录一个新页面.
 * @param urlObject: 包含参数等链接的信息.
 * @return: 浏览器锚点url.
 */
febs.nav.push=
function (urlObject)
{
  if (!febs.nav.nav_url_equal_callback)
    return;

  for (var i = 0; i < febs.nav.nav_arr.length; i++)
  {
    var obj = febs.nav.nav_map[febs.nav.nav_arr[i]];
    if (febs.nav.nav_url_equal_callback(obj, urlObject))
    {
      window.onhashchange = null;
      window.location.href = febs.nav.nav_arr[i];
      febs.nav.nav_cur_url = true;
      window.onhashchange = febs.nav.hash_change;
      return;
    }
  }

  var anchor = '#' + febs.crypt.uuid();
  if (febs.nav.nav_arr.length >= febs.nav.nav_max_length)
  {
    delete febs.nav.nav_map[febs.nav.nav_arr[0]];
    febs.nav.nav_arr.splice(0, 1);
  }

  window.onhashchange = null;
  window.location.href = anchor;
  febs.nav.nav_cur_url = true;
  window.onhashchange = febs.nav.hash_change;

  febs.nav.nav_map[anchor] = urlObject;
  febs.nav.nav_arr.push(anchor);

  return anchor;
}

/**
 * @desc: 跳转至指定位置.
 * @param urlObject: null则当前页面刷新.
 * @return:
 */
febs.nav.go=
function (urlObject)
{
  if (!febs.nav.nav_callback)
    return;

  if (urlObject)
    febs.nav.push(urlObject);
  febs.nav.hash_change();
}

/**
* @desc 刷新页面.
*/
febs.nav.refresh=
function ()
{
  febs.nav.go(null);
}

/**
* @desc 刷新指定元素.
*/
febs.nav.refresh_elem=
function ( elem, url )
{
  febs.nav.ajax({
    type: "GET",
    url: url,
    success: function(r) {
      elem.html(r);
    }
  });
}

window.onhashchange = febs.nav.hash_change;
