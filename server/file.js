'use strict';

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var fs    = require('fs');
var path  = require('path');


/**
 * @desc: 判断文件夹是否存在.
 * @return: boolean.
 */
exports.dirIsExist = function(dir) {
  if (!dir || dir == "")
    return false;

  var stat;

  dir = path.normalize(dir);
  if (fs.existsSync(dir))
  {
    stat = fs.statSync(dir);
    if (stat.isDirectory()) {
      return true;
    }
  }

  return false;
}

/**
 * @desc: 保证文件夹存在.
 * @return: bool. 若不存在新建; 文件夹存在返回true.
 */
function dirAssure(dir) {
  if (!dir || dir == "")
    return true;

  var stat;

  dir = path.normalize(dir);
  if (fs.existsSync(dir))
  {
    stat = fs.statSync(dir);
    if (stat.isDirectory()) {
      return true;
    }
  }

  if (dir[dir.length-1] != '/' || dir[dir.length-1] != '\\')
  {
    dir += '/';
  }

  var j = 0;
  var paths = new Array();
  for (var i = 0; i < dir.length; i++) {
    if ((dir[i] == '/' || dir[i] == '\\') && i != 0)
    {
      paths.push( dir.substring(j, i) );
      j = i+1;
    }
  }

  dir = '';
  for (var i = 0; i < paths.length; i++) {
    if (i == 0)
      dir += paths[i];
    else {
      dir += '/' + paths[i];
    }
    if (fs.existsSync(dir))
    {
      stat = fs.statSync(dir);
      if (stat.isDirectory()) {
        continue;
      }
    }

    fs.mkdirSync(dir);
  }

  return false;
};
exports.dirAssure = dirAssure;


/**
 * @desc: 删除文件夹.
 * @return: bool. 指明是否删除.
 */
function dirRemoveRecursive(dir) {

  try {
    if (dir && fs.existsSync(dir))
    {
      var fspath;
      var stat;
      var dirList = fs.readdirSync(dir);
      for (var i = 0; i < dirList.length; i++) {
        fspath = path.join(dir, dirList[i]);
        stat = fs.statSync(fspath);
        if (stat.isDirectory()) {
          dirRemoveRecursive(fspath);
        } else {
          fs.unlinkSync(fspath);
        }
      }

      fs.rmdirSync(dir);
    }
    return true;
  } catch(e) {
    return false;
  }
};
exports.dirRemoveRecursive = dirRemoveRecursive;

/**
 * @desc: 判断文件是否存在.
 * @return: boolean.
 */
exports.fileIsExist = function(file) {
  if (!file || file == "")
    return false;

  var stat;

  file = path.normalize(file);
  if (fs.existsSync(file))
  {
    stat = fs.statSync(file);
    if (stat.isFile()) {
      return true;
    }
  }

  return false;
}


/**
 * @desc: 获得文件的字节大小.
 * @return: number.-1表示文件不存在.
 */
exports.fileSize = function(file) {
  if (!file || file == "")
    return -1;

  var stat;

  file = path.normalize(file);
  if (fs.existsSync(file))
  {
    stat = fs.statSync(file);
    if (stat.isFile()) {
      return stat.size;
    }
  }

  return -1;
}


/**
 * @desc: 复制文件.
 * @param callback: (err) => {}, 执行此函数时表示复制完成.
 * @return: bool.
 */
exports.fileCopy = function(src, dest, callback) {
  if (!src || !dest) {
    callback && callback('params err');
    return false;
  }

  if (!fs.existsSync(src) || (fs.existsSync(dest) && fs.statSync(dest).isFile()) ) {
    callback && callback('params err');
    return false;
  }

  if (fs.statSync(src).isDirectory()) {
    callback && callback('src is directory');
    return false;
  }

  dirAssure(path.dirname(dest));

  // 创建读取流
  var readable = fs.createReadStream( src );
  // 创建写入流
  var writable = fs.createWriteStream( dest );
  // 通过管道来传输流
  readable.pipe( writable );
  if (callback) {
    readable.on('end', function() {
      callback(null);
    });

    readable.on('error', function(err) {
      writable.end();
      readable.end();
      callback(err);
    });
  }
  return true;
}

/**
 * @desc: 移除文件.
 * @return: bool. 指明是否删除.
 */
exports.fileRemove = function(file) {
  try {
    fs.unlinkSync(file);
    return true;
  } catch(e) {
    return false;
  }
}
