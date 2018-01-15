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
          loader: 'postcss-loader',
          options: {
            ident:'postcss',
            plugins:[
              require('postcss-import')(),
              require('precss')(),
              require('postcss-color-function')(),
              require('postcss-cssnext')(),
              require('postcss-atrule-bem')(),
              require('postcss-normalize')({
                forceImport:true
              }),
            ]
          }
        }
      ]
    }, {
      test: /\.vue$/,
      include: [resolve('src'), resolve('examples')],
      use: [{
        loader: 'vue-loader'
      }]
    }, {
      test: /\.svg$/,
      include: [resolve('src'), resolve('examples')],
      loader: 'svg-inline-loader'
    }]
  },
}