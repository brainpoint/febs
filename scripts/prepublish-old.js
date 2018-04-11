/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

var febs = require('../server/index');
var path = require('path');
var fs   = require('fs');
var exec = require('child_process').exec;


function copyDir(src, dest) {
  var dir = src;
  var dir2 = dest;
  febs.file.dirAssure(dir2);
  if (fs.existsSync(dir))
  {
    var fspath;
    var stat;
    var dirList = fs.readdirSync(dir);
    for (var i = 0; i < dirList.length; i++) {
      fspath = path.join(dir, dirList[i]);
      stat = fs.statSync(fspath);
      if (stat.isDirectory()) {
        febs.file.dirAssure(path.join(dir2, dirList[i]));
        copyDir(fspath, path.join(dir2, dirList[i]));
      } else {
        febs.file.fileCopy(fspath, path.join(dir2, dirList[i]));
      }
    }
  }
}

var root = path.resolve(__dirname, '../');

//
// copy client/controls,partials -> dist
//copyDir(path.join(root, 'client/controls'), path.join(root, 'dist/febs/controls'));
//copyDir(path.join(root, 'client/partials'), path.join(root, 'dist/febs/partials'));

febs.file.fileRemove(path.join(root, 'dist/febs/febs.css'));
febs.file.fileRemove(path.join(root, 'dist/febs/febs.mobile.css'));
febs.file.fileCopy(path.join(root, 'client/febs.css'), path.join(root, 'dist/febs/febs.css'));
febs.file.fileCopy(path.join(root, 'client/febs.mobile.css'), path.join(root, 'dist/febs/febs.mobile.css'));
febs.file.fileCopy(path.join(root, 'README.md'), path.join(root, 'dist/febs/README.md'));

//
// make febs.min.js
var cmdStr = 'uglifyjs\
  third-party/bluebird.min.js\
  third-party/bignumber.min.js\
  client/js/animationFrame.js\
  client/febsformin.js\
  client/js/crypt.js\
  client/js/utils.js\
  client/js/string.js\
  client/js/nav.js\
  client/js/net.js\
  client/js/controls/index.js\
  client/js/controls/loading.js\
  client/js/controls/upload.js\
  client/js/controls/upload.base64.js\
  client/js/controls/page.js';
  
exec(cmdStr+' -o dist/febs/febs.min.js -c -m', function(err,stdout,stderr){
  if(err) {
      console.log('make febs.min.js error:'+stderr);
  } else {
    exec(cmdStr+' -o dist/febs/febs.js -b', function(err,stdout,stderr){
      if(err) {
          console.log('make febs.js error:'+stderr);
      } else {
      }
    });
  }
});