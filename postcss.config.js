const path = require('path')
module.exports = {
  plugins: {
    'precss': {},//支持嵌套、mixins等类sass写法
    'postcss-color-function': {},//color函数https://github.com/postcss/postcss-color-function
    'postcss-import': {},//支持@import
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%'],
    },
    'postcss-normalize': {
      forceImport: true
    },
    // 'postcss-partial-import': {}
  },
}