'use strict';

/**
 * Example:
 *      前台引入:
 *          1. control_loading.hbs页面
 *          2. 使用脚本
 *              // 使用延时显示加载框.
 *              control_loading_show(text, timeout);
 *
 *              // 通过文本改变方式显示加载框.
 *              // changeTextCB: 设置文本的函数. elemFunc(text)
 *              // textArray: 变化的文本数组.
 *              // hideCB:  隐藏加载框时的设置文本的函数. hideCB().
 *              control_loading_show_text(textArray, changeTextCB, hideCB);
 *
 *              // 隐藏加载框.
 *              control_loading_hide();
 */
