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
    extensions: ['.js','.jsx', '.vue', '.json'],
    alias: {
      'karma-ui': resolve('src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
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
          loader: 'postcss-loader',
          options: require('./postcssconfig.js')
        }
      ]
    }, {
      test: /\.vue$/,
      include: [resolve('src'), resolve('examples')],
      use: [{
        loader: 'vue-loader',
        options: {
          postcss: require('./postcssconfig.js').plugins
        }
      }]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: './img/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: './fonts/[name].[ext]'
      }
    }]
  },
}