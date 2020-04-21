
const path = require('path');
const fs = require('fs');
const febs = require('../../');
const rollup = require('rollup');

const rollupResolve = require('@rollup/plugin-node-resolve');
const rollupCommonjs = require('@rollup/plugin-commonjs');
const rollupMinify = require('rollup-plugin-babel-minify');
const rollupBabel = require('rollup-plugin-babel');
const version = require('../package.json').version;

// var cwd = process.cwd();
// cwd = cwd.split('/');
// cwd = cwd[cwd.length-1]; 
var cwd = 'febs';

const banner =
  '/*!\n' +
  ` * febs v${version}\n` +
  ` * Copyright (c) ${febs.date.getTimeString(Date.now(), 'yyyy')} bpoint.lee@gmail.com All Rights Reserved.\n` +
  ' * Released under the MIT License.\n' +
  ' */\n'

let external = [
    ]
let globals = {
}

function build(pkg, inputFile, outputFile) {
  let libName = getLibName(pkg);
  let inputMain = getInputMain(inputFile);
  
  let plugins = [
        rollupResolve({
          extensions: ['.js', '.ts', '.scss', '.css'],
          preferBuiltins: false,
        }),
        rollupCommonjs({
        }),
        rollupBabel({
            babelrc: false,
            // exclude: /node_modules\/.*/,
            exclude: /node_modules\/core-js.*/,
            presets: [
              [
                '@babel/env',
                {
                  modules: false,
                  targets: {
                    "chrome": "50",
                    "ie": "9",
                    "firefox": "40",
                    "safari": "11",
                  },
                  corejs: 3,
                  useBuiltIns: 'usage'
                }
              ]
            ]
        }),
      ];

  let build = ()=>rollup.rollup({
      input: inputMain,
      plugins: plugins,
      external
    })
  
  let buildMin = ()=>rollup.rollup({
      input: inputMain,
      plugins: plugins.concat(
        rollupMinify({
          comments: false,
          sourceMap: false,
        })),
      external
    })

  let bundleUmd = (bundle, min, style)=>{bundle.write({
        globals,
        file: path.join(__dirname, '..', `dist/${style?'style':outputFile}.${min?'min.':''}js`),
        format: 'umd',
        name: libName,
        sourcemap: !!!min,
        banner: banner,
      });
      return bundle;
  }
  let bundleCjs = (bundle, min, style)=>{bundle.write({
        globals,
        file: path.join(__dirname, '..', `dist/${style?'style':outputFile}.common.${min?'min.':''}js`),
        format: 'cjs',
        name: libName,
        sourcemap: !!!min,
        banner: banner,
      });
      return bundle;
  }
  let bundleEsm = (bundle, min, style)=>{bundle.write({
        globals,
        file: path.join(__dirname, '..', `dist/${style?'style':outputFile}.esm.${min?'min.':''}js`),
        format: 'esm',
        name: libName,
        sourcemap: !!!min,
        banner: banner,
      });
      return bundle;
  }

  let p = [];

  // umd minify
  p.push(buildMin().then(bundle => bundleUmd(bundle, true))
            .then(bundle => bundleCjs(bundle, true))
            .then(bundle => bundleEsm(bundle, true)));
  // umd (iife)
  p.push(build().then(bundle => bundleUmd(bundle, false))
          .then(bundle => bundleCjs(bundle, false))
          .then(bundle => bundleEsm(bundle, false)));

  return Promise.all(
    p
  );
}

function getLibName(pkg) {
  let libName = pkg;
  let pos = 0;
  while (pos < libName.length) {
    if (pos != 0) {
      libName = libName.slice(0, pos) + libName.slice(pos+1, pos+2).toUpperCase() + libName.slice(pos+2);
    }
    pos = libName.indexOf('-');
    if (pos <= 0) {
      break;
    }
  }

  libName = libName.substr(0, 1) + libName.substr(1);
  console.log(libName);
  return libName;
}

function getInputMain(mainfile) {
  if (!fs.existsSync(path.join(__dirname, '..', `dist`))) {
    fs.mkdirSync(path.join(__dirname, '..', `dist`))
  }

  var inputMain = path.join(__dirname, '..', mainfile);
  console.log(inputMain);
  return inputMain;
}

build(cwd, 'index.js', 'index').then(res=>{}).catch(e=>{console.error(e)})
// build(cwd, 'index.ie8.js', 'index.ie8').then(res=>{}).catch(e=>{console.error(e)})
// build(cwd, 'wxmini/index.js', 'wxmini/index').then(res=>{}).catch(e=>{console.error(e)})