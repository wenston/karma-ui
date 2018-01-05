const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry:['../examples/main.js'],
  output: {
    filename:'[name].js'
  },
  module: {
    rules: [{
      test:/\.js$/,
      include:[
        path.resolve(__dirname,'src')
      ]
    }]
  },
  devtool: 'source-map',
}