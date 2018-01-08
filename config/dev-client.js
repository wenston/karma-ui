require('eventsource-polyfill')
let hotClient = require('webpack-hot-middleware/client?timeout=2000&noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
