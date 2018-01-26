/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

febs.controls.loading_tag_name = 'control_loading_span_s23153dd12ax1';
febs.controls.control_loading_index = 0;

/**
* @desc: 当前是否显示.
*/
febs.controls.loading_isVisiable = function() {
  if (febs.controls.control_loading_timer)
    return true;
    
  var ee = $('#' + febs.controls.loading_tag_name).html();
  return ee && ee.length>0;
}


/**
* @desc: 使用延时显示加载框.
* @param text: 提示文本.
* @param timeout: 延时显示, 默认为0.
* @return: 
*/
febs.controls.loading_show = function(text, timeout) {
  var e = $('body').children('#' + febs.controls.loading_tag_name);
  if (!e || e.length == 0) {
    $('body').prepend(('<span id="' + febs.controls.loading_tag_name + '"></span>'));
  }

  if (febs.controls.control_loading_timer)
    window.clearInterval(febs.controls.control_loading_timer);
  if (timeout) {
    febs.controls.control_loading_timer = window.setInterval(function () {
      febs.controls.loading_show(text);
    }, timeout);
  }
  else {
    $('#' + febs.controls.loading_tag_name).html('<div class="control_loading_c"><div class="control_loading"><div class="control_loading_spin"></div><p style="margin-left:auto;margin-right:auto;text-align:center;max-width:200px;">' + (text ? text : '') + '</p></div></div>');
  }
}

/**
* @desc: 通过每500ms改变文本的方式显示加载框; 例如显示 3,2,1,3,2,1循环显示.
* @param textArray: 变化的文本数组.
* @param changeTextCB: 当前显示文本的回调. function(text).
* @param hideCB:  隐藏加载框时的设置文本的函数. function().
* @return: 
*/
febs.controls.loading_show_text = function(textArray, changeTextCB, hideCB) {
  var e = $('body').children('#' + febs.controls.loading_tag_name);
  if (!e || e.length == 0) {
    $('body').prepend(('<span id="' + febs.controls.loading_tag_name + '"></span>'));
  }

  if (febs.controls.control_loading_text_elemFunc) {
    if (febs.controls.control_loading_text_hideFunc) febs.controls.control_loading_text_hideFunc();
    febs.controls.control_loading_text_hideFunc = null;
    febs.controls.control_loading_text_elemFunc = null;
    febs.controls.control_loading_text_array = null;
    if (febs.controls.control_loading_timer) {
      window.clearInterval(control_loading_timer);
      febs.controls.control_loading_timer = null;
    }
  }

  febs.controls.control_loading_text_array = textArray;
  febs.controls.control_loading_text_hideFunc = hideCB;
  febs.controls.control_loading_text_elemFunc = changeTextCB;
  febs.controls.control_loading_timer = window.setInterval(function () {
    febs.controls.control_loading_text_elemFunc(febs.controls.control_loading_text_array[(febs.controls.control_loading_index++) % febs.controls.control_loading_text_array.length]);
  }, 500);
}

/**
* @desc: 隐藏加载对话框
* @return: 
*/
febs.controls.loading_hide = function() {
  var e = $('body').children('#' + febs.controls.loading_tag_name);
  if (!e || e.length == 0) {
    $('body').prepend(('<span id="' + febs.controls.loading_tag_name + '"></span>'));
  }

  if (febs.controls.control_loading_timer) {
    window.clearInterval(febs.controls.control_loading_timer);
    febs.controls.control_loading_timer = null;
  }

  if (febs.controls.control_loading_text_elemFunc) {
    if (febs.controls.control_loading_text_hideFunc) febs.controls.control_loading_text_hideFunc();
    febs.controls.control_loading_text_hideFunc = null;
    febs.controls.control_loading_text_elemFunc = null;
    febs.controls.control_loading_text_array = null;
    if (febs.controls.control_loading_timer) {
      window.clearInterval(febs.controls.control_loading_timer);
      febs.controls.control_loading_timer = null;
    }
  }

  $('#' + febs.controls.loading_tag_name).html('');
}
