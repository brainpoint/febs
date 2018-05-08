
var path = require('path')
var webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = function(main, output, outputDir){
  return {
  entry:  resolve(main),
  output: {
    path: resolve(outputDir),
    filename: output
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('libs'), resolve('third-party'), resolve('dist/febs'), resolve('common')],
        query: {
          presets:['es2015', 'stage-0', 'es2015-loose'],
          plugins: [
            'transform-runtime',
            'transform-es3-property-literals',
            'transform-es3-member-expression-literals',
            'transform-es2015-modules-simple-commonjs',
          ]
        }
      },
      {
        test: /.js$/,
        include: [resolve('libs'), resolve('third-party'), resolve('dist/febs'), resolve('common')],
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
