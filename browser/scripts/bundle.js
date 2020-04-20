
const path = require('path');
const fs = require('fs');
const febs = require('../../');
const rollup = require('rollup');

const rollupResolve = require('@rollup/plugin-node-resolve');
const rollupCommonjs = require('@rollup/plugin-commonjs');
const rollupMinify = require('rollup-plugin-babel-minify');
const rollupBabel = require('rollup-plugin-babel');
const version = require('../package.json').version;

const banner =
  '/*!\n' +
  ` * bpui febs v${version}\n` +
  ` * Copyright (c) ${febs.date.getTimeString(Date.now(), 'yyyy')} Copyright bp All Rights Reserved.\n` +
  ' * Released under the MIT License.\n' +
  ' */\n'

let external = [
    ]
let globals = {
}

 
function build() {

  let libName = 'febs';
  let inputMain = getInputMain();
  

  let plugins = [
        rollupResolve({
          extensions: ['.js', '.ts', '.scss', '.css'],
          preferBuiltins: false,
          browser: true,
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
                    browsers: '> 1%, IE 10, not op_mini all, not dead',
                    node: 8
                  },
                  corejs: '2',
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
        file: path.join(__dirname, '..', `dist/${style?'style':'index'}.${min?'min.':''}js`),
        format: 'umd',
        name: libName,
        banner: banner,
        sourcemap: !!!min,
      });
      return bundle;
  }
  let bundleCjs = (bundle, min, style)=>{bundle.write({
        globals,
        file: path.join(__dirname, '..', `dist/${style?'style':'index'}.common.${min?'min.':''}js`),
        format: 'cjs',
        name: libName,
        banner: banner,
        sourcemap: !!!min,
      });
      return bundle;
  }
  let bundleEsm = (bundle, min, style)=>{bundle.write({
        globals,
        file: path.join(__dirname, '..', `dist/${style?'style':'index'}.esm.${min?'min.':''}js`),
        format: 'esm',
        name: libName,
        banner: banner,
        sourcemap: !!!min,
      });
      return bundle;
  }

  let p = [];

  // umd (iife)
  p.push(build().then(bundle => bundleUmd(bundle, false))
            .then(bundle => bundleCjs(bundle, false))
            .then(bundle => bundleEsm(bundle, false)));
  // umd minify
  p.push(buildMin().then(bundle => bundleUmd(bundle, true))
            .then(bundle => bundleCjs(bundle, true))
            .then(bundle => bundleEsm(bundle, true)));

  return Promise.all(
    p
  );
}

function getInputMain() {
  if (!fs.existsSync(path.join(__dirname, '..', `dist`))) {
    fs.mkdirSync(path.join(__dirname, '..', `dist`))
  }

  let inputMain = path.join(__dirname, '..', `index.ts`);
  if (!febs.file.fileIsExist(inputMain)) {
    inputMain = path.join(__dirname, '..', `index.js`);
  }
  return inputMain;
}

build().then(res=>{}).catch(e=>{console.error(e)})