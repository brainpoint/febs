'use strict';

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 *      upload控件使用一个接口来上传文件, 使用multpart/form-data方式传输:
 *          1. uploadUrl: 上传文件.
 * Example:
 *      前台引入:
 *            上传方式只能使用post.
 *          1. 在需要upload的页面上引入 control_upload.hbs页面; 或者使用如下语句:
 *                <form id="fileForm" method="post" role="form" enctype="multipart/form-data">
 *                  <input type="file" class="form-control" name="file" onchange="control_upload(cfg)" multiple>
 *                </form>
 *          2. 调用脚本进行初始化设置: control_upload_init(uploadUrl, finishCB, progressCB);
 *                        其中 uploadUrl为上传地址, 不能带参数.
 *      后台:
 *          1. 在uploadUrl中调用  await require('febs').controls.upload.accept(app, conditionCB); 当满足条件时将存储, 并返回true表示成功.
 */

var URL      = require('url');
var path     = require('path');
var fs       = require('fs');
var getRawBody = require('raw-body')
var assert   = require('assert');
var febs   = require('..');
var PromiseLib = Promise;

/**
* @desc: 在用户登出或其他中断传输中清除上传的数据.
* @param sessionGet:  function() {} 用于获取存储在session中的临时文件信息;
* @param sessionClear: function() {} 用于清除存储在session中的临时信息
* @return: 
*/
function cleanup(sessionGet, sessionClear, cleanFile = true) {
  let uploadInfo = sessionGet();
  if (uploadInfo) {
    if (cleanFile && febs.file.fileIsExist(uploadInfo.filename))
      febs.file.fileRemove(uploadInfo.filename);

    sessionClear();
  }
}
exports.cleanup = cleanup;

/**
 * 准备接收上传文件.
 * @param conditionCB: async function(data, filesize):string.
 *                      - filesize: 将要存储的文件大小(base64大小)
 *                      - data: 用户上传的数据.
 *                      - return: 本地存储的文件路径, 返回null表示不存储. 存储的文件必须不存在.
 * @param sessionSet:  function(data){} 用于设置存储在session中的临时文件信息;
 * @return Promise.
 * @resolve
 *     - bool. 指明是否开始接收文件流.
 */
exports.acceptHeader = function(app, conditionCB, sessionSet)
{
  assert(conditionCB);

  return new PromiseLib((resolve, reject)=>{
    try {
      // ignore non-POST
      if ('POST' != app.method) {
        resolve(false);
        return;
      }

      var body = app.request.body;

      if (!body.chunks || !body.filesize) {
        resolve(false);
        return;
      }

      conditionCB(body.data, body.filesize)
      .then(fn=>{
        if (fn) {
          if (febs.file.fileIsExist(fn)) {
            console.debug('acceptHeader file is existed', __filename, __line);
            reject('acceptHeader file is existed');
            return;
          }
          
          sessionSet({ chunks:Number(body.chunks), filesize:Number(body.filesize), filename:fn, curChunk:0 });
          app.response.body = {err:0};
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(e=>{
        reject(e);
      });
    }
    catch (e) {
      reject(e);
    }});
};


/**
 * 上传文件内容.
 *  发生错误会自动调用 cleanup
 * @param finishCB: async function(filename):object.
 *                      - filename: 本地存储的文件名.
 *                      - return: 返回给客户端的数据. 不能包含err数据.
 *
 * @param sessionGet:  function() {} 用于获取存储在session中的临时文件信息;
 * @param sessionSet:  function(data){} 用于设置存储在session中的临时文件信息;
 * @param sessionClear: function() {} 用于清除存储在session中的临时信息
 * @return Promise
 * @resolve
 *    - data: 返回给客户端的数据.
 */
exports.accept = function(app, finishCB, sessionGet, sessionSet, sessionClear)
{
  return new PromiseLib((resolve, reject)=>{
    try {
      // ignore non-POST
      if ('POST' != app.method) {
        cleanup(sessionGet, sessionClear, true);
        app.response.body = {err:'method is not post'};
        resolve(app.response.body);
        return;
      }

      var url = URL.parse(app.request.url, true);
      if (!url.query.crc32) {
        cleanup(sessionGet, sessionClear, true);
        app.response.body = {err:'leak param crc32'};
        resolve(app.response.body);
        return;
      }

      var sessionData = sessionGet();
      if (!sessionData || !sessionData.chunks)
      {
        cleanup(sessionGet, sessionClear, true);
        app.response.body = {err:'上传请求已经过期'};
        resolve(app.response.body);
        return;
      }

      getRawBody(app.req)
        .then(bufstr=>{
          if (febs.crypt.crc32(bufstr) != url.query.crc32)
          {
            app.response.body = {err:'crc32错误'};
            resolve(app.response.body);
            return;
          }
          
          bufstr = bufstr.toString('utf8');

          // TODO: 匹配需优化.
          if (sessionData.curChunk == 0) {
            bufstr = bufstr.replace(/^data:image\/\w+;base64,/, '');
          }

          var base64Ret = febs.crypt.base64_decode(bufstr, sessionData.c1, sessionData.c2, sessionData.c3, sessionData.c4);
          
          var buf = Buffer.from(base64Ret.data);
          fs.appendFileSync(sessionData.filename, buf, {flag:'a+'});

          sessionData.c1 = base64Ret.c1;
          sessionData.c2 = base64Ret.c2;
          sessionData.c3 = base64Ret.c3;
          sessionData.c4 = base64Ret.c4;
          sessionData.curChunk++;
          sessionSet(sessionData);
          if (sessionData.curChunk >= sessionData.chunks)
          {
            finishCB(sessionData.filename)
            .then(fn=>{
              cleanup(sessionGet, sessionClear, false);
              if (fn.err !== 0)
                fn.err = 0;
              app.response.body = fn;
              resolve(app.response.body);
            })
            .catch(err=>{
              cleanup(sessionGet, sessionClear, true);
              app.response.body = {err:'系统出错'};
              reject(err);
            });
            return;
          }

          app.response.body = {err:0};
          resolve(app.response.body);
        })
        .catch(err=>{
          cleanup(sessionGet, sessionClear, true);
          app.response.body = {err:'系统出错'};
          reject(err);
        });
    }
    catch(e) {
      cleanup(sessionGet, sessionClear, true);
      app.response.body = {err:'系统出错'};
      reject(e);
    }
  });
};
