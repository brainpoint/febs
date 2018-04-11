/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var net = require('../net');
var crypt = require('../crypt');

/**
 * post方式上传文件.
 * 使用文件流片段的方式. 每个片段进行验证.速度稍慢
 * @param cfg:  object, 其中
 *              {
 *                data:       , // 上传到服务器的任意字符串数据,将在发送请求时发送.
 *                fileBase64Str:  , // 文件的base64格式字符串
 *                headerUrl:  , // 上传开始前的header请求地址.
 *                uploadUrl:  , // 上传文件内容的url.
 *                chunkSize:  1024*20,  // 每次上传的块大小.默认20kb
 *                finishCB:    , // 上传完成后的回调. function(err, serverData)
 *                               //                   err:  - 'no file'      未选择文件.
 *                               //                         - 'size too big' 文件太大.
 *                               //                         - 'check crc32 err' 计算本地文件hash值时错误.
 *                               //                         - 'ajax err'     ajax上传时出错.
 *                               //                   serverData: 服务器返回的数据. 至少包含一个filename
 *                progressCB:  , // 上传进度的回调. function(percent),
 *                headers: {     // 设置request headers
 *                  'customHeader': 'value'
 *                },
 *                crossDomain: true,     // 跨域, 默认为true
 *                withCredentials: true, // 是否附带cookie, 默认为true
 *              }
 */
exports.uploadBase64 = uploadBase64;
function uploadBase64(cfg) {
  var control_uploadSeg_cb = cfg.finishCB;
  var control_uploadSeg_progress_cb = cfg.progressCB;
  var control_uploadSeg_header_url = cfg.headerUrl;
  var control_uploadSeg_url = cfg.uploadUrl;
  var control_uploadSeg_chunkSize = cfg.chunkSize || 1024*20;

  if (!cfg.fileBase64Str)
  {
    if (control_uploadSeg_cb)  control_uploadSeg_cb('no file', null);
    return;
  }

  var urlQueryIndex = control_uploadSeg_url.indexOf('?');
  if (urlQueryIndex < 0) {
    control_uploadSeg_url += '?';
  } else if (urlQueryIndex < control_uploadSeg_url.length-1) {
    control_uploadSeg_url += '&';
  }
  control_uploadSeg_url += 'crc32=';

  if (control_uploadSeg_progress_cb)
    control_uploadSeg_progress_cb(0.0);

  var control_uploadSeg_file = cfg.fileBase64Str;

  var control_uploadSeg_chunks = Math.ceil(control_uploadSeg_file.length / control_uploadSeg_chunkSize);
  var control_uploadSeg_currentChunk = 0;

  console.log({filesize:control_uploadSeg_file.length, chunks:control_uploadSeg_chunks, data:cfg.data});

  // 上传文件头.
  net.ajax({
    type: 'POST',
    url: control_uploadSeg_header_url,
    data: {filesize:control_uploadSeg_file.length, chunks:control_uploadSeg_chunks, data:cfg.data},
    contentType: 'application/x-www-form-urlencoded',
    xhrFields: cfg.withCredentials ? {
      withCredentials:true
    } : null,
    crossDomain: cfg.crossDomain,
    success: function(r) {
      if (r && r.err == 0)
      {
          var control_uploadSeg_errorCount = 0;

          function control_uploadSegs_begin() {
            var control_uploadSeg_data = control_uploadSeg_file.substr(control_uploadSeg_currentChunk*control_uploadSeg_chunkSize, 
            (control_uploadSeg_currentChunk*control_uploadSeg_chunkSize+control_uploadSeg_chunkSize > control_uploadSeg_file.length ? control_uploadSeg_file.length-control_uploadSeg_currentChunk*control_uploadSeg_chunkSize : control_uploadSeg_chunkSize));

            var control_uploadSeg_crc = crypt.crc32(control_uploadSeg_data);

            if (control_uploadSeg_progress_cb)
              control_uploadSeg_progress_cb(control_uploadSeg_currentChunk/control_uploadSeg_chunks);

            net.ajax({type:'POST', url:control_uploadSeg_url+control_uploadSeg_crc, data:control_uploadSeg_data, contentType:'application/octet-stream',
              xhrFields:cfg.withCredentials ? {
                withCredentials:true
              } : null,
              crossDomain:cfg.crossDomain,    
              success:function(r){
                if (r && r.err == 0)
                {
                  if (++control_uploadSeg_currentChunk == control_uploadSeg_chunks)
                  {
                    if (control_uploadSeg_cb)  control_uploadSeg_cb(null, r);
                  }
                  else
                  {
                    control_uploadSeg_errorCount = 0;
                    control_uploadSegs_begin();
                  }
                }
                else
                {
                  if (control_uploadSeg_cb)  control_uploadSeg_cb('ajax err', r);
                }
              },
              beforeSend: function(xhr){
                if (cfg.headers) {
                  for (var control_uploadSeg_key in cfg.headers) {
                    if (control_uploadSeg_key != 'Content-Type')
                      xhr.setRequestHeader(control_uploadSeg_key, cfg.headers[control_uploadSeg_key]);
                  }
                }
                xhr.setRequestHeader('Content-Type', 'application/octet-stream');
              },
              error:function(xhr,textStatus){
                if(textStatus=='timeout'){
                  if (control_uploadSeg_errorCount++ < 10)
                  {
                    control_uploadSegs_begin();
                  }
                }
                else if (control_uploadSeg_cb)  control_uploadSeg_cb('ajax err', null);
              }});
          }
          control_uploadSegs_begin();
      }
      else
      {
        if (control_uploadSeg_cb)  control_uploadSeg_cb('ajax err', r);
      }
    },
    beforeSend: function(xhr){
      if (cfg.headers) {
        for (var control_uploadSeg_key in cfg.headers) {
          if (control_uploadSeg_key != 'Content-Type')
            xhr.setRequestHeader(control_uploadSeg_key, cfg.headers[control_uploadSeg_key]);
        }
      }
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    },
    error: function(){
                  if (control_uploadSeg_cb)  control_uploadSeg_cb('ajax err', null);
                }
  });
}
