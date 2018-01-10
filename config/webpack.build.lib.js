const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const resolve = function (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  entry: {
    main: ['./src/index.js']
  },
  output: {
    filename: 'karma-ui-[name].js',
    path: resolve('lib'),
    library:'karma-ui',
    libraryTarget: 'var'
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
    new ExtractTextPlugin('karma-ui-theme.css')
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
          loader: 'postcss-loader'
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