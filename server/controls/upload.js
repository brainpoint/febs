'use strict';

/**
 * Copyright (c) 2015 Copyright citongs All Rights Reserved.
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
 *          1. 在uploadUrl中调用  yield require('citong').controls.upload.accept(app, conditionCB); 当满足条件时将存储, 并返回true表示成功.
 */

var URL      = require('url');
var path     = require('path');
var fs       = require('fs');
var parse    = require('co-busboy');
var assert   = require('assert');
var citong   = require('..');

function save_to(stream, writeStream, writeStreamPath, size, crc32, done) {

  // streams2+: assert the stream encoding is buffer.
  var state = stream._readableState;
  if (state && state.encoding != null) {
    if (typeof stream.pause === 'function')
      stream.pause();

    process.nextTick(function () {
      if (global.isDebug)
      {
        console.log('citong upload.accpet stream encoding should not be set');
      }
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
    crc32_check = citong.crypt.crc32(chunk, crc32_check);
    received += chunk.length

    if (size !== null && received > size) {
      var err;
      err = 'citong upload.accpet request entity too large';
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
      err = 'citong upload.accpet request size did not match content length: ' + received + ',' + size;
      onFinish(err)
    }
    else
    {
      if (crc32_check != crc32)
      {
        onFinish('citong upload.accpet request crc32 is wrong');
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
      if (global.isDebug)
      {
        console.log(err);
      }
      done(null, false);
    }
    else
      done(null, true);
  }

  function cleanup(err) {
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

    stream = writeStream = null
  }
};

/**
 * 接收上传文件内容.
 * @param conditionCB: function*(filesize, filename, filemimeType):string.
 *                      - filesize: 将要存储的文件大小.
 *                      - filename: 上传的文件名.
 *                      - filemimeType: 文件类型, 例如: 'image/jpeg'.
 *                      - return: 存储的文件路径, 返回null表示不存储.
 * @return boolean.
 */
exports.accept = function*(app, conditionCB)
{
  assert(conditionCB);

  if ('POST' != app.method)
    return false;

  var query = URL.parse(app.request.url, true).query;
  if (!query.crc32)
    return false;

  if (!query.size)
    return false;

  if (!app.request.is('multipart/*'))
    return false;

  // parse the multipart body
  var parts = parse(app, {
    autoFields: true // saves the fields to parts.field(s)
  });

  if (!parts)
    return false;

  // yield each part as a stream
  var part;
  while (part = yield parts) {
    var srcStream = part;

    var fn = yield conditionCB(Number(query.size), part.filename, part.mimeType);
    if (!fn)
    {
      if (typeof srcStream.pause === 'function')
        srcStream.pause();

      return false;
    }

    // create stream.
    var destStream = fs.createWriteStream(fn);
    if (!destStream)
    {
      if (global.isDebug)
      {
        console.error('citong upload.accpet createWriteStream err:' + fn);
      }

      if (typeof srcStream.pause === 'function')
        srcStream.pause();
      return false;
    }

    var ret = yield save_to(srcStream, destStream, fn, Number(query.size), Number(query.crc32));
    return ret;
  }

  return false;
};
