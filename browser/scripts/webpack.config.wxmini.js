
var path = require('path')
var webpack = require('webpack')

var packageJson = require('../package.json');
var distDir = 'febs-'+packageJson.version;

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = function(main, output, outputDir){
  return {
  entry:  resolve(main),
  output: {
    path: resolve(outputDir),
    filename: output,
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('libs'), resolve('third-party'), resolve('dist/'+distDir), resolve('common')],
        query: {
          presets:['es2015', 'stage-0', 'es2015-loose'],
          // presets:['es2015', {'loose': true, 'modules': false}],
          plugins: [
            'transform-es3-property-literals',
            'transform-es3-member-expression-literals',
            'transform-es2015-modules-simple-commonjs',
          ]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('libs'), resolve('third-party'), resolve('dist/'+distDir), resolve('common')],
        query: {
          presets:['es2015', 'stage-0', 'es2015-loose'],
        }
      },
      {
        test: /.js$/,
        include: [resolve('libs'), resolve('third-party'), resolve('dist/'+distDir), resolve('common')],
        enforce: 'post', // post-loader处理
        loader: 'es3ify-loader'
      }
    ]
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': 'production'
    })
  ]
}
}
