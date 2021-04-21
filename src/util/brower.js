const userAgent = navigator.userAgent.toLowerCase()
const isChrome = userAgent.indexOf('chrome')>-1
const isFF= userAgent.indexOf('firefox')>-1

export {isChrome,isFF}