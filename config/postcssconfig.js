module.exports = {
  ident:'postcss',
  plugins:[
    require('postcss-import')(),
    require('precss')(),
    require('postcss-color-function')(),
    require('postcss-cssnext')(),
    require('postcss-atrule-bem')()
    // require('postcss-normalize')({
    //   forceImport:true
    // }),
  ]
}