process.env.NODE_ENV = 'production'

var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var febs = require('../server');
var fs = require('fs');
var webpack = require('webpack')
var webpackConfig = require('./webpack.config.js')
var webpackConfigMin = require('./webpack.config.min.js')


var spinner = ora('building for production...')
spinner.start()

var root = path.resolve(__dirname, '../');
var febs = require('../server/index');
febs.file.dirRemoveRecursive(path.join(root, 'dist/febs'));
febs.file.fileCopy(path.join(root, 'client/febs.css'), path.join(root, 'dist/febs/febs.css'));
febs.file.fileCopy(path.join(root, 'client/febs.mobile.css'), path.join(root, 'dist/febs/febs.mobile.css'));
febs.file.fileCopy(path.join(root, 'README.md'), path.join(root, 'dist/febs/README.md'));

function buildSrc(cbStop, cbSuccess) {
  webpack(webpackConfig, function (err, stats) {
    if (err) {
      cbStop();
      throw err
    }
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    webpack(webpackConfigMin, function (err, stats) {
      if (err) {
        cbStop();
        throw err
      }
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')
      cbSuccess();
    });
  });

  
}

// start.
buildSrc(function() {
  spinner.stop();
}, function(){
  spinner.stop()

  // 等待文件flush到磁盘.
  spinner.start();
  formatDotDefault();
  setTimeout(function() {
    spinner.stop()
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  }, 1000);
});


/**
* @desc: 修改js中的.default 兼容ie.
* @return: 
*/
function formatDotDefault() {

  let assetsRoot = path.join(root, 'dist/febs');

  // 查找所有css.
  let alljs = febs.file.dirExplorerFilesRecursive(assetsRoot);
  for (let i = 0; alljs && i < alljs.length; i++) {
    alljs[i] = path.join(assetsRoot, alljs[i]);
    if (febs.file.fileIsExist(alljs[i])) {
      let buf = fs.readFileSync(alljs[i], 'utf-8');
      if (buf) {
        buf = febs.string.replace(buf, '.default ', '[\'default\'] ');
        buf = febs.string.replace(buf, '.default.', '[\'default\'].');
        buf = febs.string.replace(buf, '.default=', '[\'default\']=');
        buf = febs.string.replace(buf, '.default)', '[\'default\'])');
        buf = febs.string.replace(buf, '{ default:', '{ \'default\':');

        buf = febs.string.replace(buf, '.return ', '[\'return\'] ');
        buf = febs.string.replace(buf, '.return.', '[\'return\'].');
        buf = febs.string.replace(buf, '.return=', '[\'return\']=');
        buf = febs.string.replace(buf, '.return)', '[\'return\'])');

        buf = febs.string.replace(buf, '.catch(', '[\'catch\'](');

        fs.writeFileSync(alljs[i], buf);
      }
    }
  }
}
