const webpack = require('webpack')
const path = require('path')

const resolve = function (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  entry: {
    main: ['./examples/main.js']
  },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
    chunkFilename: 'js/[id].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'karma-ui': resolve('src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        resolve('src'), resolve('examples')
      ],
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.css$/,
      include: [resolve('src'), resolve('examples')],
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, {
          loader: 'postcss-loader'
        }
      ]
    }, {
      test: /\.vue$/,
      include: [resolve('src'), resolve('examples')],
      use: [{
        loader: 'vue-loader'
      }]
    }]
  },
}