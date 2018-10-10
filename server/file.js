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
function dirIsExist(dir) {
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
exports.dirIsExist = dirIsExist;

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
* @desc: copy dir.
* @param callback: (err) => {}, 执行此函数时表示复制完成.
* @return: bool.
*/
exports.dirCopy = function(src, dest, callback) {
  if (!src || !dest || !dirIsExist(src)) {
    callback && callback(`dirCopy src or dest error; src: ${src}. dest: ${dest} `);
    return false;
  }

  var arrFiles = [];
  var arrEmptyDirs = [];

  function dirCopy1(dirSrc, dirDest, arrF) {
    dirAssure(dirDest);
    var src1;
    var dest1;
    var stat;

    for (var i = 0; i < arrF.length; i++) {
      src1 = path.join(dirSrc, arrF[i]);
      dest1 = path.join(dirDest, arrF[i]);
      stat = fs.statSync(src1);
      if (stat.isDirectory()) {
        var arrF1 = fs.readdirSync(src1);
        if (!arrF1 || arrF1.length == 0) {
          arrEmptyDirs.push(dest1);
        } else {
          dirCopy1(src1, dest1, arrF1);
        }
      } else {
        arrFiles.push(src1);
        arrFiles.push(dest1);
      }
    }
  } // function.


  var arrF = fs.readdirSync(src);
  if (!arrF || arrF.length == 0) {
    arrEmptyDirs.push(dest);
  } else {
    dirCopy1(src, dest, arrF);
  }

  // copy.
  for (let i = 0; i < arrEmptyDirs.length; i++) {
    dirAssure(arrEmptyDirs[i]);
  }

  var index = 0;
  function copy1(err) {
    if (err) {
      callback && callback(err);
      return;
    }

    if (index < arrFiles.length) {
      var i1 = index++;
      var i2 = index++;
      fileCopy(arrFiles[i1], arrFiles[i2], copy1);
    } else {
      callback && callback();
    }
  }

  copy1();
}

/**
* @desc: 返回promise方式.
* @return: Promise(()=>{})
*/
exports.dirCopyAsync = function(src, dest) {
  return new Promise((resolve, reject)=>{
    exports.dirCopy(src, dest, (err)=>{
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
}

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
* @desc: 获取当前目录下的子文件与子目录.
* @param dir: 要搜索的目录路径.
* @param pattern: 子文件或子目录名称,匹配的正则表达式
*                 仅从名称的第一个字符开始匹配, 例如: / a.* /, 匹配 a开头的文件名.
* @return: {files:[], dirs:[]}; 发生错误返回null.
*/
exports.dirExplorer = function(dir, pattern) {
  let ret = {files:[], dirs:[]};
  let fspath;
  let stat;

  try {
    let dirList = fs.readdirSync(dir);
    for (let i = 0; i < dirList.length; i++) {

      if (pattern) {
        let pr = pattern.exec(dirList[i]);
        if (!pr || pr.index != 0)
          continue;
      }

      fspath = path.join(dir, dirList[i]);
      stat = fs.statSync(fspath);
      if (stat.isDirectory()) {
        ret.dirs.push(dirList[i]);
      } else if (stat.isFile()) {
        ret.files.push(dirList[i]);
      }
    }
  } catch(e) {
    return null;
  }

  return ret;
}


/**
* @desc: 递归获取当前目录下的所有子文件.
* @param dir: 要搜索的目录路径.
* @param pattern: 子文件或子目录名称,匹配的正则表达式
*                 仅从名称的第一个字符开始匹配, 例如: / a.* /, 匹配 a开头的文件名.
* @return: Array; 发生错误返回null.
*/
exports.dirExplorerFilesRecursive = function(dir, pattern) {
  let ret = [];
  let fspath;
  let stat;

  let dirs = [];

  try {
    let dirList = fs.readdirSync(dir);
    for (let i = 0; i < dirList.length; i++) {
      fspath = path.join(dir, dirList[i]);
      stat = fs.statSync(fspath);
      if (stat.isDirectory()) {
        dirs.push(dirList[i]);
      } else if (stat.isFile()) {
        if (pattern) {
          let pr = pattern.exec(dirList[i]);
          if (!pr || pr.index != 0)
            continue;
        }
        ret.push(dirList[i]);
      }
    }

    for (let j = 0; j < dirs.length; j++) {
      let dirList = fs.readdirSync(path.join(dir, dirs[j]));
      for (let i = 0; i < dirList.length; i++) {
        fspath = path.join(dir, dirs[j], dirList[i]);
        stat = fs.statSync(fspath);
        if (stat.isDirectory()) {
          dirs.push(path.join(dirs[j], dirList[i]));
        } else if (stat.isFile()) {
          if (pattern) {
            let pr = pattern.exec(dirList[i]);
            if (!pr || pr.index != 0)
              continue;
          }
          ret.push(path.join(dirs[j], dirList[i]));
        }
      } // for.
    } // for.

  } catch(e) {
    return null;
  }

  return ret;
}


/**
* @desc: 递归获取当前目录下的所有子目录.
* @param dir: 要搜索的目录路径.
* @param pattern: 子文件或子目录名称,匹配的正则表达式
*                 仅从名称的第一个字符开始匹配, 例如: / a.* /, 匹配 a开头的文件名.
* @return: Array; 发生错误返回null.
*/
exports.dirExplorerDirsRecursive = function(dir, pattern) {
  let ret = [];
  let fspath;
  let stat;

  let dirs = [];

  try {
    let dirList = fs.readdirSync(dir);
    for (let i = 0; i < dirList.length; i++) {
      fspath = path.join(dir, dirList[i]);
      stat = fs.statSync(fspath);
      if (stat.isDirectory()) {
        dirs.push(dirList[i]);
        if (pattern) {
          let pr = pattern.exec(dirList[i]);
          if (!pr || pr.index != 0)
            continue;
        }
        ret.push(dirList[i]);
      }
    }

    for (let j = 0; j < dirs.length; j++) {
      let dirList = fs.readdirSync(path.join(dir, dirs[j]));
      for (let i = 0; i < dirList.length; i++) {
        fspath = path.join(dir, dirs[j], dirList[i]);
        stat = fs.statSync(fspath);
        if (stat.isDirectory()) {
          dirs.push(path.join(dirs[j], dirList[i]));
          if (pattern) {
            let pr = pattern.exec(dirList[i]);
            if (!pr || pr.index != 0)
              continue;
          }
          ret.push(path.join(dirs[j], dirList[i]));
        }
      } // for.
    } // for.

  } catch(e) {
    return null;
  }

  return ret;
}



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
function fileCopy(src, dest, callback) {
  if (!src || !dest) {
    callback && callback(`fileCopy src or dest error; src: ${src}. dest: ${dest} `);
    return false;
  }

  if (!fs.existsSync(src) || (fs.existsSync(dest) && fs.statSync(dest).isFile()) ) {
    callback && callback(`fileCopy src or dest error; src: ${src}. dest: ${dest} `);
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
exports.fileCopy = fileCopy;


/**
* @desc: 返回promise方式.
* @return: Promise(()=>{})
*/
exports.fileCopyAsync = function(src, dest) {
  return new Promise((resolve, reject)=>{
    exports.fileCopy(src, dest, (err)=>{
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
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

/**
* @desc: promise方式.
* @return: Promise(()=>{})
*/
exports.fileRemoveAsync = function(file) {
  return new Promise((resolve, reject)=>{
    try {
      fs.unlink(file, (err)=>{
        if (err)
          reject(err);
        else 
          resolve();
      });
    } catch(e) {
      reject(e);
    }
  });
}