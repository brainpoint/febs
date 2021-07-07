'use strict';

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

var utils = require('../browser/common/utils');
var utilsBrowser = require('../browser/common/utils.browser');
var utilsBigint = require('../browser/common/utils.bigint');

var PromiseLib = Promise;

/**
 * @desc: 模拟sleep.
 * @return: Promise.
 *     在ms时间后执行.
 * @e.g.
 *     febs.utils.sleep(1000).then(()=>{
          //1000ms之后resolve.
       });
 */
exports.sleep = utils.sleep;


/**
 * @desc: the browser is mobile.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsMobile = utilsBrowser.browserIsMobile;

/**
 * @desc: the browser is ios.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsIOS = utilsBrowser.browserIsIOS;


/**
 * @desc: the browser is phone.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsPhone = utilsBrowser.browserIsPhone;

/**
 * @desc: the browser is safari.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsSafari = utilsBrowser.browserIsSafari;

/**
 * @desc: the browser is opera.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsOpera = utilsBrowser.browserIsOpera;

/**
 * @desc: the browser is firefox.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsFirefox = utilsBrowser.browserIsFirefox;

  
  /**
 * @desc: the browser is chrome.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsChrome = utilsBrowser.browserIsChrome;

/**
 * @desc: the browser is Edge.
 * @param userAgent: the browser user agent string.
 */
exports.browserIsEdge = utilsBrowser.browserIsEdge;

/**
 * @desc: the browser is weixin.
 */
exports.browserIsWeixin = utilsBrowser.browserIsWeixin;


/**
 * @desc: the platform is Windows.
 */
exports.platformIsWin = utilsBrowser.platformIsWin;


/**
 * @desc: the platform is Mac.
 */
exports.platformIsMac = utilsBrowser.platformIsMac;


/**
 * @desc: 获取时间的string.
 * @param time: ms.
 * @param fmt: 格式化, 默认为 'HH:mm:ss'
 *             年(y)、月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 *              'yyyy-MM-dd hh:mm:ss.S' ==> 2006-07-02 08:09:04.423
 *              'yyyy-MM-dd E HH:mm:ss' ==> 2009-03-10 星期二 20:09:04
 *              'yyyy-M-d h:m:s.S'      ==> 2006-7-2 8:9:4.18
 * @param weekFmt: 星期的文字格式, 默认为 {'0':'星期天', '1': '星期一', ..., '6':'星期六'}
 * @return: string.
 */
exports.getTimeString = utils.getTimeString;

/**
 * @desc: 获取指定时间距离现在的时间描述.
 *        例如, 昨天, 1小时前等.
 * @param time: ms. 小于当前时间, 大于当前时间将显示为 '刚刚';
 * @param strFmt: 需要显示的文字. 
 *                默认为 {
 *                        now:    '刚刚',           // 3秒钟以内将显示此信息.
 *                        second: '秒前',
 *                        minute: '分钟前',
 *                        hour:   '小时前',
 *                        day_yesterday: '昨天',
 *                        day:    '天前',
 *                        month:  '个月前',          // 6个月内将显示此信息.
 *                        time:   'yyyy-M-d h:m:s'  // 超过6个月将使用此格式格式化时间
 *                       }
 * @return: string.
 */
exports.getTimeStringFromNow = utils.getTimeStringFromNow;

/**
 * @desc: getDate('2012-05-09')
 * @return: Date.
 */
exports.getDate = utils.getDate;


/**
 * @desc: getDate2('20120509')
 * @return: Date.
 */
exports.getDate2 = utils.getDate2;


/**
 * @desc: 合并多个map.
 * @return: {}
 */
exports.mergeMap = utils.mergeMap;


/**
* @desc: 判断参数是否是null,undefined,NaN
* @return: boolean
*/
exports.isNull = utils.isNull;


exports.bigint = utilsBigint.bigint;

exports.bigint_mod = utilsBigint.bigint_mod;

/**
 * @desc: 判断是否是bigint.
 */
exports.bigint_check = utilsBigint.bigint_check;

/**
* @desc: calc bigint
* @return: bigint.
*/
exports.bigint_add = utilsBigint.bigint_add;

exports.bigint_minus = utilsBigint.bigint_minus;

exports.bigint_dividedBy = utilsBigint.bigint_dividedBy;

exports.bigint_mul = utilsBigint.bigint_mul;

/**
* @desc: compare with bigint.
* @return: boolean.
*/
exports.bigint_equal = utilsBigint.bigint_equal;

exports.bigint_more_than = utilsBigint.bigint_more_than;

exports.bigint_more_than_e  = utilsBigint.bigint_more_than_e;

exports.bigint_less_than = utilsBigint.bigint_less_than;

exports.bigint_less_than_e = utilsBigint.bigint_less_than_e;


/**
* @desc: 转换bigint->string.
* @param fixed: 小数位个数, 默认为0.
* @return: string.
*/
exports.bigint_toFixed = utilsBigint.bigint_toFixed;


/**
* @desc: 创建promise，但函数中的this可以为指定值.
*         例如: yield denodeify(fs.exists)(path);
* @param self: 指定的对象.s
* @return: promise.
*/
exports.denodeify = utils.denodeify;

/**
* @desc: 创建promise，但函数中的this可以为指定值.
*         例如: yield denodeify(fs.exists)(path);
* @param self: 指定的对象.s
* @return: promise.
*/
exports.promisify = utils.promisify;


/**
* @desc: 执行cmd.
* @param cmdString: 指令.
* @param params: 输入参数数组.
* @param cbFinish: 完成的回调.
*/
exports.execCommand = function execCommand(cmdString, params, optionOrCbFinish, cbFinish) {

  var option;
  if (typeof optionOrCbFinish === 'function') {
    cbFinish = optionOrCbFinish;
  }
  else if (typeof optionOrCbFinish === 'object') {
    option = optionOrCbFinish;
  }

  var usePromise = !cbFinish;

  if (!option) option = {};

  // scripts.
  var cms = cmdString.split(' ');
  var cmps = cms[0];
  var inputps = cms.splice(1);
  if (cmdString.indexOf('&') >= 0) {
    cmps = cmdString;
    inputps = null;
  }

  var foo = function(inputps, cbFinish, resolve, reject) {
    if (!inputps) {
      exec(cmps, option, function(err, stdout, stderr){
        if (err) {
          console.log(err);
        } else {
        }
        stdout = stdout?stdout.toString('utf8'):null;
        stderr = stderr?stderr.toString('utf8'):null;
        if (err) {
          if (reject) reject(err);
          else cbFinish(err, stdout, stderr);
        }
        else {
          if (resolve) resolve({stdout:stdout, stderr:stderr});
          else cbFinish(err, stdout, stderr);
        }
      });
    }
    else {
      inputps = inputps.concat(params||[]);

      let out = '';
      let err = '';

      //option = utils.mergeMap( {stdio: 'inherit'}, option);
      var proc = spawn(cmps, inputps, option);
      proc.on('error', function(e) {
        if (reject) reject(e);
        else cbFinish(e, null, null);
      });
      proc.stdout.on('data', function (data) {
        if (resolve) {
          out += data;
        }
        else {
          cbFinish(null, data.toString(), null)
        }
      });
      proc.stderr.on('data', function (data) {
        if (resolve) {
          err += data;
        }
        else {
          cbFinish(null, null, data.toString())
        }
      });
      proc.on('close', function (code) {
        // if (code !== 0) {
        //   console.log(code);
        // } else {
        // }
        if (code !== 0) {
          if (reject) reject(code);
          else cbFinish(code, null, null);
        }
        else {
          if (resolve) resolve({stdout:out, stderr:err});
          else cbFinish(code, null, null);
        }
      });
    }
  }

  if (!usePromise) {
    foo(inputps, cbFinish);
  }
  else {
    return new Promise(function(resolve, reject){
      foo(inputps, cbFinish, resolve, reject);
    });
  }
}