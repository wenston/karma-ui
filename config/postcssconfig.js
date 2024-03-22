module.exports = {
  ident:'postcss',
  plugins:[
    // require('postcss-import')(),
    require('precss')({
      preserve: true
    }),
    // require('postcss-cssnext')({
    //   preserve:false
    // }),
    require('postcss-atrule-bem')(),
    // require('postcss-preset-env')()
    // require('postcss-normalize')({
    //   forceImport:true
    // }),
  ]
}