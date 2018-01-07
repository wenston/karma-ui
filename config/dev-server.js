const path = require('path')
const opn = require('opn')
const express = require('express')
const webpack = require('webpack')
const devConfig = require('./webpack.dev')
const app = express()
const compiler = webpack(devConfig)
const port = 1024

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: devConfig.output.publicPath,
    quiet: true,
    noInfo: false,
    stats: {
        colors: true
    },

})

// app.use(express.static(path.resolve(__dirname, '../static/')));
app.use(devMiddleware)

app.use(require('webpack-hot-middleware')(compiler))

devMiddleware.waitUntilValid(() => {

    app.listen(port, '', () => {
        console.log('可以开始啦：http://localhost:' + port)
        // https://www.npmjs.com/package/opn
        opn('http://localhost:' + port, { app: 'chrome' })
    })

})