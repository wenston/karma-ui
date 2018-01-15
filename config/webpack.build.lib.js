const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const resolve = function (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  entry: {
    index: ['./src/index.js']
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js',
    path: resolve('lib'),
    library:'karma-ui',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'karma-ui': resolve('src'),
    }
  },
  externals: {
    vue: {
      commonjs:'vue/dist/vue.esm.js',
      commonjs2:'vue/dist/vue.esm.js',
      amd:'vue/dist/vue.esm.js',
      root:'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new ExtractTextPlugin('theme/[name].css'),
    new CleanWebpackPlugin('lib', {
      root:resolve('')
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        resolve('src')
      ],
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.css$/,
      include: [resolve('src')],
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, {
          loader: 'postcss-loader',
          options: require('./postcssconfig.js')
        }]
      })
    }, {
      test: /\.vue$/,
      include: [resolve('src')],
      use: [{
        loader: 'vue-loader'
      }]
    }, {
      test: /\.svg$/,
      include: [resolve('src')],
      loader: 'svg-inline-loader'
    }]
  },
}