import clickoutside from './clickoutside.js'
export default {
  install(Vue, opts) {
    Vue.directive('clickoutside', clickoutside)
  }
}