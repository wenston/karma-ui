const path = require('path')
const postcssImport = require('postcss-import')
// const partialImport = require('postcss-partial-import')
const cssnext = require('postcss-cssnext')
// const postcssScss = require('postcss-scss')
module.exports = {
  plugins: {
    'precss': {},//支持嵌套、mixins等类sass写法
    'postcss-color-function': {},//color函数https://github.com/postcss/postcss-color-function
    'postcss-import': {},//支持@import
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%'],
    },
  },
}