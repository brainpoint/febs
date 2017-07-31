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
var parse    = require('co-busboy');
var assert   = require('assert');
var co       = require('co');
var febs   = require('..');
var PromiseLib = Promise;

function save_to(stream, writeStream, writeStreamPath, size, crc32, done) {
  // streams2+: assert the stream encoding is buffer.
  var state = stream._readableState;
  if (state && state.encoding != null) {
    if (typeof stream.pause === 'function')
      stream.pause();
      
    process.nextTick(function () {
      console.debug('febs upload.accpet stream encoding should not be set');
      done(null, false)
    })
    return defer;
  }

  stream.pipe(writeStream);

  var received = 0;
  var crc32_check = 0;
  stream.on('data', onData)
  stream.once('end', onEnd)

  stream.once('close', onClose)
  stream.once('error', onFinish)
  writeStream.once('error', onFinish)
  // shouldn't ever emit 'close' without `finish`.
  writeStream.once('close', onFinish)

  return defer

  function defer(fn) {
    done = fn
  }

  function onData(chunk) {
    crc32_check = febs.crypt.crc32(chunk, crc32_check);
    received += chunk.length

    if (size !== null && received > size) {
      var err;
      err = 'febs upload.accpet request entity too large';
      onFinish(err)
    }
  }

  // If a 'close' event is emitted before the
  // readable stream has ended,
  // then we assume that it was prematurely closed
  // and we cleanup the file appropriately.
  function onClose() {
    if (state && !state.ended)
      cleanup(true)
  }

  function onEnd() {
    if (received != size) {
      var err;
      err = 'febs upload.accpet request size did not match content length: ' + received + ',' + size;
      onFinish(err)
    }
    else
    {
      if (crc32_check != crc32)
      {
        onFinish('febs upload.accpet request crc32 is wrong');
      }
      else
      {
        finish(null);
      }
    }
  }

  function onFinish(err) {
    if (err)
      finish(err)
  }

  function finish(err) {
    cleanup(err)
    if (err)
    {
      console.debug(err);
      done(null, false);
    }
    // else
    //   done(null, true);
  }

  function cleanup(err, cb) {
    if (err) {
      writeStream.destroy()
      fs.unlink(writeStreamPath, function(){})
    }

    stream.removeListener('data', onData)
    stream.removeListener('end', onEnd)
    stream.removeListener('close', onClose)
    stream.removeListener('error', onFinish)
    writeStream.removeListener('error', onFinish)
    writeStream.removeListener('close', onFinish)

    if (!err) {
      var tempStream = writeStream;
      function _onError() {
        tempStream.removeListener('finish', _onFlush)
        tempStream = null;
        done(null, false);
      }
      function _onFlush() {
        tempStream.removeListener('error', _onError)
        tempStream = null;
        done(null, true);
      }

      writeStream.once('finish', _onFlush)
      writeStream.once('error', _onError)
      writeStream.end()
    }

    stream = writeStream = null
  }
};

/**
 * 接收上传文件内容.
 * @param conditionCB: async function(filesize, filename, filemimeType):string.
 *                      - filesize: 将要存储的文件大小.
 *                      - filename: 上传的文件名.
 *                      - filemimeType: 文件类型, 例如: 'image/jpeg'.
 *                      - return: 存储的文件路径, 返回null表示不存储.
 * @return Promise.
 * @resolve
 *     - bool. 指明是否存储成功.
 */
exports.accept = function(app, conditionCB)
{
  assert(conditionCB);

  return new PromiseLib((resolve, reject)=>{
    try {
      if ('POST' != app.method) {
        resolve(false);
        return;
      }

      var query = URL.parse(app.request.url, true).query;
      if (!query.crc32) {
        resolve(false);
        return;
      }

      if (!query.size) {
        resolve(false);
        return;
      }

      if (!app.request.is('multipart/*')) {
        resolve(false);
        return;
      }

      // parse the multipart body
      var parts = parse(app, {
        autoFields: true // saves the fields to parts.field(s)
      });

      if (!parts) {
        resolve(false);
        return;
      }
    } catch(err) {
      reject(err);
      return;
    }

    parts(function(err, part){
      if (err) {
        reject(err);
        return;
      }

      if (!part) {
        reject('no stream');
        return;
      }

      var srcStream = part;
      var destStream;
      var fn1;
      conditionCB(query.data, Number(query.size), part.filename, part.mimeType)
        .then(fn=>{
          if (!fn)
          {
            console.debug('febs upload.accpet un return a filename');

            if (typeof srcStream.pause === 'function')
            srcStream.pause();
            
            let req = app.request.req || app.request;
            req.destroy();
            return false;
          }
          fn1 = fn;

          // create stream.
          destStream = fs.createWriteStream(fn);
          if (!destStream)
          {
            console.debug('febs upload.accpet createWriteStream err:' + fn);

            if (typeof srcStream.pause === 'function')
              srcStream.pause();

            let req = app.request.req || app.request;
            req.destroy();
            return false;
          }

          return true;
        })
        .then(ret=>{
          if (!ret) {
            resolve(false);
          }
          else {
            save_to(srcStream, destStream, fn1, Number(query.size), Number(query.crc32), (err, ret)=>{
              if (err)
                reject(err);
              else
                resolve(ret);
            });
          }
        })
        .catch(err=>{
          reject(err);
        });
    });
      
  });
};
